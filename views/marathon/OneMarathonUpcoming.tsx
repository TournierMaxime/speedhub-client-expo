import React, { Fragment } from "react"
import { StyleSheet, ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { Live } from "../interface"
import { horaroService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import OneSchedule from "./OneSchedule"
import OneTicker from "./OneTicker"

const OneMarathonUpcoming = () => {
  const { horaroId } = useGlobalSearchParams()

  const { data, isLoading, error, refetch } = useQuery<Live>({
    queryKey: ["getUpcoming", horaroId],
    queryFn: async () => {
      if (!horaroId) throw new Error("Missing ID")
      return await horaroService.getUpcoming(horaroId)
    },
    enabled: !!horaroId,
  })

  const oneMarathonUpcoming = () => {
    if (data) {
      return (
        <Fragment>
          <OneTicker ticker={data.ticker} />
          <OneSchedule schedule={data.schedule} />
        </Fragment>
      )
    }
    return null
  }

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && !isLoading) {
    refetch()
  }

  return (
    <ScrollView style={style.container}>
      <Header backButton={true} title="" />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneMarathonUpcoming()}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
  },
})

export default OneMarathonUpcoming
