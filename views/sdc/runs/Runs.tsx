import { View, FlatList } from "react-native"
import { runService } from "@/services/speedrunDotCom"
import { GetLatestLeaderboard, GetLatestLeaderboardRuns } from "@/types/sdc"
import { useQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import mainStyle from "@/styles/base/main"
import OneRun from "./OneRun"

const AllRuns = () => {
  const { data, isLoading, error } = useQuery<GetLatestLeaderboard>({
    queryKey: ["getRuns"],
    queryFn: async () => {
      return await runService.getLatestLeaderboard()
    },
    staleTime: 1000 * 60 * 30,
  })

  const renderItem = ({
    item,
    index,
  }: {
    item: GetLatestLeaderboardRuns
    index: number
  }) => {
    if (data) {
      return (
        <OneRun
          key={index}
          data={item}
          games={data.games}
          categories={data.categories}
          players={data.players}
        />
      )
    }

    return null
  }

  const allRuns = () => {
    if (data) {
      return (
        <FlatList
          data={data.runs ?? []}
          horizontal={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          nestedScrollEnabled={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
          windowSize={5}
        />
      )
    }
    return null
  }

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <View style={mainStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allRuns()}
    </View>
  )
}

export default AllRuns
