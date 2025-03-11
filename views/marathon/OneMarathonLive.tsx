import React from "react"
import { Text, View, useColorScheme } from "react-native"
import { Live } from "@/types/speedhub"
import TwitchIframe from "@/components/lib/TwitchIframe"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"
import Button from "@/components/lib/Button"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"

const OneMarathonLive = ({ data }: { data: Live }) => {
  const theme = useColorScheme() ?? "light"
  const { handleRedirect } = useHandleRouter()

  const oneMarathonLive = () => {
    if (data.scheduleId && data?.schedule?.twitch) {
      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          <View style={oneRunStyle.cardInfo}>
            <View style={oneRunStyle.cardInfoItems}>
              {data?.schedule?.twitch ? (
                <TwitchIframe
                  channel={data.schedule.twitch}
                  platform="twitch"
                  width={360}
                  height={210}
                />
              ) : null}
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
              <Button
                name="Schedule"
                redirect={() =>
                  handleRedirect(ROUTES.ONE_MARATHON_LIVE, {
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
    <View style={mainStyle.container}>{!data ? null : oneMarathonLive()}</View>
  )
}

export default OneMarathonLive
