import React from "react"
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import {
  GetUserLeaderboard,
  GetUserLeaderboardCategories,
  GetUserLeaderboardGames,
} from "@/types/sdc"
import Runtime from "@/components/lib/RunTime"
import { useColorScheme } from "react-native"
import ROUTES from "@/components/routes"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { pbStyle } from "@/styles/views/oneUser"

const CoverGame = ({
  games,
  gameId,
}: {
  games: GetUserLeaderboardGames[]
  gameId: string
}) => {
  if (games) {
    return games.map((game, idx) => {
      if (gameId === game.id) {
        const cover = game.staticAssets.find(
          (asset) => asset.assetType === "cover"
        )
        return (
          <Image
            key={idx}
            source={{
              uri: cover ? `https://www.speedrun.com${cover?.path}` : undefined,
            }}
            style={pbStyle.image}
          />
        )
      }
    })
  }
  return null
}

const Games = ({
  games,
  gameId,
}: {
  games: GetUserLeaderboardGames[]
  gameId: string
}) => {
  if (games) {
    return games.map((game, idx) => {
      if (gameId === game.id) {
        return (
          <Text key={idx} style={pbStyle.textCard}>
            {game.name}
          </Text>
        )
      }
    })
  }
  return null
}

const Categories = ({
  categories,
  categoryId,
}: {
  categories: GetUserLeaderboardCategories[]
  categoryId: string
}) => {
  if (categories) {
    return categories.map((category, idx) => {
      if (categoryId === category.id) {
        return (
          <Text key={idx} style={pbStyle.textCard}>
            {category.name}
          </Text>
        )
      }
    })
  }
  return null
}

const PersonalBestsUser = ({
  id,
  data,
}: {
  id: string
  data: GetUserLeaderboard
}) => {
  const theme = useColorScheme() ?? "light"

  const { handleRedirect } = useHandleRouter()

  const personalBests = () => {
    if (data && data.runs && data?.runs.length > 0) {
      const getPersonalBests = data.runs.map((pb, idx) => {
        if (!pb.obsolete)
          return (
            <TouchableOpacity
              key={idx}
              style={pbStyle.card}
              onPress={async () =>
                await handleRedirect(ROUTES.ONE_RUN, { id: pb.id })
              }
            >
              <View style={pbStyle.cardImage}>
                <CoverGame games={data.games} gameId={pb.gameId} />
              </View>
              <View style={pbStyle.cardInfo}>
                <Games games={data.games} gameId={pb.gameId} />
                <Categories
                  categories={data.categories}
                  categoryId={pb.categoryId}
                />
                <Runtime time={pb.time} />
              </View>
            </TouchableOpacity>
          )
      })
      return getPersonalBests
    }
    return null
  }

  return (
    <ScrollView style={pbStyle.container}>
      {!data ? null : personalBests()}
    </ScrollView>
  )
}

export default PersonalBestsUser
