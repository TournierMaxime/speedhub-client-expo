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
import { Game } from "@/types/sdc"
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

  const { data, isLoading, error, refetch } = useQuery<Game>({
    queryKey: ["getGame", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await gameService.getGame(id)
    },
    enabled: !!id,
  })

  const { addFavorite, removeFavorite, isFollowing, setIsFollowing } =
    useHandleFavorite({
      data: {
        userId,
        type: "Game",
        data: {
          id: data?.data?.id,
          image: data?.data?.assets["cover-large"]?.uri,
          name: data?.data?.names?.international,
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
        { name: "Details", component: <GameDetails data={data.data} /> },
        { name: "Categories", component: <CategoriesTab data={data.data} /> },
        { name: "Guides", component: <Guides id={data.data.id} /> },
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
                uri: data?.data?.assets?.background?.uri,
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

                  {data?.data?.weblink && (
                    <TouchableOpacity
                      style={{
                        padding: Utils.moderateScale(10),
                      }}
                      onPress={() => Linking.openURL(data?.data?.weblink)}
                    >
                      <SDCSVG />
                    </TouchableOpacity>
                  )}
                  {data?.data?.discord && (
                    <TouchableOpacity
                      style={{
                        padding: Utils.moderateScale(10),
                      }}
                      onPress={() => Linking.openURL(data?.data?.discord)}
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
                    uri: data?.data?.assets["cover-large"]?.uri,
                  }}
                  style={oneGameDetailsStyle.img}
                />

                <Text style={oneGameDetailsStyle.gameTitle}>
                  {data?.data?.names?.international}
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
