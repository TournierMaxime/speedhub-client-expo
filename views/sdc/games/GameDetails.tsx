import React, { Fragment } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  StyleSheet,
} from "react-native"
import { Game } from "../interface"
import Utils from "@/components/lib/Utils"
import { Collapsible } from "@/components/Collapsible"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

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

const GameDetails = ({ data }: { data: Game["data"] }) => {
  const theme = useColorScheme() ?? "light"

  return (
    <ScrollView
      style={[
        style.contentContainer,
        theme === "dark"
          ? { backgroundColor: Colors.dark.background }
          : { backgroundColor: Colors.light.background },
      ]}
    >
      <View style={style.gameContainer}>
        <Image
          source={{
            uri: data.assets["cover-large"]?.uri ?? undefined,
          }}
          style={style.img}
        />

        <View style={style.infoContainer}>
          <Text style={[style.text, { fontWeight: "bold" }]}>
            {data.names.international} ({data.released})
          </Text>

          {data.discord && (
            <TouchableOpacity onPress={() => Linking.openURL(data.discord)}>
              <Text style={[style.text, style.discordButton]}>
                Discord Community
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {data.platforms.data.length > 0 ? (
        <Collapsible title="Platforms">
          <Platforms platforms={data.platforms.data} />
        </Collapsible>
      ) : null}

      {data.genres.data.length > 0 ? (
        <Collapsible title="Genres">
          <Genres genres={data.genres.data} />
        </Collapsible>
      ) : null}

      {data.developers.data.length > 0 ? (
        <Collapsible title="Developers">
          <Developers developers={data.developers.data} />
        </Collapsible>
      ) : null}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  contentContainer: {
    display: "flex",
    padding: Utils.moderateScale(10),
    width: "95%",
    margin: "auto",
  },
  gameContainer: {
    flexDirection: "row",
    marginBottom: Utils.moderateScale(10),
  },
  infoContainer: {
    marginLeft: Utils.moderateScale(10),
  },
  img: {
    width: Utils.moderateScale(160),
    height: Utils.moderateScale(160),
    resizeMode: "contain",
  },
  text: {
    fontSize: Utils.moderateScale(16),
  },
  discordButton: {
    color: "#7289da",
    fontWeight: "bold",
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
