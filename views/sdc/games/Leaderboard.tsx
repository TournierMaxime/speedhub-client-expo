import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { gameService } from "@/services/speedrunDotCom"
import Runtime from "@/components/lib/RunTime"
import Utils from "@/components/lib/Utils"

const Runs = ({ records, assets }: { records: any; assets: any }) => {
  if (!records?.runs?.length) return <Text>No records available</Text>

  return (
    <View>
      {records.runs.map((run: any, idx: number) => {
        const playerId = run.run.players[0]?.id
        const player = records.players?.data?.find(
          (p: any) => p.id === playerId
        )
        const playerName = player?.names?.international ?? "Unknown Player"

        const getTrophyUri = (place: number) => {
          switch (place) {
            case 1:
              return assets["trophy-1st"]?.uri
            case 2:
              return assets["trophy-2nd"]?.uri
            case 3:
              return assets["trophy-3rd"]?.uri
            default:
              return null
          }
        }

        const trophyUri = getTrophyUri(run.place)

        return (
          <View key={idx} style={styles.row}>
            {trophyUri && (
              <Image source={{ uri: trophyUri }} style={styles.trophy} />
            )}
            <Text style={styles.player}>{playerName}</Text>
            <Runtime time={run.run.times.primary_t} />
          </View>
        )
      })}
    </View>
  )
}

const Leaderboard = ({
  gameId,
  categoryId,
  variables = {},
  assets,
}: {
  gameId: string
  categoryId: string
  variables?: Record<string, string>
  assets?: any
}) => {
  // Utilisation de `useQuery` pour récupérer les records
  const {
    data: records,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getLeaderBoard", gameId, categoryId, variables],
    queryFn: async () => {
      const response = await gameService.getLeaderBoard(
        gameId,
        categoryId,
        variables
      )
      return response.data
    },
  })

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error fetching leaderboard</Text>
  if (!records?.runs?.length) return <Text>No records available</Text>

  return (
    <View>
      <Runs records={records} assets={assets} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Utils.moderateScale(5),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  trophy: {
    width: Utils.moderateScale(20),
    height: Utils.moderateScale(20),
    resizeMode: "contain",
    marginRight: Utils.moderateScale(10),
  },
  player: {
    fontSize: Utils.moderateScale(16),
    flex: 1,
    textAlign: "left",
    marginLeft: Utils.moderateScale(10),
  },
  time: {
    fontSize: Utils.moderateScale(16),
    fontWeight: "bold",
    width: Utils.moderateScale(80),
    textAlign: "right",
  },
})

export default Leaderboard
