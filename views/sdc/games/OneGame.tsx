import React, { useState, useRef } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { Game } from "@/types/sdc"
import { gameService } from "@/services/speedrunDotCom"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import GameDetails from "./GameDetails"
import { CategoriesTab } from "./CategoriesTab"
import Header from "@/components/lib/Header"
import { oneGameStyle } from "@/styles/views/oneGame"
import ROUTES from "@/components/routes"

const { width } = Dimensions.get("window")

const OneGame = () => {
  const { id } = useGlobalSearchParams()
  const scrollViewRef = useRef<ScrollView>(null)
  const [activeTab, setActiveTab] = useState(0)

  const { data, isLoading, error, refetch } = useQuery<Game>({
    queryKey: ["getRun", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await gameService.getGame(id)
    },
    enabled: !!id,
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
      <Header backButton={true} lastPath={{ pathname: ROUTES.SEARCH }} />
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => changeTab(index)}
                style={[styles.tab, activeTab === index && styles.activeTab]}
              >
                <Text
                  style={activeTab === index ? styles.activeText : styles.text}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "space-around",
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
