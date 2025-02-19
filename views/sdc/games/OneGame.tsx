import Header from "@/components/lib/Header"
import React from "react"
import { View } from "react-native"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { Game } from "@/types/sdc"
import { gameService } from "@/services/speedrunDotCom"
import IsLoading from "@/components/lib/IsLoading"
import Tabs from "@/components/lib/Tabs"
import CatchError from "@/components/lib/CatchError"
import GameDetails from "./GameDetails"
import { CategoriesTab } from "./CategoriesTab"
import { oneGameStyle } from "@/styles/views/oneGame"

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
  }

  const tabs = data
    ? [
        {
          name: "Details",
          component: GameDetails,
          props: { data: data.data },
        },
        {
          name: "Categories",
          component: CategoriesTab,
          props: { data: data.data },
        },
      ]
    : []

  return (
    <View style={oneGameStyle.container}>
      <Header backButton />
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
        <Tabs screens={tabs} />
      )}
    </View>
  )
}

export default OneGame
