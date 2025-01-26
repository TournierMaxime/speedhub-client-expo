import React from "react"
import YoutubePlayer from "react-native-youtube-iframe"
import Utils from "./Utils"
import useResponsive from "@/hooks/utils/useResponsive"
import { StyleSheet, View } from "react-native"

interface Props {
  videoId: string | undefined
  width?: number
  height?: number
}

const YoutubeIframe: React.FC<Props> = ({ videoId, width, height }) => {
  const { video } = useResponsive()
  return (
    <View style={style.card}>
      <YoutubePlayer
        width={width ?? video.dimension.w}
        height={height ?? video.dimension.h}
        play={false}
        videoId={videoId}
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

export default YoutubeIframe
