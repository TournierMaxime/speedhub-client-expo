import React, { Fragment } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  ImageBackground,
} from "react-native"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { GetGameData } from "@/types/sdc"
import { gameService } from "@/services/speedrunDotCom"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import GameDetails from "./GameDetails"
import { CategoriesTab } from "./CategoriesTab"
import { oneGameStyle, oneGameDetailsStyle } from "@/styles/views/oneGame"
import ROUTES from "@/components/routes"
import { Heart, HeartFill, LeftArrow } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { Discord } from "@/components/lib/Icons"
import SDCSVG from "@/assets/images/SDCSVG"
import useHandleFavorite from "@/hooks/user/useHandleFavorite"
import { useAuth } from "@/contexts/AuthContext"
import { favoriteUserService } from "@/services/speedhub"
import useHandleTab from "@/hooks/utils/useHandleTab"
import ScrollViewAndTabs, { TabName } from "@/components/lib/ScrollViewAndTabs"
import Guides from "./Guides"

const OneGame = () => {
  const { id } = useGlobalSearchParams()
  const { handleBack } = useHandleRouter()
  const { user } = useAuth()

  const { activeTab, changeTab, scrollViewRef } = useHandleTab()

  const userId = user?.userId

  const {
    data: GetGameData,
    isLoading: GetGameDataLoading,
    error: GetGameDataError,
    refetch: GetGameDataRefetch,
  } = useQuery<GetGameData>({
    queryKey: ["getGameData", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await gameService.getGameData(id)
    },
    enabled: !!id,
  })

  const cover = GetGameData?.game.staticAssets.find((asset) => {
    if (asset.assetType === "cover") {
      return asset
    }
  })

  const background = GetGameData?.game.staticAssets.find((asset) => {
    if (asset.assetType === "background") {
      return asset
    }
  })

  const { addFavorite, removeFavorite, isFollowing, setIsFollowing } =
    useHandleFavorite({
      data: {
        userId,
        type: "Game",
        data: {
          id: GetGameData?.game.id,
          image: `https://www.speedrun.com${cover?.path}`,
          name: GetGameData?.game.name,
        },
      },
    })

  const { data: favorites } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      if (!userId) return null
      const response = await favoriteUserService.searchFavorites(userId)
      const runner = response?.favorites?.data?.games?.find(
        (r: any) => r.id === id
      )
      setIsFollowing(!!runner)
      return response.favorites.data.games ?? []
    },
    enabled: !!userId,
  })

  if (GetGameDataError) return <CatchError error={GetGameDataError} />
  if (!GetGameData) GetGameDataRefetch()

  const tabs = GetGameData
    ? [
        { name: "Details", component: <GameDetails data={GetGameData} /> },
        { name: "Categories", component: <CategoriesTab data={GetGameData} /> },
        {
          name: "Guides",
          component: (
            <Guides url={GetGameData?.game?.url} id={GetGameData.game.id} />
          ),
        },
      ]
    : []

  return (
    <View style={oneGameStyle.container}>
      {GetGameDataLoading ? (
        <IsLoading isLoading={GetGameDataLoading} />
      ) : (
        <Fragment>
          <View style={oneGameDetailsStyle.gameContainer}>
            <ImageBackground
              source={{
                uri: background
                  ? `https://www.speedrun.com${background?.path}`
                  : undefined,
              }}
              style={oneGameDetailsStyle.backgroungImg}
              resizeMode="cover"
              imageStyle={{ opacity: 0.2 }}
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

                  {GetGameData?.game.url && (
                    <TouchableOpacity
                      style={{
                        padding: Utils.moderateScale(10),
                      }}
                      onPress={() =>
                        Linking.openURL(
                          `https://www.speedrun.com/${GetGameData?.game.url}`
                        )
                      }
                    >
                      <SDCSVG />
                    </TouchableOpacity>
                  )}
                  {GetGameData?.game.discordUrl && (
                    <TouchableOpacity
                      style={{
                        padding: Utils.moderateScale(10),
                      }}
                      onPress={() =>
                        Linking.openURL(GetGameData?.game.discordUrl)
                      }
                    >
                      <Discord />
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
                <Image
                  source={{
                    uri: cover
                      ? `https://www.speedrun.com${cover?.path}`
                      : undefined,
                  }}
                  style={oneGameDetailsStyle.img}
                />

                <Text style={oneGameDetailsStyle.gameTitle}>
                  {GetGameData?.game.name}
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

export default OneGame
