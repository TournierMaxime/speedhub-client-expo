import React from "react"
import YoutubePlayer from "react-native-youtube-iframe"
import useResponsive from "@/hooks/utils/useResponsive"
import { StyleSheet, View } from "react-native"
import Utils from "./Utils"
import { Video } from "@/types/speedhub"

const YoutubeIframe: React.FC<Video> = ({
  videoUri,
  platform,
  width,
  height,
  isReddit,
}) => {
  const { video } = useResponsive()

  let videoId

  if (videoUri && platform === "youtube") {
    videoId = videoUri.substring(32, 43)
    if (isReddit) {
      videoUri?.split("v=")[1]?.split("&")[0]
    }
  } else if (videoUri && platform === "youtu.be") {
    videoId = videoUri.substring(17)
    if (isReddit) {
      videoUri?.split("/").pop()
    }
  }
  return (
    <View style={style.card}>
      <YoutubePlayer
        width={width ?? video.dimension.w}
        height={height ?? video.dimension.h}
        play={false}
        mute={true}
        videoId={videoId}
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

export default YoutubeIframe
