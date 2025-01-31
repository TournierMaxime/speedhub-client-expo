import React from "react"
import { useGlobalSearchParams } from "expo-router"
import { View, Text, ScrollView, Image } from "react-native"
import Header from "@/components/lib/Header"
import { useQuery } from "@tanstack/react-query"
import { runService } from "@/services/speedrunDotCom"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import Runtime from "@/components/lib/RunTime"
import Splits from "./Splits"
import { useColorScheme } from "react-native"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import TwitchIframe from "@/components/lib/TwitchIframe"
import UserName from "@/components/lib/UserName"
import { Comment } from "@/components/lib/Icons"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"
import { Run } from "@/types/sdc"

const OneRun = () => {
  const { id } = useGlobalSearchParams()

  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error, refetch } = useQuery<Run>({
    queryKey: ["getRun", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await runService.getRun(id)
    },
    enabled: !!id,
  })

  const getPlayers = (data: Run["data"]["players"]["data"]) => {
    if (data) {
      const players = data?.map((player: any, idx: number) => {
        return <UserName data={player} key={idx} />
      })
      return players
    }
    return null
  }

  const getCategoryAndTime = (
    data: Pick<Run["data"], "category" | "times">
  ) => {
    if (data) {
      return (
        <Text style={cardStyle.text}>
          {data?.category?.data?.name} in{" "}
          <Runtime time={data?.times?.primary_t} />
        </Text>
      )
    }
    return null
  }

  const getGameImg = (data: Run["data"]["game"]["data"]["assets"]) => {
    if (data) {
      const image = data["cover-large"]?.uri ? (
        <Image
          source={{ uri: data["cover-large"]?.uri }}
          style={oneRunStyle.img}
        />
      ) : null
      return image
    }

    return null
  }

  const getComment = (data: any) => {
    if (data) {
      const comment = data
      return (
        <View style={oneRunStyle.commentContainer}>
          <Comment />
          <Text style={cardStyle.text}>{comment}</Text>
        </View>
      )
    }

    return null
  }

  const getContent = (data: Run["data"]) => {
    if (data) {
      return (
        <View style={oneRunStyle.playerContainer}>
          {getGameImg(data?.game?.data?.assets)}
          <View>
            <Text style={cardStyle.text}>
              {data.game.data.names.international}
            </Text>
            {getPlayers(data?.players?.data)}
            {getCategoryAndTime(data)}
          </View>
        </View>
      )
    }
    return null
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

      switch (platform) {
        case "youtube":
          const youtubeId = videoUri.substring(32)
          videoComponent = (
            <YoutubeIframe videoId={youtubeId} width={360} height={200} />
          )
          break

        case "twitch":
          const twitchId = videoUri.substring(29)
          videoComponent = (
            <TwitchIframe id={twitchId} width={360} height={200} />
          )
          break

        case "youtu.be":
          const youtuBeId = videoUri.substring(17)
          videoComponent = (
            <YoutubeIframe videoId={youtuBeId} width={360} height={200} />
          )
          break

        default:
          return <Text>Unsupported video platform</Text>
      }

      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          {videoComponent}
          <View style={oneRunStyle.cardInfo}>
            {data?.data ? (
              <View style={oneRunStyle.cardInfoItems}>
                {getContent(data?.data)}
              </View>
            ) : null}

            {data?.data?.comment ? (
              <View style={oneRunStyle.cardInfoItems}>
                {getComment(data?.data?.comment)}
              </View>
            ) : null}
          </View>
          <Splits splits={data?.data?.splits?.uri} />
        </View>
      )
    }
    return null
  }

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && !isLoading) {
    refetch()
  }

  return (
    <ScrollView style={mainStyle.container}>
      <Header backButton={true} />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneRun()}
    </ScrollView>
  )
}

export default OneRun
