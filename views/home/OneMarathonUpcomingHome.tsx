import React from "react"
import { Text, View, useColorScheme } from "react-native"
import { Marathon } from "@/types/speedhub"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import moment from "moment"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import Button from "@/components/lib/Button"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"

const OneMarathonUpcomingHome = ({ data }: { data: Marathon }) => {
  const theme = useColorScheme() ?? "light"

  const { handleRedirect } = useHandleRouter()

  const oneMarathonUpcoming = () => {
    if (data) {
      const nextEvent = data.ticker.next

      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          <View style={oneRunStyle.cardInfo}>
            <View style={oneRunStyle.cardInfoItems}>
              <Text
                style={{
                  fontSize: Utils.moderateScale(18),
                  fontWeight: "bold",
                  marginBottom: Utils.moderateScale(10),
                  marginLeft: Utils.moderateScale(10),
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
                {nextEvent &&
                  `(${moment(nextEvent.scheduled).format("h:m a")})`}
              </Text>
              <Text
                style={{
                  paddingHorizontal: Utils.moderateScale(14),
                  fontSize: Utils.moderateScale(16),
                  marginBottom: Utils.moderateScale(10),
                }}
              >
                {nextEvent && nextEvent.data.join(" ")}
              </Text>
              <Button
                name="Schedule"
                redirect={() =>
                  handleRedirect(ROUTES.ONE_MARATHON_UPCOMING, {
                    marathonId: data.marathonId,
                  })
                }
              />
            </View>
          </View>
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
