import React from "react"
import { View, Text, ScrollView } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { runService } from "@/services/speedrunDotCom"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import Runtime from "@/components/lib/RunTime"
import Splits from "./Splits"
import { useColorScheme } from "react-native"
import CatchError from "@/components/lib/CatchError"
import TwitchIframe from "@/components/lib/TwitchIframe"
import UserName from "@/components/lib/UserName"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"
import { Run } from "@/types/sdc"
import Utils from "@/components/lib/Utils"
import { Collapsible } from "@/components/Collapsible"
import { useLocalSearchParams } from "expo-router"
import Button from "@/components/lib/Button"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"

const OneRun = ({ id }: { id?: string }) => {
  const theme = useColorScheme() ?? "light"
  const { id: pbRunId } = useLocalSearchParams()

  const { handleRedirect } = useHandleRouter()

  const { data, isLoading, error, refetch } = useQuery<Run>({
    queryKey: ["getRun", pbRunId ?? id],
    queryFn: async () => {
      return await runService.getRun(pbRunId ?? id)
    },
    enabled: pbRunId ? !!pbRunId : !!id,
  })

  const getPlayers = (data: Run["data"]["players"]["data"]) => {
    if (data) {
      const players = data?.map((player: any, idx: number) => {
        return <UserName data={player.names.international} key={idx} />
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

  const getComment = (data: any) => {
    if (data) {
      const comment = data
      return (
        <Collapsible title="Comment">
          <Text
            style={[cardStyle.text, { marginTop: Utils.moderateScale(10) }]}
          >
            {comment}
          </Text>
        </Collapsible>
      )
    }

    return null
  }

  const getSplits = (data: Run["data"]["splits"]) => {
    if (data) {
      const splits = data
      return (
        <Collapsible title="Splits">
          <Splits splits={splits.uri} />
        </Collapsible>
      )
    }
    return null
  }

  const getContent = (data: Run["data"]) => {
    if (data) {
      return (
        <View style={oneRunStyle.playerContainer}>
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
          const youtubeId = videoUri.substring(32, 43)
          videoComponent = (
            <YoutubeIframe videoId={youtubeId} width={380} height={220} />
          )
          break

        case "twitch":
          const twitchId = videoUri.substring(29)
          videoComponent = (
            <TwitchIframe id={twitchId} width={380} height={220} />
          )
          break

        case "youtu.be":
          const youtuBeId = videoUri.substring(17)
          videoComponent = (
            <YoutubeIframe videoId={youtuBeId} width={380} height={220} />
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
          <View style={oneRunStyle.cardInfo}>
            {data?.data ? (
              <View style={oneRunStyle.cardInfoItems}>
                {videoComponent}
                {getContent(data?.data)}
                <Button
                  name="More"
                  redirect={() =>
                    handleRedirect(ROUTES.ONE_RUN, { id: data?.data.id })
                  }
                  style={{ marginTop: Utils.moderateScale(10) }}
                />
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

  return (
    <ScrollView style={mainStyle.container}>
      {isLoading ? null : oneRun()}
    </ScrollView>
  )
}

export default OneRun
