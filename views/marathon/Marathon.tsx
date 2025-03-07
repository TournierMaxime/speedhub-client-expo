import React, { useState, useRef, Fragment } from "react"
import {
  ScrollView,
  Text,
  View,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { Live } from "@/types/speedhub"
import TwitchIframe from "@/components/lib/TwitchIframe"
import Utils from "@/components/lib/Utils"
import { useLocalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { horaroService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import OneTicker from "./OneTicker"
import OneSchedule from "./OneSchedule"
import { oneGameDetailsStyle, oneGameStyle } from "@/styles/views/oneGame"
import { TabName } from "../sdc/games/OneGame"
import ROUTES from "@/components/routes"
import { Heart, HeartFill, LeftArrow } from "@/components/lib/Icons"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import useHandleFavorite from "@/hooks/user/useHandleFavorite"
import { useAuth } from "@/contexts/AuthContext"
import { favoriteUserService } from "@/services/speedhub"

const { width } = Dimensions.get("window")

const Marathon = () => {
  const { horaroId } = useLocalSearchParams()
  const { handleBack } = useHandleRouter()
  const { user } = useAuth()

  const userId = user?.userId

  const theme = useColorScheme() ?? "light"

  const scrollViewRef = useRef<ScrollView>(null)

  const [activeTab, setActiveTab] = useState(0)

  const { data, isLoading, error, refetch } = useQuery<Live>({
    queryKey: ["getMarathonLive", horaroId],
    queryFn: async () => {
      if (!horaroId) throw new Error("Missing ID")
      return await horaroService.getLive(horaroId)
    },
    enabled: !!horaroId,
  })

  const { addFavorite, removeFavorite, isFollowing, setIsFollowing } =
    useHandleFavorite({
      data: {
        userId,
        type: "Marathon",
        data: {
          id: data?.horaroId,
          image: undefined,
          name: data?.name,
        },
      },
    })

  const { data: favorites } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      if (!userId) return null
      const response = await favoriteUserService.searchFavorites(userId)
      const runner = response?.favorites?.data?.marathons?.find(
        (r: any) => r.id === horaroId
      )
      setIsFollowing(!!runner)
      return response.favorites.data.marathons ?? []
    },
    enabled: !!userId,
  })

  const oneMarathonLive = () => {
    if (data && data.scheduleId && data?.schedule?.twitch) {
      return (
        <Fragment>
          <View style={oneGameDetailsStyle.gameContainer}>
            <View style={oneGameDetailsStyle.backgroungImg}>
              <TouchableOpacity
                onPress={() => handleBack(ROUTES.ALL_MARATHONS)}
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
                {data?.schedule?.twitch ? (
                  <TwitchIframe
                    channel={data.schedule.twitch}
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

          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / width
              )
              setActiveTab(newIndex)
            }}
            style={{ flex: 1 }}
          >
            {tabs.map((tab, index) => (
              <View key={index} style={{ width, flex: 1 }}>
                {tab.component}
              </View>
            ))}
          </ScrollView>
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
          component: <OneTicker ticker={data.ticker.ticker} />,
        },
        {
          name: "Schedule",
          component: <OneSchedule schedule={data.schedule} />,
        },
      ]
    : []

  const changeTab = (index: number) => {
    setActiveTab(index)
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true })
  }

  return (
    <ScrollView style={oneGameStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneMarathonLive()}
    </ScrollView>
  )
}

export default Marathon
