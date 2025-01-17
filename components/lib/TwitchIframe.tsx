import React from "react"
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import useResponsive from "@/hooks/utils/useResponsive"
import { StyleSheet, View } from "react-native"

interface Props {
    videoId: string
}

const TwitchIframe: React.FC<Props> = ({ videoId }) => {
    const { video } = useResponsive()
    return (
        <View style={style.card}>
            <ReactTwitchEmbedVideo
                width={video.dimension.w}
                height={video.dimension.h}
                video={videoId}
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