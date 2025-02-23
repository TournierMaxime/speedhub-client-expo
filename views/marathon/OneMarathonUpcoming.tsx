import React, { Fragment } from "react"
import { Text, View } from "react-native"
import { Upcoming, Upcomings } from "@/types/speedhub"
import OneSchedule from "./OneSchedule"
import OneTicker from "./OneTicker"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"

const OneMarathonUpcoming = ({ data }: { data: Upcoming }) => {
  const oneMarathonUpcoming = () => {
    if (data) {
      return (
        <Fragment>
          <Text
            style={{
              fontSize: Utils.moderateScale(18),
              fontWeight: "bold",
              textAlign: "center",
              marginTop: Utils.moderateScale(20),
              marginBottom: Utils.moderateScale(10),
            }}
          >
            {data.name}
          </Text>
          <OneTicker ticker={data.ticker.ticker} />
          <OneSchedule schedule={data.schedule} />
        </Fragment>
      )
    }
    return null
  }

  return (
    <View style={mainStyle.container}>
      {!data ? null : oneMarathonUpcoming()}
    </View>
  )
}

export default OneMarathonUpcoming
