import React, { Fragment } from "react"
import { Marathons, Marathon } from "@/types/speedhub"
import { View, FlatList } from "react-native"
import mainStyle from "@/styles/base/main"
import OneMarathonUpcoming from "../marathon/OneMarathonUpcoming"
import { useQuery } from "@tanstack/react-query"
import { horaroService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"

const UpcomingMarathons = () => {
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

  const upcoming =
    data && data.filter((marathon) => marathon.type === "upcoming")

  const renderItem = ({ item, index }: { item: Marathon; index: number }) => {
    if (item.type === "upcoming") {
      return <OneMarathonUpcoming key={index} data={item} />
    }
    return null
  }

  const upcomingMarathons = () => {
    if (upcoming && upcoming.length > 0) {
      return (
        <FlatList
          data={upcoming}
          renderItem={renderItem}
          keyExtractor={(item) => item.marathonId.toString()}
        />
      )
    }

    return null
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>
        {!upcoming ? null : upcomingMarathons()}
      </View>
    </Fragment>
  )
}

export default UpcomingMarathons
