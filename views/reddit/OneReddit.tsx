import React from "react"
import { useGlobalSearchParams } from "expo-router"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native"
import Header from "@/components/lib/Header"
import { useQuery } from "@tanstack/react-query"
import { redditService } from "@/services/reddit"
import Utils from "@/components/lib/Utils"
import { Reddit } from "./interface"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import TwitchIframe from "@/components/lib/TwitchIframe"
import moment from "moment"

const OneReddit = () => {
  const { permalink } = useGlobalSearchParams()
  const theme = useColorScheme() ?? "light"

  const userDefaultImg = require("../../assets/images/default.png")

  const { data, isLoading, error } = useQuery<Reddit[]>({
    queryKey: ["getReddit", permalink],
    queryFn: async () => {
      if (!permalink) throw new Error("Missing permalink")
      return await redditService.getOneNews(permalink)
    },
    enabled: !!permalink,
  })

  const oneReddit = () => {
    if (data && data.length > 0) {
      const post = data[0]?.data?.children?.[0]?.data

      if (!post) return <Text>Post not found</Text>

      const {
        title,
        author,
        created,
        url_overridden_by_dest,
        link_flair_text,
        selftext,
        url,
      } = post

      let platform
      if (url_overridden_by_dest) {
        platform = url_overridden_by_dest.includes("youtube")
          ? "youtube"
          : url_overridden_by_dest.includes("twitch")
          ? "twitch"
          : url_overridden_by_dest.includes("youtu.be")
          ? "youtu.be"
          : null
      }

      let videoComponent
      switch (platform) {
        case "youtube":
          const youtubeId = url_overridden_by_dest
            ?.split("v=")[1]
            ?.split("&")[0]
          videoComponent = <YoutubeIframe videoId={youtubeId} width={360} />
          break

        case "twitch":
          const twitchId = url_overridden_by_dest?.split("/").pop()
          videoComponent = <TwitchIframe id={twitchId} width={360} />
          break

        case "youtu.be":
          const youtuBeId = url_overridden_by_dest?.split("/").pop()
          videoComponent = <YoutubeIframe videoId={youtuBeId} width={360} />
          break

        default:
          videoComponent = null
          break
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
            <View style={style.author}>
              <Image
                source={userDefaultImg}
                style={{
                  width: Utils.moderateScale(40),
                  height: Utils.moderateScale(40),
                }}
              />
              <Text
                style={[
                  style.textAuthor,
                  theme === "dark"
                    ? { color: Colors.dark.text }
                    : { color: Colors.light.text },
                ]}
              >
                {author}
              </Text>
            </View>
            <Text
              style={[
                style.textTitle,
                theme === "dark"
                  ? { color: Colors.dark.text }
                  : { color: Colors.light.text },
              ]}
            >
              {title}
            </Text>

            {selftext ? (
              <Text
                style={[
                  style.text,
                  theme === "dark"
                    ? { color: Colors.dark.text }
                    : { color: Colors.light.text },
                ]}
              >
                {selftext}
              </Text>
            ) : null}

            <Text
              style={[
                style.textDate,
                theme === "dark"
                  ? { color: Colors.dark.text }
                  : { color: Colors.light.text },
              ]}
            >
              {moment.unix(created).format("YYYY-MM-DD h:mm a")}
            </Text>
            <TouchableOpacity
              style={style.btnContainer}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={style.btnLabel}>Watch on Reddit</Text>
            </TouchableOpacity>
          </View>
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
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneReddit()}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
  },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  },
  cardInfoItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Utils.moderateScale(5),
  },
  icons: {
    display: "flex",
    justifyContent: "flex-start",
  },
  data: {
    flex: 1,
    alignItems: "flex-end",
  },
  text: {
    fontSize: Utils.moderateScale(18),
    textAlign: "justify",
  },
  textTitle: {
    fontSize: Utils.moderateScale(18),
    marginVertical: Utils.moderateScale(10),
  },
  textDate: {
    fontSize: Utils.moderateScale(18),
    marginVertical: Utils.moderateScale(10),
  },
  textAuthor: {
    fontSize: Utils.moderateScale(18),
    marginLeft: Utils.moderateScale(10),
  },
  btnContainer: {
    display: "flex",
    borderRadius: Utils.moderateScale(5),
    width: "90%",
    margin: "auto",
    alignItems: "center",
    marginVertical: Utils.moderateScale(10),
    backgroundColor: "#d93a00",
  },
  btnLabel: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
    marginVertical: Utils.moderateScale(10),
    color: "white",
  },
})

export default OneReddit
