import React, { Fragment } from "react"
import { View, Text, ScrollView } from "react-native"
import { GetGameData } from "@/types/sdc"
import { useColorScheme } from "react-native"
import { oneGameDetailsStyle } from "@/styles/views/oneGame"
import mainStyle from "@/styles/base/main"
import moment from "moment"
import Markdown from "react-native-markdown-display"

const GameDetails = ({ data }: { data: GetGameData | undefined }) => {
  const theme = useColorScheme() ?? "light"

  if (!data) return

  const infoData = [
    data.game.rules
      ? { title: "Rules", content: <Markdown>{data.game.rules}</Markdown> }
      : null,
    data.game.releaseDate
      ? {
          title: "Release Date",
          content: moment.unix(data.game.releaseDate).format("YYYY-MM-DD"),
        }
      : null,
    data.platforms.length
      ? { title: "Platforms", content: data.platforms }
      : null,
  ].filter(Boolean)

  return (
    <ScrollView
      style={[
        oneGameDetailsStyle.contentContainer,
        theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
      ]}
    >
      <View style={oneGameDetailsStyle.infoContainer}>
        <View style={oneGameDetailsStyle.infoContent}>
          {infoData.map((item, idx) => {
            if (!item) return null
            return (
              <Fragment key={idx}>
                <View style={oneGameDetailsStyle.headingContainer}>
                  <View style={oneGameDetailsStyle.heading}>
                    <Text style={oneGameDetailsStyle.subTitle}>
                      {item?.title}
                    </Text>
                  </View>
                </View>
                <View style={oneGameDetailsStyle.headingContentContainer}>
                  {Array.isArray(item?.content) ? (
                    item.content.map((elem, idx) => (
                      <Text key={idx} style={oneGameDetailsStyle.tags}>
                        {elem.name}
                      </Text>
                    ))
                  ) : (
                    <Text style={oneGameDetailsStyle.tags}>
                      {item?.content}
                    </Text>
                  )}
                </View>
              </Fragment>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

export default GameDetails
