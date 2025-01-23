import React from "react"
import useResponsive from "@/hooks/utils/useResponsive"
import { StyleSheet, View } from "react-native"
import WebView from "react-native-webview"

interface Props {
    id: string
}

const TwitchIframe: React.FC<Props> = ({ id }) => {
    const { video } = useResponsive()
    const twitchEmbedUrl = `https://player.twitch.tv/?video=${id}&parent=${process.env.EXPO_PUBLIC_TWITCH_PARENT_DOMAIN}&muted=true&autoplay=false`;
    return (
        <View style={style.card}>
            <WebView
                source={{ uri: twitchEmbedUrl }}
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
                style={{ width: video.dimension.w, height: video.dimension.h }}
            />
        </View>

    )
}

const style = StyleSheet.create({
    card: {
        display: 'flex',
        alignItems: "center"
    }
})

export default TwitchIframe