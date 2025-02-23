import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { useState, useEffect } from "react"
import { View, ScrollView } from "react-native"
import { useColorScheme } from "react-native"
import { redditService } from "@/services/reddit"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import { Reddits } from "@/types/reddit"
import OneReddit from "./OneReddit"

interface Props {
  limit?: number
}

const AllReddits: React.FC<Props> = ({ limit }) => {
  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["getReddits", limit],
    queryFn: async () => {
      return await redditService.getAllNews(limit ? { limit } : null)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
    staleTime: 1000 * 60 * 30,
  })

  const [reddits, setReddits] = useState<Reddits["data"]["children"]>([])

  const allReddits = () => {
    if (reddits.length > 0) {
      return reddits.map((reddit, idx) => {
        return <OneReddit data={reddit.data} key={idx} />
      })
    }

    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data.children)
      setReddits(mergedData)
    }
  }, [data])

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <ScrollView style={mainStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allReddits()}
    </ScrollView>
  )
}

export default AllReddits
