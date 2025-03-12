import React, { Fragment } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Utils from "@/components/lib/Utils"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { GetUserSummary, User } from "@/types/sdc"
import { userService } from "@/services/speedrunDotCom"
import PersonalBestsUser from "./PersonalBestsUser"
import moment from "moment"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import UserName from "@/components/lib/UserName"
import { oneUserStyle } from "@/styles/views/oneUser"
import { favoriteUserService } from "@/services/speedhub"
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

const OneUser = () => {
  const { url } = useGlobalSearchParams()
  const { handleBack } = useHandleRouter()
  const { user } = useAuth()

  const defaultUserImg = require("../../../assets/images/default.png")

  const { activeTab, changeTab, scrollViewRef } = useHandleTab()

  const userId = user?.userId

  const { data, isLoading, error } = useQuery<GetUserSummary>({
    queryKey: ["getUserSummary", url],
    queryFn: async () => {
      if (!url) throw new Error("Missing url")
      return await userService.getUserSummary(url)
    },
    enabled: !!url,
  })

  const image = data?.user.staticAssets.find(
    (asset) => asset.assetType === "image"
  )

  const { addFavorite, removeFavorite, isFollowing, setIsFollowing } =
    useHandleFavorite({
      data: {
        userId,
        type: "Runner",
        data: {
          id: data?.user.id,
          image: image ? `https://www.speedrun.com${image.path}` : undefined,
          name: data?.user.name,
        },
      },
    })

  const { data: favorites } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      if (!userId) return null
      const response = await favoriteUserService.searchFavorites(userId)
      const runner = response?.favorites?.data?.runners?.find(
        (r: any) => r.id === data?.user.id
      )
      setIsFollowing(!!runner)
      return response.favorites.data.runners ?? []
    },
    enabled: !!userId,
  })

  if (error) {
    return <CatchError error={error} />
  }

  const tabs = data
    ? [
        {
          name: "Personal Bests",
          component: <PersonalBestsUser id={data.user.id} />,
        },
        {
          name: "Stats",
          component: <Stats stats={data.userStats} />,
        },
        {
          name: "Social",
          component: <Social social={data.userSocialConnectionList} />,
        },
      ]
    : []

  const background = data?.theme?.staticAssets?.find(
    (asset) => asset.assetType === "background"
  )

  return (
    <ScrollView style={oneGameStyle.container}>
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
                {defaultUserImg ? (
                  <Image
                    source={defaultUserImg}
                    style={oneGameDetailsStyle.img}
                  />
                ) : (
                  <Image
                    source={{
                      uri: image
                        ? `https://www.speedrun.com${image.path}`
                        : undefined,
                    }}
                    style={oneGameDetailsStyle.img}
                  />
                )}

                <Text style={oneGameDetailsStyle.gameTitle}>
                  {data?.user.name}
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
    </ScrollView>
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
