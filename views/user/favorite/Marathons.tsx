import Header from "@/components/lib/Header"
import mainStyle from "@/styles/base/main"
import React from "react"
import { View } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { Favorite, Favorites } from "@/types/speedhub"
import { favoriteUserService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"

export default function Marathons() {
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

  const marathons = data?.favorites.data.marathons

  return (
    <View style={mainStyle.container}>
      <Header backButton={true} />
      {marathons?.length === 0 ? <CatchError message={"No Favorites"} /> : null}
      {marathons?.map((marathon: Favorite, idx: number) => {
        return <View key={idx}>{marathon.name}</View>
      })}
    </View>
  )
}
