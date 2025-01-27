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
import { Comment } from "@/components/lib/Icons"

const OneRun = () => {
  const { id } = useGlobalSearchParams()

  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error, refetch } = useQuery<Run>({
    queryKey: ["getRun", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await runService.getRun(id)
    },
    enabled: !!id,
  })

  const getPlayers = (data: any) => {
    if (data) {
      const players = data?.map((player: any, idx: number) => {
        return <UserName data={player} key={idx} />
      })
      return players
    }
    return null
  }

  const getCategoryAndTime = (data: any) => {
    if (data) {
      return (
        <Text style={style.text}>
          {data?.category?.data?.name} in{" "}
          <Runtime time={data?.times?.primary_t} />
        </Text>
      )
    }
    return null
  }

  const getGameImg = (data: any) => {
    if (data) {
      const image = data?.assets["cover-large"]?.uri ? (
        <Image
          source={{ uri: data?.assets["cover-large"]?.uri }}
          style={style.img}
        />
      ) : null
      return image
    }

    return null
  }

  const getComment = (data: any) => {
    if (data) {
      const comment = data
      return (
        <View style={style.commentContainer}>
          <Comment />
          <Text style={[style.text, { marginLeft: Utils.moderateScale(10) }]}>
            {comment}
          </Text>
        </View>
      )
    }

    return null
  }

  const getContent = (data: any) => {
    if (data) {
      return (
        <View style={style.playerContainer}>
          {getGameImg(data?.game?.data)}
          <View>
            <Text style={style.text}>{data.game.data.names.international}</Text>
            {getPlayers(data?.players?.data)}
            {getCategoryAndTime(data)}
          </View>
        </View>
      )
    }
    return null
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
            {data?.data ? (
              <View style={style.cardInfoItems}>{getContent(data?.data)}</View>
            ) : null}

            {data?.data?.comment ? (
              <View style={style.cardInfoItems}>
                {getComment(data?.data?.comment)}
              </View>
            ) : null}
          </View>
          <Splits splits={data?.data?.splits?.uri} />
        </View>
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
    <ScrollView style={style.container}>
      <Header backButton={true} />
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
  cardInfo: {
    display: "flex",
    flexDirection: "column",
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
    width: Utils.moderateScale(60),
    height: Utils.moderateScale(60),
    resizeMode: "contain",
    marginHorizontal: Utils.moderateScale(5),
  },
  playerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    padding: Utils.moderateScale(10),
    width: "90%",
    margin: "auto",
  },
})

export default OneRun
