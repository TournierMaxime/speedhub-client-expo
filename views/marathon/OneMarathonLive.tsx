import React, { Fragment } from "react"
import { Text, ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { Live } from "../interface"
import { horaroService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import OneSchedule from "./OneSchedule"
import OneTicker from "./OneTicker"
import TwitchIframe from "@/components/lib/TwitchIframe"
import mainStyle from "@/styles/base/main"

const OneMarathonLive = () => {
  const { horaroId } = useGlobalSearchParams()

  const { data, isLoading, error, refetch } = useQuery<Live>({
    queryKey: ["getLive", horaroId],
    queryFn: async () => {
      if (!horaroId) throw new Error("Missing ID")
      return await horaroService.getLive(horaroId)
    },
    enabled: !!horaroId,
  })

  const oneMarathonLive = () => {
    if (data) {
      return (
        <Fragment>
          {data?.schedule?.twitch ? (
            <TwitchIframe channel={data.schedule.twitch} />
          ) : (
            <Text>Twitch channel not provided</Text>
          )}
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
    <ScrollView style={mainStyle.container}>
      <Header backButton={true} title="" />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneMarathonLive()}
    </ScrollView>
  )
}

export default OneMarathonLive
