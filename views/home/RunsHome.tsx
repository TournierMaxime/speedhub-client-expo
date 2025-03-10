import { FlatList, View, Text, StyleSheet } from "react-native"
import { runService } from "@/services/speedrunDotCom"
import { useQuery } from "@tanstack/react-query"
import { useColorScheme } from "react-native"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import mainStyle from "@/styles/base/main"
import OneRunHome from "./OneRunHome"
import {
  GetLatestLeaderboard,
  GetLatestLeaderboardRuns,
} from "@/types/speedhub"
import { Runner } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"

const RunsHome = ({ limit }: { limit?: number }) => {
  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useQuery<GetLatestLeaderboard>({
    queryKey: ["getLatestLeaderboard", limit],
    queryFn: async () => {
      return await runService.getLatestLeaderboard(limit ?? undefined)
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
        <OneRunHome
          key={index}
          run={item}
          categories={data.categories}
          games={data.games}
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
          ListHeaderComponent={
            <View style={style.titleAndIcon}>
              <Text style={style.title}>Latest Runs</Text>
              <Runner />
            </View>
          }
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

const style = StyleSheet.create({
  title: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
  },
  titleAndIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Utils.moderateScale(10),
  },
})

export default RunsHome
