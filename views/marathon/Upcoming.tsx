import React, { Fragment } from "react"
import { ScrollView, Text, View, TouchableOpacity } from "react-native"
import { Marathon } from "@/types/speedhub"
import TwitchIframe from "@/components/lib/TwitchIframe"
import Utils from "@/components/lib/Utils"
import { router, useLocalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { horaroService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import OneTicker from "./OneTicker"
import OneSchedule from "./OneSchedule"
import { oneGameDetailsStyle, oneGameStyle } from "@/styles/views/oneGame"
import { Heart, HeartFill, LeftArrow } from "@/components/lib/Icons"
import useHandleFavorite from "@/hooks/user/useHandleFavorite"
import { useAuth } from "@/contexts/AuthContext"
import { favoriteUserService } from "@/services/speedhub"
import useHandleTab from "@/hooks/utils/useHandleTab"
import ScrollViewAndTabs, { TabName } from "@/components/lib/ScrollViewAndTabs"

const UpcomingMarathon = () => {
  const { marathonId } = useLocalSearchParams()
  const { user } = useAuth()

  const { activeTab, changeTab, scrollViewRef } = useHandleTab()

  const userId = user?.userId

  const { data, isLoading, error, refetch } = useQuery<Marathon>({
    queryKey: ["getMarathonUpcoming", marathonId],
    queryFn: async () => {
      if (!marathonId) throw new Error("Missing ID")
      return await horaroService.getUpcoming(marathonId)
    },
    enabled: !!marathonId,
  })

  const { addFavorite, removeFavorite, isFollowing, setIsFollowing } =
    useHandleFavorite({
      data: {
        userId,
        type: "Marathon",
        data: {
          id: data?.marathonId,
          image: undefined,
          name: data?.name,
          twitchChannel: data?.twitchChannel,
        },
      },
    })

  const { data: favorites } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      if (!userId) return null
      const response = await favoriteUserService.searchFavorites(userId)
      const runner = response?.favorites?.data?.marathons?.find(
        (r: any) => r.id === marathonId
      )
      setIsFollowing(!!runner)
      return response.favorites.data.marathons ?? []
    },
    enabled: !!userId,
  })

  const oneMarathonUpcoming = () => {
    if (data && data.marathonId && data?.twitchChannel) {
      return (
        <Fragment>
          <View style={oneGameDetailsStyle.gameContainer}>
            <View style={oneGameDetailsStyle.backgroungImg}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: Utils.moderateScale(20),
                  marginTop: Utils.moderateScale(40),
                }}
              >
                <LeftArrow color={"white"} />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {isFollowing ? (
                    <TouchableOpacity
                      onPress={() => removeFavorite.mutate()}
                      style={{
                        padding: Utils.moderateScale(10),
                      }}
                    >
                      <HeartFill />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => addFavorite.mutate()}
                      style={{
                        padding: Utils.moderateScale(10),
                      }}
                    >
                      <Heart color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                }}
              >
                {data?.twitchChannel ? (
                  <TwitchIframe
                    channel={data.twitchChannel}
                    platform="twitch"
                    width={380}
                    height={220}
                  />
                ) : null}
                <Text
                  style={{
                    fontSize: Utils.moderateScale(18),
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: Utils.moderateScale(20),
                    marginBottom: Utils.moderateScale(10),
                    color: "white",
                  }}
                >
                  {data.name}
                </Text>
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
          name: "Ticker",
          component: <OneTicker ticker={data.ticker} />,
        },
        {
          name: "Schedule",
          component: <OneSchedule schedule={data.schedule} />,
        },
      ]
    : []

  return (
    <ScrollView style={oneGameStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneMarathonUpcoming()}
    </ScrollView>
  )
}

export default UpcomingMarathon
