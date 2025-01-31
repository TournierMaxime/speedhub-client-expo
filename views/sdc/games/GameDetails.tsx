import React, { Fragment } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native"
import { Game } from "../interface"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import BottomModal from "@/components/lib/Modal"
import { Discord } from "@/components/lib/Icons"
import SDCSVG from "@/assets/images/SDCSVG"
import { oneGameDetailsStyle } from "@/styles/views/oneGame"

const Platforms = ({
  platforms,
}: {
  platforms: Game["data"]["platforms"]["data"]
}) => {
  return (
    <Fragment>
      {platforms.map((platform, idx) => (
        <Text key={idx} style={oneGameDetailsStyle.tags}>
          {platform.name}
        </Text>
      ))}
    </Fragment>
  )
}

const Genres = ({ genres }: { genres: Game["data"]["genres"]["data"] }) => {
  return (
    <Fragment>
      {genres.map((genre, idx) => (
        <Text key={idx} style={oneGameDetailsStyle.tags}>
          {genre.name}
        </Text>
      ))}
    </Fragment>
  )
}

const Developers = ({
  developers,
}: {
  developers: Game["data"]["developers"]["data"]
}) => {
  return (
    <Fragment>
      {developers.map((developer, idx) => (
        <Text key={idx} style={oneGameDetailsStyle.tags}>
          {developer.name}
        </Text>
      ))}
    </Fragment>
  )
}

const Publishers = ({
  publishers,
}: {
  publishers: Game["data"]["publishers"]["data"]
}) => {
  return (
    <Fragment>
      {publishers.map((publisher, idx) => (
        <Text key={idx} style={oneGameDetailsStyle.tags}>
          {publisher.name}
        </Text>
      ))}
    </Fragment>
  )
}

const GameDetails = ({ data }: { data: Game["data"] }) => {
  const theme = useColorScheme() ?? "light"

  return (
    <View
      style={[
        oneGameDetailsStyle.contentContainer,
        theme === "dark"
          ? { backgroundColor: Colors.dark.background }
          : { backgroundColor: Colors.light.background },
      ]}
    >
      {data?.assets?.background?.uri ? (
        <ImageBackground
          source={{
            uri: data?.assets?.background?.uri ?? null,
          }}
          style={oneGameDetailsStyle.backgroungImg}
          resizeMode="cover"
          imageStyle={{ opacity: 0.2 }}
        >
          <View style={oneGameDetailsStyle.gameContainer}>
            {data?.assets["cover-large"]?.uri ? (
              <Image
                source={{
                  uri: data?.assets["cover-large"]?.uri,
                }}
                style={oneGameDetailsStyle.img}
              />
            ) : null}

            <View style={oneGameDetailsStyle.infoContainer}>
              <Text
                style={[
                  oneGameDetailsStyle.text,
                  { fontWeight: "bold", color: "#fff" },
                ]}
              >
                {data?.names?.international}
              </Text>
              <Text style={[oneGameDetailsStyle.text, { color: "#fff" }]}>
                {data["release-date"]}
              </Text>

              <View style={oneGameDetailsStyle.externalLinkContainer}>
                {data?.weblink && (
                  <TouchableOpacity
                    style={oneGameDetailsStyle.sdcContainer}
                    onPress={() => Linking.openURL(data?.weblink)}
                  >
                    <SDCSVG />
                  </TouchableOpacity>
                )}
                {data?.discord && (
                  <TouchableOpacity
                    style={oneGameDetailsStyle.discordContainer}
                    onPress={() => Linking.openURL(data?.discord)}
                  >
                    <Discord />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View style={oneGameDetailsStyle.collapsiblesContainer}>
            {data?.platforms?.data?.length > 0 ? (
              <BottomModal title="Platforms">
                <Platforms platforms={data?.platforms?.data} />
              </BottomModal>
            ) : null}

            {data?.genres?.data?.length > 0 ? (
              <BottomModal title="Genres">
                <Genres genres={data?.genres?.data} />
              </BottomModal>
            ) : null}

            {data?.publishers?.data?.length > 0 ? (
              <BottomModal title="Publishers">
                <Publishers publishers={data?.publishers?.data} />
              </BottomModal>
            ) : null}

            {data?.developers?.data?.length > 0 ? (
              <BottomModal title="Developers">
                <Developers developers={data?.developers?.data} />
              </BottomModal>
            ) : null}
          </View>
        </ImageBackground>
      ) : null}
    </View>
  )
}

export default GameDetails
