import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Marathon, Marathons } from "@/types/speedhub"
import { useState, useEffect } from "react"
import { FlatList, View, StyleSheet, Text } from "react-native"
import mainStyle from "@/styles/base/main"
import OneMarathonUpcomingHome from "./OneMarathonUpcomingHome"
import Utils from "@/components/lib/Utils"
import { Calendar } from "@/components/lib/Icons"

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

  const renderItem = ({ item, index }: { item: Marathon; index: number }) => {
    return <OneMarathonUpcomingHome key={index} data={item} />
  }

  const [upcomings, setUpcomings] = useState<Marathons["data"]>([])

  const findFirstUpcomingMarathon = (upcoming: Marathon) => {
    if (upcoming.type === "upcoming") {
      return (
        <View style={style.titleAndIcon}>
          <Text style={style.title}>Upcoming Marathons</Text>
          <Calendar />
        </View>
      )
    }
    return null
  }

  const upcomingMarathons = () => {
    if (upcomings && upcomings.length > 0) {
      return (
        <Fragment>
          {findFirstUpcomingMarathon(upcomings[0])}

          <FlatList
            data={upcomings}
            renderItem={renderItem}
            keyExtractor={(item) => item.marathonId.toString()}
            nestedScrollEnabled={true}
            initialNumToRender={limit}
            maxToRenderPerBatch={limit}
            removeClippedSubviews={true}
            windowSize={limit}
          />
        </Fragment>
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

  if (error) {
    return <CatchError error={error} />
  }

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

export default UpcomingMarathonsHome
