import { useState, useEffect } from "react"
import { ScrollView } from "react-native"
import { runService } from "@/services/speedrunDotCom"
import { Runs } from "@/types/sdc"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import mainStyle from "@/styles/base/main"
import OneRun from "./OneRun"

interface Props {
  limit?: number
}

const AllRuns: React.FC<Props> = ({ limit }) => {
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

  const allRuns = () => {
    if (runs && runs.length > 0) {
      return runs.map((run, idx) => <OneRun key={idx} id={run.id} />)
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
    <ScrollView style={mainStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allRuns()}
    </ScrollView>
  )
}

export default AllRuns
