import React from "react"
import useResponsive from "@/hooks/utils/useResponsive"
import { StyleSheet, View } from "react-native"
import WebView from "react-native-webview"
import Utils from "./Utils"
import { Video } from "@/types/speedhub"

const TwitchIframe: React.FC<Video> = ({
  videoUri,
  platform,
  channel,
  width,
  height,
  isReddit,
}) => {
  const { video } = useResponsive()

  if (videoUri && platform === "twitch") {
    videoUri = videoUri.substring(29)
    if (isReddit) {
      videoUri?.split("/").pop()
    }
  }

  const twitchEmbedUrl = videoUri
    ? `https://player.twitch.tv/?video=${videoUri}&parent=${process.env.EXPO_PUBLIC_TWITCH_PARENT_DOMAIN}&muted=true&autoplay=false`
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
    zIndex: 1,
    overflow: "hidden",
    borderRadius: Utils.moderateScale(10),
  },
})

export default TwitchIframe
