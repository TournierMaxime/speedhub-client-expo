import React, { Fragment, useEffect } from "react"
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Utils from "@/components/lib/Utils"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import PersonalBestsUser from "./PersonalBestsUser"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import { oneUserStyle } from "@/styles/views/oneUser"
import { sdcService } from "@/services/speedhub"
import { useAuth } from "@/contexts/AuthContext"
import useHandleFavorite from "@/hooks/user/useHandleFavorite"
import { oneGameStyle, oneGameDetailsStyle } from "@/styles/views/oneGame"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { Heart, HeartFill, LeftArrow } from "@/components/lib/Icons"
import ROUTES from "@/components/routes"
import useHandleTab from "@/hooks/utils/useHandleTab"
import ScrollViewAndTabs, { TabName } from "@/components/lib/ScrollViewAndTabs"
import Social from "./Social"
import Stats from "./Stats"
import { GetUser } from "@/types/speedhub"

const OneUser = () => {
  const { url, id } = useGlobalSearchParams()
  const { handleBack } = useHandleRouter()
  const { user } = useAuth()

  const defaultUserImg = require("../../../assets/images/default.png")

  const { activeTab, changeTab, scrollViewRef } = useHandleTab()

  const userId = user?.userId

  const { data, isLoading, error } = useQuery<GetUser>({
    queryKey: ["getUserSummary", url],
    queryFn: async () => {
      if (!url) throw new Error("Missing url")
      return await sdcService.getUser(url, id)
    },
    enabled: !!url,
  })

  const image = data?.getUserSummary.user.staticAssets.find(
    (asset) => asset.assetType === "image"
  )

  const { addFavorite, removeFavorite, isFollowing, handleRunnerFavorite } =
    useHandleFavorite({
      data: {
        userId,
        type: "Runner",
        data: {
          id: data?.getUserSummary.user.id,
          url: data?.getUserSummary.user.url,
          image: image ? `https://www.speedrun.com${image.path}` : undefined,
          name: data?.getUserSummary.user.name,
        },
      },
    })

  useEffect(() => {
    if (id && !isFollowing) {
      handleRunnerFavorite.mutate(id)
    }
  }, [id])

  if (error) {
    return <CatchError error={error} />
  }

  const tabs = data
    ? [
        {
          name: "Personal Bests",
          component: (
            <PersonalBestsUser
              id={data.getUserSummary.user.id}
              data={data.getUserLeaderboard}
            />
          ),
        },
        {
          name: "Stats",
          component: (
            <Stats
              userStats={data.getUserSummary.userStats}
              userGameRunnerStats={data.getUserSummary.userGameRunnerStats}
              games={data.getUserSummary.games}
            />
          ),
        },
        {
          name: "Social",
          component: (
            <Social
              social={data.getUserSummary.userSocialConnectionList}
              networks={data.getSocialNetworkList}
            />
          ),
        },
      ]
    : []

  const background = data?.getUserSummary.theme?.staticAssets?.find(
    (asset) => asset.assetType === "background"
  )

  return (
    <View style={oneGameStyle.container}>
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
        <Fragment>
          <View style={oneGameDetailsStyle.gameContainer}>
            <ImageBackground
              style={oneGameDetailsStyle.backgroungImg}
              resizeMode="cover"
              imageStyle={{ opacity: 0.2 }}
              source={{
                uri: background
                  ? `https://www.speedrun.com${background.path}`
                  : undefined,
              }}
            >
              <TouchableOpacity
                onPress={() => handleBack(ROUTES.SEARCH)}
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {!defaultUserImg ? (
                  <Image source={defaultUserImg} style={oneUserStyle.image} />
                ) : (
                  <Image
                    source={{
                      uri: image
                        ? `https://www.speedrun.com${image.path}`
                        : undefined,
                    }}
                    style={oneUserStyle.image}
                  />
                )}

                <Text style={oneGameDetailsStyle.gameTitle}>
                  {data?.getUserSummary.user.name}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <TabName tabs={tabs} activeTab={activeTab} changeTab={changeTab} />

          <ScrollViewAndTabs
            tabs={tabs}
            activeTab={activeTab}
            changeTab={changeTab}
            scrollViewRef={scrollViewRef}
          />
        </Fragment>
      )}
    </View>
  )
}

const style = StyleSheet.create({
  followButtonContainer: {
    backgroundColor: "black",
    padding: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    marginTop: Utils.moderateScale(10),
  },
  followText: {
    color: "white",
    fontSize: Utils.moderateScale(16),
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default OneUser
