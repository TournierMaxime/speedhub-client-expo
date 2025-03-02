import React from "react"
import { Text, View, useColorScheme } from "react-native"
import { Upcoming } from "@/types/speedhub"
import OneSchedule from "./OneSchedule"
import OneTicker from "./OneTicker"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import cardStyle from "@/styles/components/card"

const OneMarathonUpcoming = ({ data }: { data: Upcoming }) => {
  const theme = useColorScheme() ?? "light"

  const oneMarathonUpcoming = () => {
    if (data) {
      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          <Text
            style={{
              fontSize: Utils.moderateScale(18),
              fontWeight: "bold",
              marginLeft: Utils.moderateScale(10),
              marginVertical: Utils.moderateScale(10),
            }}
          >
            {data.name}
          </Text>
          <OneTicker ticker={data?.ticker?.ticker} />
          <OneSchedule schedule={data?.schedule} />
        </View>
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
