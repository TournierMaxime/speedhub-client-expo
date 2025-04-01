import React from "react"
import { Text, View, useColorScheme } from "react-native"
import { Marathon } from "@/types/speedhub"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import cardStyle from "@/styles/components/card"
import Button from "@/components/lib/Button"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import oneRunStyle from "@/styles/views/oneRun"
import moment from "moment"

const OneMarathonUpcoming = ({ data }: { data: Marathon }) => {
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
            <View
              style={[
                oneRunStyle.cardInfoItems,
                {
                  width: Utils.moderateScale(320),
                },
              ]}
            >
              <Text
                style={{
                  fontSize: Utils.moderateScale(18),
                  fontWeight: "bold",
                  marginTop: Utils.moderateScale(20),
                  marginBottom: Utils.moderateScale(10),
                }}
              >
                {data.name}
              </Text>

              <Text
                style={{
                  fontSize: Utils.moderateScale(18),
                  marginVertical: Utils.moderateScale(10),
                }}
              >
                {moment(data.datetime).format("MMMM Do h:mm a")}
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

export default OneMarathonUpcoming
