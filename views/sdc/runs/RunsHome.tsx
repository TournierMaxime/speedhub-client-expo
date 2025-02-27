import { useState, useEffect } from "react"
import { View, FlatList } from "react-native"
import { runService } from "@/services/speedrunDotCom"
import { Runs } from "@/types/sdc"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useColorScheme } from "react-native"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import mainStyle from "@/styles/base/main"
import OneRunHome from "./OneRunHome"

interface Props {
  limit?: number
}

const RunsHome: React.FC<Props> = ({ limit }) => {
  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["getRuns", limit],
    queryFn: async () => {
      return await runService.getRuns(limit ?? 20)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
    staleTime: 1000 * 60 * 30,
  })

  const [runs, setRuns] = useState<Runs["data"]>([])

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return <OneRunHome key={index} id={item.id} />
  }

  const allRuns = () => {
    if (runs && runs.length > 0) {
      return <FlatList horizontal={true} data={runs} renderItem={renderItem} />
    }
    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data)
      setRuns(mergedData)
    }
  }, [data])

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <View style={mainStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allRuns()}
    </View>
  )
}

export default RunsHome
