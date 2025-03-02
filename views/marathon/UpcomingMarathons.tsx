import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Upcomings } from "@/types/speedhub"
import { useState, useEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import mainStyle from "@/styles/base/main"
import OneMarathonUpcoming from "../marathon/OneMarathonUpcoming"
import Utils from "@/components/lib/Utils"
import { Calendar } from "@/components/lib/Icons"

const UpcomingMarathons = ({ limit }: { limit: number }) => {
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

  const upcomingMarathons = () => {
    if (upcomings.length > 0) {
      return (
        <Fragment>
          <View style={style.titleAndIcon}>
            <Text style={style.title}>Upcoming Marathons</Text>
            <Calendar />
          </View>

          {upcomings.map((upcoming, idx) => {
            if (!upcoming.ticker) return null
            return <OneMarathonUpcoming key={idx} data={upcoming} />
          })}
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

export default UpcomingMarathons
