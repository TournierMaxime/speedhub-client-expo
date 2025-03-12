import Card from "@/components/lib/Card"
import { GetUserSummary, GetUserSummaryUserStats } from "@/types/sdc"
import React from "react"
import { FlatList, Text } from "react-native"

const Stats = ({ stats }: { stats: GetUserSummaryUserStats }) => {
  const renderItem = () => {
    return (
      <Card>
        <Text>{stats.runs}</Text>
      </Card>
    )
  }
  return renderItem()
}

export default Stats
