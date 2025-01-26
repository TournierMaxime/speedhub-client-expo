import React from "react"
import { useGlobalSearchParams } from "expo-router"
import { View, Text, StyleSheet, ScrollView, Image } from "react-native"
import Header from "@/components/lib/Header"
import { useQuery } from "@tanstack/react-query"
import { runService } from "@/services/speedrunDotCom"
import Utils from "@/components/lib/Utils"
import { Run } from "../interface"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import Runtime from "@/components/lib/RunTime"
import Splits from "./Splits"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import TwitchIframe from "@/components/lib/TwitchIframe"
import UserName from "@/components/lib/UserName"
import { Category, GamePad, Time } from "@/components/lib/Icons"

const OneRun = () => {
  const { id } = useGlobalSearchParams()

  const userDefaultImg = require("../../../assets/images/default.png")

  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useQuery<Run>({
    queryKey: ["getRun", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await runService.getRun(id)
    },
    enabled: !!id,
  })

  const getPlayers = (data: any) => {
    if (data) {
      const players = data.map((player: any, idx: string) => {
        const { uri } = player?.assets?.image
        return (
          <View style={style.playerContainer}>
            {uri ? (
              <Image source={{ uri }} style={style.img} />
            ) : (
              <Image source={userDefaultImg} style={style.img} />
            )}
            <UserName
              data={player}
              key={idx}
              width={Utils.moderateScale(50)}
              style={{ marginLeft: Utils.moderateScale(10) }}
            />
          </View>
        )
      })

      return players
    }
  }

  const getGame = (data: any) => {
    if (data) {
      return (
        <View style={style.playerContainer}>
          {data?.assets["cover-large"]?.uri ? (
            <Image
              source={{ uri: data?.assets["cover-large"]?.uri }}
              style={style.img}
            />
          ) : null}
          <Text>{data.names.international}</Text>
        </View>
      )
    }
  }

  const oneRun = () => {
    if (data) {
      const videoUri = data.data.videos?.links[0].uri
      let platform

      if (videoUri) {
        platform = videoUri?.includes("youtube")
          ? "youtube"
          : videoUri.includes("twitch")
          ? "twitch"
          : videoUri.includes("youtu.be")
          ? "youtu.be"
          : null
      }

      let videoComponent

      switch (platform) {
        case "youtube":
          const youtubeId = videoUri.substring(32)
          videoComponent = (
            <YoutubeIframe videoId={youtubeId} width={360} height={200} />
          )
          break

        case "twitch":
          const twitchId = videoUri.substring(29)
          videoComponent = (
            <TwitchIframe id={twitchId} width={360} height={200} />
          )
          break

        case "youtu.be":
          const youtuBeId = videoUri.substring(17)
          videoComponent = (
            <YoutubeIframe videoId={youtuBeId} width={360} height={200} />
          )
          break

        default:
          return <Text>Unsupported video platform</Text>
      }

      return (
        <View
          style={[
            style.card,
            theme === "dark"
              ? { backgroundColor: Colors.dark.background }
              : { backgroundColor: Colors.light.background },
          ]}
        >
          {videoComponent}
          <View style={style.cardInfo}>
            <View style={style.cardInfoItems}>
              {getPlayers(data.data.players.data)}
            </View>
            <View style={style.cardInfoItems}>
              {getGame(data.data.game.data)}
            </View>
            <View style={style.cardInfoItems}>
              <Category />
              <Text
                style={[
                  style.text,
                  theme === "dark"
                    ? { color: Colors.dark.text }
                    : { color: Colors.light.text },
                ]}
              >
                {data.data.category.data.name}
              </Text>
            </View>
            <View style={style.cardInfoItems}>
              <Time />
              <Runtime time={data.data.times.primary_t} />
            </View>
          </View>
          <Splits splits={data.data.splits?.uri} />
        </View>
      )
    }
    return null
  }

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <ScrollView style={style.container}>
      <Header backButton={true} title="" />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneRun()}
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
    marginTop: Utils.moderateScale(10),
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
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: Utils.moderateScale(5),
    marginTop: Utils.moderateScale(10),
    padding: Utils.moderateScale(10),
    /*     borderRadius: Utils.moderateScale(5),
    borderWidth: Utils.moderateScale(2),
    borderColor: "grey", */
  },
  cardInfoItems: {
    display: "flex",
    flexDirection: "row",
    marginVertical: Utils.moderateScale(5),
  },
  icons: {
    display: "flex",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: Utils.moderateScale(16),
  },
  img: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
    resizeMode: "contain",
  },
  playerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default OneRun
