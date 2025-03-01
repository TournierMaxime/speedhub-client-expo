import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Upcoming, Upcomings } from "@/types/speedhub"
import { useState, useEffect } from "react"
import { FlatList, View } from "react-native"
import mainStyle from "@/styles/base/main"
import OneMarathonUpcomingHome from "./OneMarathonUpcomingHome"

const UpcomingMarathonsHome = ({ limit }: { limit: number }) => {
  const { data, isLoading, error, refetch } = useInfiniteQuery({
    queryKey: ["getUpcomings", limit],
    queryFn: async () => {
      return await horaroService.getUpcomings(limit ? { limit } : null)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
    staleTime: 1000 * 60 * 30,
  })

  const [upcomings, setUpcomings] = useState<Upcomings["data"]>([])

  if (error) {
    return <CatchError error={error} />
  }

  const renderItem = ({ item, index }: { item: Upcoming; index: number }) => {
    return <OneMarathonUpcomingHome key={index} data={item} />
  }

  const upcomingMarathons = () => {
    if (upcomings && upcomings.length > 0) {
      return (
        <FlatList horizontal={true} data={upcomings} renderItem={renderItem} />
      )
    }

    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data)
      const filteredData = mergedData.filter((item) => item !== undefined)
      setUpcomings(filteredData)
    }
  }, [data])

  if (upcomings === undefined && !isLoading) {
    refetch()
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>
        {isLoading ? (
          <IsLoading isLoading={isLoading} />
        ) : (
          upcomings && upcomings.length > 0 && upcomingMarathons()
        )}
      </View>
    </Fragment>
  )
}

export default UpcomingMarathonsHome
