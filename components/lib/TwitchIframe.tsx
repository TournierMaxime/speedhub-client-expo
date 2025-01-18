import React from "react"
import { TwitchPlayer } from "react-twitch-embed"
import useResponsive from "@/hooks/utils/useResponsive"
import { StyleSheet, View } from "react-native"
import WebView from "react-native-webview"

/* interface Props {
    videoId: string
} */

const TwitchIframe: React.FC = () => {
    const { video } = useResponsive()
    return (
        <WebView
            source={{ uri: 'https://www.twitch.tv/videos/2356220734' }}
            style={{ marginTop: 20 }}
        />
    )
}

const style = StyleSheet.create({
    card: {
        display: 'flex',
        alignItems: "center"
    }
})

export default TwitchIframe