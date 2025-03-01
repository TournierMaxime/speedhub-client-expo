import React from "react"
import { View, Text } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { runService } from "@/services/speedrunDotCom"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import Runtime from "@/components/lib/RunTime"
import { useColorScheme } from "react-native"
import CatchError from "@/components/lib/CatchError"
import TwitchIframe from "@/components/lib/TwitchIframe"
import UserName from "@/components/lib/UserName"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"
import { Run } from "@/types/sdc"

const OneRunHome = ({ id }: { id: string }) => {
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

  const getContent = (data: Run["data"]) => {
    if (data) {
      return (
        <View style={oneRunStyle.playerContainer}>
          <View>
            {getPlayers(data?.players?.data)}
            <Text style={cardStyle.text}>
              {data.game.data.names.international}
            </Text>
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
          const youtubeId = videoUri.substring(32, 43)
          videoComponent = (
            <YoutubeIframe videoId={youtubeId} width={340} height={180} />
          )
          break

        case "twitch":
          const twitchId = videoUri.substring(29)
          videoComponent = (
            <TwitchIframe id={twitchId} width={340} height={180} />
          )
          break

        case "youtu.be":
          const youtuBeId = videoUri.substring(17)
          videoComponent = (
            <YoutubeIframe videoId={youtuBeId} width={340} height={180} />
          )
          break

        default:
          return null
      }

      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          <View style={oneRunStyle.cardInfo}>
            {data?.data ? (
              <View style={oneRunStyle.cardInfoItems}>
                {videoComponent}
                {getContent(data?.data)}
              </View>
            ) : null}
          </View>
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

  return <View style={mainStyle.container}>{isLoading ? null : oneRun()}</View>
}

export default OneRunHome
