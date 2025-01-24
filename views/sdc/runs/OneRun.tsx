import React from "react"
import { useGlobalSearchParams } from "expo-router"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native"
import Header from "@/components/lib/Header"
import { useQuery } from "@tanstack/react-query"
import { runService } from "@/services/speedrunDotCom"
import Utils from "@/components/lib/Utils"
import { Run } from "../interface"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Runtime from "@/components/lib/RunTime"
import Splits from "./Splits"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import TwitchIframe from "@/components/lib/TwitchIframe"
import UserName from "@/components/lib/UserName"

const OneRun = () => {
    const { id } = useGlobalSearchParams()

    const theme = useColorScheme() ?? "light"

    const { data, isLoading, error } = useQuery<Run>({
        queryKey: ["getRun", id],
        queryFn: async () => {
            if (!id) throw new Error("Missing ID")
            return await runService.getRun(id)
        },
        enabled: !!id,
    })

    if (error) {
        return <CatchError error={error} />
    }

    const getPlayers = (data: any) => {
        if (data) {
            const players = data.map(
                (player: any, idx: string) => {
                    return <UserName data={player} idx={idx} width={Utils.moderateScale(50)} />
                }
            )

            return players
        }
    }

    const oneRun = () => {
        if (data) {
            const videoUri = data.data.videos?.links[0].uri
            let platform

            if (videoUri) {
                platform = videoUri?.includes("youtube")
                    ? "youtube"
                    : videoUri.includes("twitch")
                        ? "twitch"
                        : videoUri.includes("youtu.be")
                            ? "youtu.be"
                            : null
            }

            let videoComponent

            console.log("OneRun videoUri line 74 - ", videoUri)

            switch (platform) {
                case "youtube":
                    const youtubeId = videoUri.substring(32)
                    videoComponent = <YoutubeIframe videoId={youtubeId} />
                    break

                case "twitch":
                    const twitchId = videoUri.substring(29)
                    videoComponent = <TwitchIframe id={twitchId} />
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
                            <View style={style.icons}>
                                <MaterialCommunityIcons
                                    name="run"
                                    size={Utils.moderateScale(28)}
                                    color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
                                />
                            </View>
                            <View style={style.data}>
                                {getPlayers(data.data.players.data)}
                            </View>
                        </View>
                        <View style={style.cardInfoItems}>
                            <MaterialIcons
                                name="gamepad"
                                size={Utils.moderateScale(24)}
                                color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
                            />
                            <Text
                                style={[
                                    style.text,
                                    theme === "dark"
                                        ? { color: Colors.dark.text }
                                        : { color: Colors.light.text },
                                ]}
                            >
                                {data.data.game.data.names.international}
                            </Text>
                        </View>
                        <View style={style.cardInfoItems}>
                            <MaterialIcons
                                name="category"
                                size={Utils.moderateScale(24)}
                                color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
                            />
                            <Text
                                style={[
                                    style.text,
                                    theme === "dark"
                                        ? { color: Colors.dark.text }
                                        : { color: Colors.light.text },
                                ]}
                            >
                                {data.data.category.data.name}
                            </Text>
                        </View>
                        <View style={style.cardInfoItems}>
                            <MaterialIcons
                                name="access-time"
                                size={Utils.moderateScale(24)}
                                color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
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
        <ScrollView
            style={[
                style.container,
                theme === "dark"
                    ? { backgroundColor: Colors.dark.background }
                    : { backgroundColor: Colors.light.background },
            ]}
        >
            <Header backButton={true} title="" />
            {isLoading ? <IsLoading isLoading={isLoading} /> : oneRun()}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
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
        marginVertical: Utils.moderateScale(5)
    },
    icons: {
        display: "flex",
        justifyContent: "flex-start",
    },
    data: {
        flex: 1,
        alignItems: "flex-end",
    },
    text: {
        fontSize: Utils.moderateScale(16),
    },
})

export default OneRun
