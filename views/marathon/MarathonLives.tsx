import React, { Fragment } from "react"
import { Marathons, Marathon } from "@/types/speedhub"
import { View, FlatList } from "react-native"
import mainStyle from "@/styles/base/main"
import OneMarathonLive from "../marathon/OneMarathonLive"
import { useQuery } from "@tanstack/react-query"
import { horaroService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"

const MarathonLives = () => {
  const { data, isLoading, error, refetch } = useQuery<Marathons["data"]>({
    queryKey: ["getMarathons"],
    queryFn: async () => {
      return await horaroService.getMarathons()
    },
  })

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && isLoading) {
    refetch()
  }

  const lives = data && data.filter((marathon) => marathon.type === "live")

  const renderItem = ({ item, index }: { item: Marathon; index: number }) => {
    if (item.isLive && item.type === "live") {
      return <OneMarathonLive key={index} data={item} />
    }
    return null
  }

  const marathonsLive = () => {
    if (lives && lives.length > 0) {
      return (
        <FlatList
          data={lives}
          renderItem={renderItem}
          keyExtractor={(item) => item.marathonId.toString()}
        />
      )
    }

    return null
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>{!lives ? null : marathonsLive()}</View>
    </Fragment>
  )
}

export default MarathonLives
