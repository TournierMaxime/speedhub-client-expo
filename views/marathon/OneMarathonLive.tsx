import React, { Fragment } from "react"
import { Text, View } from "react-native"
import { Live } from "@/types/speedhub"
import OneSchedule from "./OneSchedule"
import OneTicker from "./OneTicker"
import TwitchIframe from "@/components/lib/TwitchIframe"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"

const OneMarathonLive = ({ data }: { data: Live }) => {
  const oneMarathonLive = () => {
    if (data.scheduleId) {
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
          {data?.schedule?.twitch ? (
            <TwitchIframe channel={data.schedule.twitch} />
          ) : (
            <Text>Twitch channel not provided</Text>
          )}
          <OneTicker ticker={data?.ticker?.ticker} />
          <OneSchedule schedule={data?.schedule} />
        </Fragment>
      )
    }
    return null
  }

  return (
    <View style={mainStyle.container}>{!data ? null : oneMarathonLive()}</View>
  )
}

export default OneMarathonLive
