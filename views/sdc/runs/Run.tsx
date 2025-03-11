import React, { Fragment } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { runService } from "@/services/speedrunDotCom"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import Runtime from "@/components/lib/RunTime"
import { useColorScheme } from "react-native"
import CatchError from "@/components/lib/CatchError"
import TwitchIframe from "@/components/lib/TwitchIframe"
import UserName from "@/components/lib/UserName"
import { oneGameDetailsStyle } from "@/styles/views/oneGame"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"
import { GetRun, GetRunGame, GetRunPlayers, Run as OneRun } from "@/types/sdc"
import Utils from "@/components/lib/Utils"
import { useLocalSearchParams } from "expo-router"
import useHandleTab from "@/hooks/utils/useHandleTab"
import ScrollViewAndTabs, { TabName } from "@/components/lib/ScrollViewAndTabs"
import { oneGameStyle } from "@/styles/views/oneGame"
import IsLoading from "@/components/lib/IsLoading"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { LeftArrow } from "@/components/lib/Icons"
import ROUTES from "@/components/routes"
import { VideoPlatform } from "@/types/speedhub"
import { getPlatformFromUrl } from "@/components/lib/VideoPlatform"

const Details = ({ data }: { data: GetRun }) => {
  const { handleReplace } = useHandleRouter()

  const getPlayers = (players: GetRunPlayers[]) => {
    const player = players.find((player) => player)
    return player ? getPlayer(player) : null
  }

  const getPlayer = (player: GetRunPlayers) => {
    return <UserName data={player.name} />
  }

  const getTime = () => {
    return <Runtime time={data.run.time} />
  }

  const getGame = (game: GetRunGame) => {
    return (
      <TouchableOpacity
        onPress={() => handleReplace(ROUTES.ONE_GAME, { id: data.game.id })}
      >
        <Text style={cardStyle.text}>{game.name}</Text>
      </TouchableOpacity>
    )
  }

  const getComment = (comment: GetRun["run"]["comment"]) => {
    if (comment) {
      return (
        <Text style={[cardStyle.text, { marginTop: Utils.moderateScale(10) }]}>
          {comment}
        </Text>
      )
    }

    return null
  }

  const getContent = (data: GetRun) => {
    if (data) {
      return (
        <View
          style={[
            oneRunStyle.playerContainer,
            { width: "90%", marginHorizontal: "auto" },
          ]}
        >
          <View>
            {getPlayers(data.players)}
            {getGame(data.game)}
            {getTime()}
            {data?.run?.comment ? getComment(data.run.comment) : null}
            <Text>{data.run.id}</Text>
          </View>
        </View>
      )
    }
    return null
  }

  return getContent(data)
}

const Run = () => {
  const theme = useColorScheme() ?? "light"
  const { id } = useLocalSearchParams()

  const { activeTab, changeTab, scrollViewRef } = useHandleTab()

  const { handleBack } = useHandleRouter()

  const { data, isLoading, error, refetch } = useQuery<GetRun>({
    queryKey: ["getRun", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await runService.getRunV2(id)
    },
    enabled: !!id,
  })

  const oneRun = () => {
    if (data) {
      const videoUri = data.run.video

      let videoComponent
      let platform = getPlatformFromUrl(videoUri)

      switch (platform) {
        case "youtube":
          videoComponent = (
            <YoutubeIframe
              platform={platform}
              videoUri={videoUri}
              width={380}
              height={220}
            />
          )
          break

        case "twitch":
          videoComponent = (
            <TwitchIframe
              videoUri={videoUri}
              platform={platform}
              width={380}
              height={220}
            />
          )
          break

        case "youtu.be":
          videoComponent = (
            <YoutubeIframe
              platform={platform}
              videoUri={videoUri}
              width={380}
              height={220}
            />
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
                {data?.run.video ? videoComponent : null}
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
          component: <Details data={data} />,
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
