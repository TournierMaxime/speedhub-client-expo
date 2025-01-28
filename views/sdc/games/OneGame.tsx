import Header from "@/components/lib/Header"
import React from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native"
import { useGlobalSearchParams } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import { useQuery } from "@tanstack/react-query"
import { Game } from "../interface"
import { gameService } from "@/services/speedrunDotCom"
import CatchError from "@/components/lib/CatchError"
import Utils from "@/components/lib/Utils"
import IsLoading from "@/components/lib/IsLoading"
import { Collapsible } from "@/components/Collapsible"

const OneGame = () => {
  const { id } = useGlobalSearchParams()

  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error, refetch } = useQuery<Game>({
    queryKey: ["getRun", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await gameService.getGame(id)
    },
    enabled: !!id,
  })

  const getGameImg = (data: Pick<Game["data"], "assets" | "names">) => {
    if (data) {
      const defaultImg = require("../../../assets/images/default.png")
      return (
        <View style={style.cardImage}>
          {data?.assets?.["cover-large"] ? (
            <Image
              source={{
                uri: data?.assets?.["cover-large"]?.uri,
              }}
              style={style.img}
            />
          ) : (
            <Image source={defaultImg} style={style.img} />
          )}
        </View>
      )
    }
    return null
  }

  const getPlatforms = (data: Game["data"]["platforms"]["data"]) => {
    if (data) {
      const platforms = data.map((platform, idx) => {
        return (
          <View style={style.collapsibleContainer} key={idx}>
            <Text style={style.tags}>{platform.name}</Text>
          </View>
        )
      })
      return platforms
    }
    return null
  }

  const getGenres = (data: Game["data"]["genres"]["data"]) => {
    if (data) {
      const genres = data.map((genre, idx) => {
        return (
          <View style={style.collapsibleContainer} key={idx}>
            <Text style={style.tags}>{genre.name}</Text>
          </View>
        )
      })
      return genres
    }
    return null
  }

  const getEngines = (data: Game["data"]["engines"]["data"]) => {
    if (data) {
      const engines = data.map((engine, idx) => {
        return (
          <View style={style.collapsibleContainer} key={idx}>
            <Text style={style.tags}>{engine.name}</Text>
          </View>
        )
      })
      return engines
    }
    return null
  }

  const getDevelopers = (data: Game["data"]["developers"]["data"]) => {
    if (data) {
      const developers = data.map((developer, idx) => {
        return (
          <View style={style.collapsibleContainer} key={idx}>
            <Text style={style.tags}>{developer.name}</Text>
          </View>
        )
      })
      return developers
    }
    return null
  }

  const getPublishers = (data: Game["data"]["publishers"]["data"]) => {
    if (data) {
      const publishers = data.map((publisher, idx) => {
        return (
          <View style={style.collapsibleContainer} key={idx}>
            <Text style={style.tags}>{publisher.name}</Text>
          </View>
        )
      })
      return publishers
    }
    return null
  }

  const getContent = (data: Game["data"]) => {
    if (data) {
      return (
        <View style={style.gameContainer}>
          {getGameImg(data)}
          <View>
            <Text style={[style.text, { fontWeight: "bold" }]}>
              {data.names.international} {`(${data.released})`}
            </Text>
          </View>
        </View>
      )
    }
    return null
  }

  const oneGame = () => {
    if (data) {
      return (
        <ImageBackground
          resizeMode="cover"
          source={{ uri: data.data.assets.background.uri ?? null }}
          style={style.background}
        >
          <View
            style={[
              style.card,
              theme === "dark"
                ? { backgroundColor: Colors.dark.background }
                : { backgroundColor: Colors.light.background },
            ]}
          >
            <View style={style.cardInfo}>{getContent(data.data)}</View>
            <Collapsible title="Platforms">
              <Text style={style.text}>
                {getPlatforms(data.data.platforms.data)}
              </Text>
            </Collapsible>
            <Collapsible title="Genres">
              <Text style={style.text}>{getGenres(data.data.genres.data)}</Text>
            </Collapsible>
            <Collapsible title="Developers">
              <Text style={style.text}>
                {getDevelopers(data.data.developers.data)}
              </Text>
            </Collapsible>
            <Collapsible title="Engines">
              <Text style={style.text}>
                {getEngines(data.data.engines.data)}
              </Text>
            </Collapsible>
            <Collapsible title="Publishers">
              <Text style={style.text}>
                {getPublishers(data.data.publishers.data)}
              </Text>
            </Collapsible>
          </View>
        </ImageBackground>
      )
    }
    return null
  }

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && !isLoading) {
    refetch()
  }

  return (
    <ScrollView>
      <Header backButton={true} />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneGame()}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: Utils.moderateScale(2),
  },
  card: {
    display: "flex",
    width: "95%",
    margin: "auto",
    borderRadius: Utils.moderateScale(5),
    marginVertical: Utils.moderateScale(10),
    borderColor: "grey",
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
    paddingVertical: Utils.moderateScale(10),
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
  icons: {
    display: "flex",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: Utils.moderateScale(16),
    textAlign: "justify",
  },
  img: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
    resizeMode: "contain",
    marginHorizontal: Utils.moderateScale(5),
  },
  cardImage: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
  gameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //flexWrap: "wrap",
  },
  collapsibleContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tags: {
    backgroundColor: "grey",
    padding: Utils.moderateScale(5),
    margin: Utils.moderateScale(5),
    color: "#fff",
    borderRadius: Utils.moderateScale(5),
  },
  background: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
})

export default OneGame
