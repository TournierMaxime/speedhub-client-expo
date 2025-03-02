import Header from "@/components/lib/Header"
import mainStyle from "@/styles/base/main"
import React from "react"
import { View } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { Favorite, Favorites } from "@/types/speedhub"
import { favoriteUserService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"

export default function Games() {
  const { user } = useAuth()

  const userId = user?.userId

  const { data, isLoading, error, refetch } = useQuery<Favorites>({
    queryKey: ["searchFavorites", userId],
    queryFn: async () => {
      return await favoriteUserService.searchFavorites(userId ?? "")
    },
    enabled: !!userId,
  })

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && !isLoading) {
    refetch()
  }

  const games = data?.favorites.data.games

  return (
    <View style={mainStyle.container}>
      <Header backButton={true} />
      {games?.length === 0 ? <CatchError message={"No Favorites"} /> : null}
      {games?.map((game: Favorite, idx: number) => {
        return <View key={idx}>{game.name}</View>
      })}
    </View>
  )
}
