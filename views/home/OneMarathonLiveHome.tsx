import React from "react"
import { Text, View, useColorScheme } from "react-native"
import { Live } from "@/types/speedhub"
import TwitchIframe from "@/components/lib/TwitchIframe"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"

const OneMarathonLiveHome = ({ data }: { data: Live }) => {
  const theme = useColorScheme() ?? "light"

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
                  width={360}
                  height={210}
                />
              ) : null}
              <Text
                style={{
                  fontSize: Utils.moderateScale(18),
                  fontWeight: "bold",
                  marginTop: Utils.moderateScale(20),
                }}
              >
                {data.name}
              </Text>
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

export default OneMarathonLiveHome
