import {
  GetUserSummaryGames,
  GetUserSummaryUserGameRunnerStats,
  GetUserSummaryUserStats,
} from "@/types/sdc"
import React from "react"
import { ScrollView, Text, View } from "react-native"
import cardItemStyle from "@/styles/components/cardItem"
import moment from "moment"

const Stats = ({
  userStats,
  userGameRunnerStats,
  games,
}: {
  userStats: GetUserSummaryUserStats
  userGameRunnerStats: GetUserSummaryUserGameRunnerStats[]
  games: GetUserSummaryGames[]
}) => {
  const formatDuration = (totalSeconds: number) => {
    const duration = moment.duration(totalSeconds, "seconds")
    const hours = Math.floor(duration.asHours())
    const minutes = duration.minutes()

    return `${hours}H ${minutes}Min`
  }

  const renderItem = () => {
    return (
      <ScrollView>
        <View style={cardItemStyle.cardItem}>
          <Text style={cardItemStyle.title}>Total Runs {userStats.runs}</Text>
        </View>
        {userGameRunnerStats.map((stat, idx) => {
          const getGame = games.find(
            (game: GetUserSummaryGames) => game.id === stat.gameId
          )

          if (getGame) {
            return (
              <View key={idx} style={cardItemStyle.cardItem}>
                <Text style={cardItemStyle.title}>{getGame.name}</Text>
                <Text>Total Runs {stat.totalRuns}</Text>
                <Text>{formatDuration(stat.totalTime)}</Text>
              </View>
            )
          }
        })}
      </ScrollView>
    )
  }
  return renderItem()
}

export default Stats
