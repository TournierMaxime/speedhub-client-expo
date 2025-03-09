import React from "react"
import { Text, View, useColorScheme } from "react-native"
import { Upcoming } from "@/types/speedhub"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import cardStyle from "@/styles/components/card"
import Button from "@/components/lib/Button"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import oneRunStyle from "@/styles/views/oneRun"
import moment from "moment"

const OneMarathonUpcoming = ({ data }: { data: Upcoming }) => {
  const theme = useColorScheme() ?? "light"
  const { handleRedirect } = useHandleRouter()

  const oneMarathonUpcoming = () => {
    if (data) {
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
                  marginLeft: Utils.moderateScale(10),
                  marginVertical: Utils.moderateScale(10),
                }}
              >
                {data.name}
              </Text>

              <Text
                style={{
                  fontSize: Utils.moderateScale(18),
                  marginLeft: Utils.moderateScale(10),
                  marginVertical: Utils.moderateScale(10),
                }}
              >
                {moment(data.datetime).format("YYYY-MM-DD h:mm a")}
              </Text>
              <Button
                name="Schedule"
                redirect={() =>
                  handleRedirect(ROUTES.ONE_MARATHON_UPCOMING, {
                    horaroId: data.horaroId,
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

export default OneMarathonUpcoming
