import Header from "@/components/lib/Header"
import React from "react"
import { View, StyleSheet } from "react-native"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { Game } from "../interface"
import { gameService } from "@/services/speedrunDotCom"
import IsLoading from "@/components/lib/IsLoading"
import Tabs from "@/components/lib/Tabs"
import CatchError from "@/components/lib/CatchError"
import GameDetails from "./GameDetails"
import { CategoriesTab, LevelsTab, ModeratorsTab } from "./GameTabs"

const OneGame = () => {
  const { id } = useGlobalSearchParams()

  const { data, isLoading, error, refetch } = useQuery<Game>({
    queryKey: ["getRun", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await gameService.getGame(id)
    },
    enabled: !!id,
  })

  if (error) return <CatchError error={error} />

  if (!data) {
    refetch()
    return null
  }

  const tabs = [
    {
      name: "Details",
      component: GameDetails,
      props: { data: data.data },
    },
    {
      name: "Categories",
      component: CategoriesTab,
      props: { categories: data.data.categories.data },
    },
    {
      name: "Levels",
      component: LevelsTab,
      props: { levels: data.data.levels.data },
    },
    {
      name: "Moderators",
      component: ModeratorsTab,
      props: { moderators: data.data.moderators.data },
    },
  ]

  return (
    <View style={style.container}>
      <Header backButton />
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
        <Tabs screens={tabs} />
      )}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default OneGame
