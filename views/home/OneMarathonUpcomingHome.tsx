import React from "react"
import { Text, View, useColorScheme } from "react-native"
import { Upcoming } from "@/types/speedhub"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import moment from "moment"

const OneMarathonUpcomingHome = ({ data }: { data: Upcoming }) => {
  const theme = useColorScheme() ?? "light"

  const oneMarathonUpcoming = () => {
    if (data) {
      const nextEvent = data.ticker?.ticker?.next

      return (
        <View
          style={[
            {
              display: "flex",
              flexDirection: "column",
              width: Utils.moderateScale(360),
              height: Utils.moderateScale(150),
              marginHorizontal: Utils.moderateScale(10),
              alignSelf: "auto",
              marginVertical: Utils.moderateScale(10),
              borderRadius: Utils.moderateScale(5),
              shadowOffset: {
                width: Utils.moderateScale(0),
                height: Utils.moderateScale(2),
              },
              shadowOpacity: Utils.moderateScale(0.25),
              shadowRadius: Utils.moderateScale(3.5),
              elevation: Utils.moderateScale(5),
              paddingVertical: Utils.moderateScale(10),
            },
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          <Text
            style={{
              fontSize: Utils.moderateScale(18),
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: Utils.moderateScale(10),
            }}
          >
            {data.name}
          </Text>
          <Text
            style={{
              paddingHorizontal: Utils.moderateScale(14),
              fontSize: Utils.moderateScale(16),
              marginBottom: Utils.moderateScale(10),
            }}
          >
            Starting {moment(data.datetime).fromNow()}{" "}
            {nextEvent && `(${moment(nextEvent.scheduled).format("h:m a")})`}
          </Text>
          <Text
            style={{
              paddingHorizontal: Utils.moderateScale(14),
              fontSize: Utils.moderateScale(16),
            }}
          >
            {nextEvent && nextEvent.data.join(" ")}
          </Text>
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

export default OneMarathonUpcomingHome
