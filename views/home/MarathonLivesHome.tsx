import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Marathon, Marathons } from "@/types/speedhub"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import mainStyle from "@/styles/base/main"
import { BroadCast } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"
import OneMarathonLiveHome from "./OneMarathonLiveHome"

const MarathonLivesHome = ({ limit }: { limit: number }) => {
  const { data, isLoading, error, refetch } = useInfiniteQuery({
    queryKey: ["getLives", limit],
    queryFn: async () => {
      return await horaroService.getLives(
        limit ? { limit, isLive: true } : null
      )
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
    staleTime: 1000 * 60 * 30,
  })

  const renderItem = ({ item, index }: { item: Marathon; index: number }) => {
    if (item.isLive) {
      return <OneMarathonLiveHome key={index} data={item} />
    }
    return null
  }

  const [lives, setLives] = useState<Marathons["data"]>([])

  const findFirstLiveMarathon = (live: Marathon) => {
    if (live.type === "live") {
      return (
        <View style={style.titleAndIcon}>
          <Text style={style.title}>Live Marathons</Text>
          <BroadCast />
        </View>
      )
    }
    return null
  }

  const marathonsLive = () => {
    if (lives && lives.length > 0) {
      return (
        <Fragment>
          {findFirstLiveMarathon(lives[0])}

          <FlatList horizontal={true} data={lives} renderItem={renderItem} />
        </Fragment>
      )
    }

    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data)
      const filteredData = mergedData.filter((item) => item !== undefined)
      setLives(filteredData)
    }
  }, [data])

  if (error) {
    return <CatchError error={error} />
  }

  if (lives === undefined && !isLoading) {
    refetch()
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>
        {isLoading ? (
          <IsLoading isLoading={isLoading} />
        ) : (
          lives && lives.length > 0 && marathonsLive()
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

export default MarathonLivesHome
