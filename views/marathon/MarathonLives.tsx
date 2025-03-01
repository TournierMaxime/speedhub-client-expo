import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Lives } from "@/types/speedhub"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useColorScheme } from "react-native"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import { BroadCast } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"
import OneMarathonLive from "../marathon/OneMarathonLive"

const MarathonLives = ({ limit }: { limit: number }) => {
  const theme = useColorScheme() ?? "light"

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

  const [lives, setLives] = useState<Lives["data"]>([])

  const marathonsLive = () => {
    if (lives.length > 0) {
      return (
        <Fragment>
          <View style={style.titleAndIcon}>
            <Text style={style.title}>Live Marathons</Text>
            <BroadCast />
          </View>
          <View
            style={[
              cardStyle.card,
              theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
            ]}
          >
            {lives.map((live, idx) => {
              if (live.isLive) {
                return <OneMarathonLive key={idx} data={live} />
              }

              return null
            })}
          </View>
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

export default MarathonLives
