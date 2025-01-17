import React from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import Header from '@/components/lib/Header'
import { useQuery } from "@tanstack/react-query"
import { speedRunDotComRunService } from "@/services/speedrunDotCom"
import Utils from '@/components/lib/Utils'
import { Run } from '../interface'
import YoutubeIframe from '@/components/lib/YouTubeIframe'
import TwitchIframe from '@/components/lib/TwitchIframe'

const OneRun = () => {
    const { id } = useGlobalSearchParams()

    const { data, isLoading, error } = useQuery<Run>({
        queryKey: ["getRun", id],
        queryFn: async () => {
            if (!id) throw new Error("Missing ID");
            return await speedRunDotComRunService.getRun(id);
        },
        enabled: !!id,
    });

    if (error) {
        return (
            <View style={style.container}>
                <Header backButton={true} title="Run Details" />
                <Text>An error occurred: {error.message}</Text>
            </View>
        );
    }

    const oneRun = () => {
        if (data) {
            const videoUri = data.data.videos.links[0].uri;
            const platform = videoUri.includes("youtube")
                ? "youtube"
                : videoUri.includes("twitch")
                    ? "twitch"
                    : videoUri.includes("youtu.be") ? "youtu.be" : null

            let videoComponent

            switch (platform) {
                case "youtube":
                    const youtubeId = videoUri.substring(32);
                    videoComponent = <YoutubeIframe videoId={youtubeId} />;
                    break;

                case "twitch":
                    const twitchId = videoUri.substring(29);
                    videoComponent = <TwitchIframe videoId={twitchId} />;
                    break;

                case "youtu.be":
                    const youtuBeId = videoUri.substring(17);
                    videoComponent = <YoutubeIframe videoId={youtuBeId} />;
                    break;

                default:
                    <Text>Unsupported video platform</Text>;
                    break;

            }

            return (
                <View style={style.card}>
                    {videoComponent}
                    <View>
                        <Text>{data.data.game.data.names.international}</Text>
                    </View>
                    <View>
                        <Text>{data.data.comment}</Text>
                    </View>
                    <View>
                        <Text>{data.data.players.data[0].splits?.uri}</Text>
                    </View>
                </View>
            )
        }
        return null
    }

    return (
        <View style={style.container}>
            <Header backButton={true} title='' />
            {isLoading ? <ActivityIndicator /> : oneRun()}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#fff",
        marginTop: Utils.moderateScale(2),
    },
    card: {
        display: "flex"
    }
})

export default OneRun