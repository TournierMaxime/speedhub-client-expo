import React, { Fragment } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { runService } from "@/services/speedrunDotCom"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import Runtime from "@/components/lib/RunTime"
import Splits from "./Splits"
import { useColorScheme } from "react-native"
import CatchError from "@/components/lib/CatchError"
import TwitchIframe from "@/components/lib/TwitchIframe"
import UserName from "@/components/lib/UserName"
import { oneGameDetailsStyle } from "@/styles/views/oneGame"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"
import { Run as OneRun } from "@/types/sdc"
import Utils from "@/components/lib/Utils"
import { useLocalSearchParams } from "expo-router"
import useHandleTab from "@/hooks/utils/useHandleTab"
import ScrollViewAndTabs, { TabName } from "@/components/lib/ScrollViewAndTabs"
import { oneGameStyle } from "@/styles/views/oneGame"
import IsLoading from "@/components/lib/IsLoading"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { LeftArrow } from "@/components/lib/Icons"

const Details = ({ data }: { data: any }) => {
  const getPlayers = (data: OneRun["data"]["players"]["data"]) => {
    if (data) {
      const players = data?.map((player: any, idx: number) => {
        return <UserName data={player.names.international} key={idx} />
      })
      return players
    }
    return null
  }

  const getCategoryAndTime = (
    data: Pick<OneRun["data"], "category" | "times">
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
        <Text style={[cardStyle.text, { marginTop: Utils.moderateScale(10) }]}>
          {comment}
        </Text>
      )
    }

    return null
  }

  const getContent = (data: OneRun["data"]) => {
    if (data) {
      return (
        <View
          style={[
            oneRunStyle.playerContainer,
            { width: "90%", marginHorizontal: "auto" },
          ]}
        >
          <View>
            <Text style={cardStyle.text}>
              {data.game.data.names.international}
            </Text>
            {getPlayers(data?.players?.data)}
            {getCategoryAndTime(data)}
            {data?.comment ? getComment(data?.comment) : null}
          </View>
        </View>
      )
    }
    return null
  }

  return getContent(data)
}

const Run = ({ id }: { id?: string }) => {
  const theme = useColorScheme() ?? "light"
  const { id: pbRunId } = useLocalSearchParams()

  const { activeTab, changeTab, scrollViewRef } = useHandleTab()

  const { handleBack } = useHandleRouter()

  const { data, isLoading, error, refetch } = useQuery<OneRun>({
    queryKey: ["getRun", pbRunId ?? id],
    queryFn: async () => {
      return await runService.getRun(pbRunId ?? id)
    },
    enabled: pbRunId ? !!pbRunId : !!id,
  })

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
        <Fragment>
          <View style={oneGameDetailsStyle.gameContainer}>
            <View style={oneGameDetailsStyle.backgroungImg}>
              <TouchableOpacity
                onPress={() => handleBack()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: Utils.moderateScale(20),
                  marginTop: Utils.moderateScale(40),
                  marginBottom: Utils.moderateScale(20),
                }}
              >
                <LeftArrow color={"white"} />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                }}
              >
                {data?.data ? videoComponent : null}
              </View>
            </View>
          </View>
          <TabName tabs={tabs} activeTab={activeTab} changeTab={changeTab} />

          <ScrollViewAndTabs
            tabs={tabs}
            activeTab={activeTab}
            changeTab={changeTab}
            scrollViewRef={scrollViewRef}
          />
        </Fragment>
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

  const tabs = data
    ? [
        {
          name: "Details",
          component: <Details data={data?.data} />,
        },
        {
          name: "Splits",
          component: <Splits splits={data?.data?.splits?.uri} />,
        },
      ]
    : []

  return (
    <ScrollView style={oneGameStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneRun()}
    </ScrollView>
  )
}

export default Run
