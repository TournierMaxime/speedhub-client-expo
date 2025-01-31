import React, { Fragment } from "react"
import { ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { Live } from "@/types/speedhub"
import { horaroService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import OneSchedule from "./OneSchedule"
import OneTicker from "./OneTicker"
import mainStyle from "@/styles/base/main"

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
          <OneTicker ticker={data.ticker.ticker} />
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
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneMarathonUpcoming()}
    </ScrollView>
  )
}

export default OneMarathonUpcoming
