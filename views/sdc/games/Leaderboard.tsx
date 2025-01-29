import { useState, useEffect } from "react"
import { gameService } from "@/services/speedrunDotCom"
import { View, Text, FlatList } from "react-native"
import Runtime from "@/components/lib/RunTime"

const Leaderboard = ({
  gameId,
  categoryId,
}: {
  gameId: string
  categoryId: string
}) => {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await gameService.getLeaderBoard(gameId, categoryId)
        setRecords(response.data.runs)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [gameId, categoryId])

  if (loading) return <Text>Loading...</Text>
  if (records.length === 0) return <Text>No records available</Text>

  return (
    <FlatList
      data={records}
      keyExtractor={(item) => item.run.id}
      renderItem={({ item }) => (
        <View>
          <Text>#{item.place}</Text>
          <Text>Player ID: {item.run.players[0].id}</Text>
          <Runtime time={item.run.times.primary} />
        </View>
      )}
    />
  )
}

export default Leaderboard
