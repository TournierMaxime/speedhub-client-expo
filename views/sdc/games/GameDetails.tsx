import React, { Fragment } from "react"
import { View, Text, ScrollView } from "react-native"
import { Game } from "@/types/sdc"
import { useColorScheme } from "react-native"
import { oneGameDetailsStyle } from "@/styles/views/oneGame"
import mainStyle from "@/styles/base/main"

const GameDetails = ({ data }: { data: Game["data"] }) => {
  const theme = useColorScheme() ?? "light"

  const infoData = [
    data?.["release-date"]
      ? { title: "Release Date", content: data?.["release-date"] }
      : null,
    data?.genres?.data?.length
      ? { title: "Genres", content: data.genres.data }
      : null,
    data?.platforms?.data?.length
      ? { title: "Platforms", content: data.platforms.data }
      : null,
    data?.publishers?.data?.length
      ? { title: "Publishers", content: data.publishers.data }
      : null,
    data?.developers?.data?.length
      ? { title: "Developers", content: data.developers.data }
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
