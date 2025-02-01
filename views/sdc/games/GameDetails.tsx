import React, { Fragment } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ImageBackground,
  FlatList,
} from "react-native"
import { Game } from "@/types/sdc"
import { useColorScheme } from "react-native"
import { Colors, discordColor, sdcColor } from "@/constants/Colors"
import BottomModal from "@/components/lib/Modal"
import { Discord } from "@/components/lib/Icons"
import SDCSVG from "@/assets/images/SDCSVG"
import { oneGameDetailsStyle } from "@/styles/views/oneGame"
import mainStyle from "@/styles/base/main"

const GameDetails = ({ data }: { data: Game["data"] }) => {
  const theme = useColorScheme() ?? "light"

  const infoData = [
    data?.["release-date"]
      ? { title: "Release Date", content: data?.["release-date"] }
      : null,
    data?.platforms?.data?.length
      ? { title: "Platforms", content: data.platforms.data }
      : null,
    data?.genres?.data?.length
      ? { title: "Genres", content: data.genres.data }
      : null,
    data?.publishers?.data?.length
      ? { title: "Publishers", content: data.publishers.data }
      : null,
    data?.developers?.data?.length
      ? { title: "Developers", content: data.developers.data }
      : null,
  ].filter(Boolean)

  return (
    <View
      style={[
        oneGameDetailsStyle.contentContainer,
        theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
      ]}
    >
      <View style={oneGameDetailsStyle.gameContainer}>
        <ImageBackground
          source={{
            uri: data?.assets?.background?.uri ?? null,
          }}
          style={oneGameDetailsStyle.backgroungImg}
          resizeMode="cover"
          imageStyle={{ opacity: 0.2 }}
        >
          <Image
            source={{
              uri: data?.assets["cover-large"]?.uri ?? null,
            }}
            style={oneGameDetailsStyle.img}
          />
          <Text style={oneGameDetailsStyle.gameTitle}>
            {data?.names?.international}
          </Text>
        </ImageBackground>
      </View>

      <View style={oneGameDetailsStyle.infoContainer}>
        <Text style={oneGameDetailsStyle.subTitle}>Informations</Text>
        <View style={oneGameDetailsStyle.infoContent}>
          <FlatList
            data={infoData}
            horizontal={true}
            keyExtractor={(item) => item?.title ?? ""}
            renderItem={({ item }) => (
              <BottomModal title={item?.title ?? ""}>
                {Array.isArray(item?.content) ? (
                  item.content.map((elem, idx) => (
                    <Text key={idx} style={oneGameDetailsStyle.tags}>
                      {elem.name}
                    </Text>
                  ))
                ) : (
                  <Text style={oneGameDetailsStyle.tags}>{item?.content}</Text>
                )}
              </BottomModal>
            )}
            showsHorizontalScrollIndicator={true}
          />
        </View>
      </View>

      <View style={oneGameDetailsStyle.infoContainer}>
        <Text style={oneGameDetailsStyle.subTitle}>External links</Text>
        <View style={oneGameDetailsStyle.infoContent}>
          {data?.weblink && (
            <TouchableOpacity
              style={[
                oneGameDetailsStyle.buttonContainer,
                { backgroundColor: sdcColor },
              ]}
              onPress={() => Linking.openURL(data?.weblink)}
            >
              <SDCSVG />
            </TouchableOpacity>
          )}
          {data?.discord && (
            <TouchableOpacity
              style={[
                oneGameDetailsStyle.buttonContainer,
                { backgroundColor: discordColor },
              ]}
              onPress={() => Linking.openURL(data?.discord)}
            >
              <Discord />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default GameDetails
