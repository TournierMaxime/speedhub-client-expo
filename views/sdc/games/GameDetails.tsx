import React, { Fragment } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ImageBackground,
} from "react-native"
import { Game } from "../interface"
import Utils from "@/components/lib/Utils"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import BottomModal from "@/components/lib/Modal"
import { Discord } from "@/components/lib/Icons"
import SDCSVG from "@/assets/images/SDCSVG"

const Platforms = ({
  platforms,
}: {
  platforms: Game["data"]["platforms"]["data"]
}) => {
  return (
    <Fragment>
      {platforms.map((platform, idx) => (
        <Text key={idx} style={style.tags}>
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
        <Text key={idx} style={style.tags}>
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
        <Text key={idx} style={style.tags}>
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
        <Text key={idx} style={style.tags}>
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
        style.contentContainer,
        theme === "dark"
          ? { backgroundColor: Colors.dark.background }
          : { backgroundColor: Colors.light.background },
      ]}
    >
      <ImageBackground
        source={{
          uri: data.assets?.background?.uri ?? null,
        }}
        style={style.backgroungImg}
        resizeMode="cover"
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={style.gameContainer}>
          <Image
            source={{
              uri: data.assets["cover-large"]?.uri ?? undefined,
            }}
            style={style.img}
          />

          <View style={style.infoContainer}>
            <Text style={[style.text, { fontWeight: "bold", color: "#fff" }]}>
              {data.names.international}
            </Text>
            <Text style={[style.text, { fontWeight: "bold", color: "#fff" }]}>
              {data.id}
            </Text>
            <Text style={[style.text, { color: "#fff" }]}>
              {data["release-date"]}
            </Text>

            <View style={style.externalLinkContainer}>
              {data.weblink && (
                <TouchableOpacity
                  style={style.sdcContainer}
                  onPress={() => Linking.openURL(data.weblink)}
                >
                  <SDCSVG />
                </TouchableOpacity>
              )}
              {data.discord && (
                <TouchableOpacity
                  style={style.discordContainer}
                  onPress={() => Linking.openURL(data.discord)}
                >
                  <Discord />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={style.collapsiblesContainer}>
          {data.platforms.data.length > 0 ? (
            <BottomModal title="Platforms">
              <Platforms platforms={data.platforms.data} />
            </BottomModal>
          ) : null}

          {data.genres.data.length > 0 ? (
            <BottomModal title="Genres">
              <Genres genres={data.genres.data} />
            </BottomModal>
          ) : null}

          {data.publishers.data.length > 0 ? (
            <BottomModal title="Publishers">
              <Publishers publishers={data.publishers.data} />
            </BottomModal>
          ) : null}

          {data.developers.data.length > 0 ? (
            <BottomModal title="Developers">
              <Developers developers={data.developers.data} />
            </BottomModal>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  )
}

const style = StyleSheet.create({
  contentContainer: {
    display: "flex",
    width: "100%",
    marginHorizontal: "auto",
  },
  gameContainer: {
    flexDirection: "row",
    marginBottom: Utils.moderateScale(10),
    width: "100%",
    position: "absolute",
    top: Utils.moderateScale(30),
  },
  collapsiblesContainer: {
    position: "absolute",
    width: "100%",
    padding: Utils.moderateScale(10),
    top: Utils.moderateScale(250),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoContainer: {
    //marginLeft: Utils.moderateScale(10),
  },
  img: {
    width: Utils.moderateScale(200),
    height: Utils.moderateScale(200),
    resizeMode: "contain",
  },
  backgroungImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  text: {
    fontSize: Utils.moderateScale(20),
  },
  externalLinkContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  sdcContainer: {
    backgroundColor: "#199c77",
    borderRadius: Utils.moderateScale(5),
    display: "flex",
    alignItems: "center",
    padding: Utils.moderateScale(5),
    marginBottom: Utils.moderateScale(5),
    width: Utils.moderateScale(80),
  },
  sdcButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: Utils.moderateScale(10),
    fontSize: Utils.moderateScale(16),
  },
  discordContainer: {
    backgroundColor: "#7289da",
    borderRadius: Utils.moderateScale(5),
    display: "flex",
    alignItems: "center",
    padding: Utils.moderateScale(5),
    width: Utils.moderateScale(80),
  },
  discordButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: Utils.moderateScale(10),
    fontSize: Utils.moderateScale(16),
  },
  tabContent: {
    flex: 1,
    padding: Utils.moderateScale(10),
    marginVertical: Utils.moderateScale(10),
  },
  tags: {
    backgroundColor: "#E0E0E0",
    padding: Utils.moderateScale(5),
    margin: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    fontSize: Utils.moderateScale(16),
  },
  cardInfoItems: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    backgroundColor: "white", // adapt theme
    marginHorizontal: Utils.moderateScale(10),
    marginVertical: Utils.moderateScale(10),
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(5),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
  },
})

export default GameDetails
