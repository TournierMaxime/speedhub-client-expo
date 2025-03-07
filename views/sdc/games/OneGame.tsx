import React, { useState, useRef, Fragment } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
  StyleSheet,
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

const { width } = Dimensions.get("window")

export const TabName = ({
  tabs,
  activeTab,
  changeTab,
}: {
  tabs: any[]
  activeTab: number
  changeTab: (index: number) => void
}) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => changeTab(index)}
          style={[styles.tab, activeTab === index && styles.activeTab]}
        >
          <Text style={activeTab === index ? styles.activeText : styles.text}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const OneGame = () => {
  const { id } = useGlobalSearchParams()
  const { handleBack } = useHandleRouter()
  const { user } = useAuth()

  const userId = user?.userId

  const scrollViewRef = useRef<ScrollView>(null)

  const [activeTab, setActiveTab] = useState(0)

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
      ]
    : []

  const changeTab = (index: number) => {
    setActiveTab(index)
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true })
  }

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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: Utils.moderateScale(5),
    justifyContent: "space-around",
    borderTopLeftRadius: Utils.moderateScale(25),
    borderTopRightRadius: Utils.moderateScale(25),
    marginTop: Utils.moderateScale(-22),
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "blue",
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  activeText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default OneGame
