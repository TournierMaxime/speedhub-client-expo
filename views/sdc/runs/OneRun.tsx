import React from "react"
import { useGlobalSearchParams } from "expo-router"
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Button,
    Linking,
} from "react-native"
import Header from "@/components/lib/Header"
import { useQuery } from "@tanstack/react-query"
import { speedRunDotComRunService } from "@/services/speedrunDotCom"
import Utils from "@/components/lib/Utils"
import { Run } from "../interface"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Runtime from "@/components/lib/RunTime"
import Splits from "./Splits"

const OneRun = () => {
    const { id } = useGlobalSearchParams()

    const { data, isLoading, error } = useQuery<Run>({
        queryKey: ["getRun", id],
        queryFn: async () => {
            if (!id) throw new Error("Missing ID")
            return await speedRunDotComRunService.getRun(id)
        },
        enabled: !!id,
    })

    if (error) {
        return (
            <View style={style.container}>
                <Header backButton={true} title="Run Details" />
                <Text>An error occurred: {error.message}</Text>
            </View>
        )
    }

    const getPlayers = (data: any) => {
        if (data) {
            const players = data.map(
                (player: { names: { international: string } }, idx: string) => {
                    return <Text key={idx}>{player.names.international}</Text>
                }
            )

            return players
        }
    }

    const oneRun = () => {
        if (data) {
            const videoUri = data.data.videos?.links[0].uri

            const platform = videoUri?.includes("youtube")
                ? "youtube"
                : videoUri.includes("twitch")
                    ? "twitch"
                    : videoUri.includes("youtu.be")
                        ? "youtu.be"
                        : null

            let videoComponent

            console.log(videoUri)

            switch (platform) {
                case "youtube":
                    const youtubeId = videoUri.substring(32)
                    videoComponent = <YoutubeIframe videoId={youtubeId} />
                    break

                case "twitch":
                    videoComponent = (
                        <Button
                            title="Watch on Twitch"
                            onPress={() => Linking.openURL(videoUri)}
                        />
                    )
                    break

                case "youtu.be":
                    const youtuBeId = videoUri.substring(17)
                    videoComponent = <YoutubeIframe videoId={youtuBeId} />
                    break

                default:
                    ; <Text>Unsupported video platform</Text>
                    break
            }

            return (
                <View style={style.card}>
                    {videoComponent}
                    <View style={style.cardInfo}>
                        <View style={style.cardInfoItems}>
                            <MaterialCommunityIcons
                                name="run"
                                size={Utils.moderateScale(28)}
                                color="black"
                            />
                            {getPlayers(data.data.players.data)}
                        </View>
                        <View style={style.cardInfoItems}>
                            <MaterialIcons
                                name="gamepad"
                                size={Utils.moderateScale(24)}
                                color="black"
                            />
                            <Text>{data.data.game.data.names.international}</Text>
                        </View>
                        <View style={style.cardInfoItems}>
                            <MaterialIcons
                                name="category"
                                size={Utils.moderateScale(24)}
                                color="black"
                            />
                            <Text>{data.data.category.data.name}</Text>
                        </View>
                        <View style={style.cardInfoItems}>
                            <MaterialIcons
                                name="access-time"
                                size={Utils.moderateScale(24)}
                                color="black"
                            />
                            <Runtime time={data.data.times.primary_t} />
                        </View>
                    </View>
                    <Splits splits={data.data.splits?.uri} />
                </View>
            )
        }
        return null
    }

    return (
        <View style={style.container}>
            <Header backButton={true} title="" />
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
        display: "flex",
    },
    cardInfo: {
        display: "flex",
        flexDirection: "column",
        marginHorizontal: Utils.moderateScale(5),
        marginTop: Utils.moderateScale(10),
        padding: Utils.moderateScale(10),
        borderRadius: Utils.moderateScale(5),
        borderWidth: Utils.moderateScale(2),
        borderColor: "grey",
    },
    cardInfoItems: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: Utils.moderateScale(5),
    },
})

export default OneRun
