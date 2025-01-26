import React from "react"
import useResponsive from "@/hooks/utils/useResponsive"
import { StyleSheet, View } from "react-native"
import WebView from "react-native-webview"

interface Props {
  id?: string
  channel?: string
  width?: number
  height?: number
}

const TwitchIframe: React.FC<Props> = ({ id, channel, width, height }) => {
  const { video } = useResponsive()
  const twitchEmbedUrl = id
    ? `https://player.twitch.tv/?video=${id}&parent=${process.env.EXPO_PUBLIC_TWITCH_PARENT_DOMAIN}&muted=true&autoplay=false`
    : channel
    ? `https://player.twitch.tv/?channel=${channel}&parent=${process.env.EXPO_PUBLIC_TWITCH_PARENT_DOMAIN}&muted=true&autoplay=false`
    : ""
  return (
    <View style={style.card}>
      <WebView
        source={{ uri: twitchEmbedUrl }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        style={{
          width: width ?? video.dimension.w,
          height: height ?? video.dimension.h,
        }}
      />
    </View>
  )
}

const style = StyleSheet.create({
  card: {
    display: "flex",
    alignItems: "center",
  },
})

export default TwitchIframe
