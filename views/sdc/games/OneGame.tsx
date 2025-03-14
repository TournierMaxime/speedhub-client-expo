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
import { favoriteUserService, sdcService } from "@/services/speedhub"
import useHandleTab from "@/hooks/utils/useHandleTab"
import ScrollViewAndTabs, { TabName } from "@/components/lib/ScrollViewAndTabs"
import Guides from "./Guides"
import Ressources from "./Ressources"
import { GetGame } from "@/types/speedhub"

const OneGame = () => {
  const { id } = useGlobalSearchParams()
  const { handleBack } = useHandleRouter()
  const { user } = useAuth()

  const { activeTab, changeTab, scrollViewRef } = useHandleTab()

  const userId = user?.userId

  const { data, isLoading, error, refetch } = useQuery<GetGame>({
    queryKey: ["getGame", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await sdcService.getGame(id)
    },
    enabled: !!id,
  })

  const cover = data?.getGameData?.game.staticAssets.find((asset) => {
    if (asset.assetType === "cover") {
      return asset
    }
  })

  const background = data?.getGameData?.game.staticAssets.find((asset) => {
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
          id: data?.getGameData?.game.id,
          image: `https://www.speedrun.com${cover?.path}`,
          name: data?.getGameData?.game.name,
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

  if (error) return <CatchError error={error} />
  if (!data) refetch()

  const tabs = data
    ? [
        { name: "Details", component: <GameDetails data={data.getGameData} /> },
        {
          name: "Categories",
          component: <CategoriesTab data={data.getGameData} />,
        },
        {
          name: "Guides",
          component: (
            <Guides
              url={data.getGameData?.game?.url}
              id={data.getGameData.game.id}
              data={data.getGuides}
            />
          ),
        },
        {
          name: "Tools",
          component: (
            <Ressources
              url={data.getGameData?.game?.url}
              id={data.getGameData.game.id}
              data={data.getResourceList}
            />
          ),
        },
      ]
    : []

  return (
    <View style={oneGameStyle.container}>
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
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

                  {data && data.getGameData && data.getGameData.game.url && (
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
                  {data &&
                    data.getGameData &&
                    data.getGameData.game.discordUrl && (
                      <TouchableOpacity
                        style={{
                          padding: Utils.moderateScale(10),
                        }}
                        onPress={() =>
                          Linking.openURL(data.getGameData.game.discordUrl)
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
                  {data?.getGameData?.game.name}
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
