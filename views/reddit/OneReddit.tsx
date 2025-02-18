import React from "react"
import { useGlobalSearchParams } from "expo-router"
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native"
import Header from "@/components/lib/Header"
import { useQuery } from "@tanstack/react-query"
import { redditService } from "@/services/reddit"
import Utils from "@/components/lib/Utils"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import { useColorScheme } from "react-native"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import TwitchIframe from "@/components/lib/TwitchIframe"
import moment from "moment"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import oneRedditStyle from "@/styles/views/oneReddit"
import { Reddit } from "@/types/reddit"
import ROUTES from "@/components/routes"

const OneReddit = () => {
  const { permalink } = useGlobalSearchParams()
  const theme = useColorScheme() ?? "light"

  const userDefaultImg = require("../../assets/images/default.png")

  const { data, isLoading, error, refetch } = useQuery<Reddit[]>({
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
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          {videoComponent}
          <View style={oneRedditStyle.cardInfo}>
            <View style={oneRedditStyle.author}>
              <Image
                source={userDefaultImg}
                style={{
                  width: Utils.moderateScale(40),
                  height: Utils.moderateScale(40),
                }}
              />
              <Text
                style={[
                  oneRedditStyle.textAuthor,
                  theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
                ]}
              >
                {author}
              </Text>
            </View>
            <Text
              style={[
                oneRedditStyle.text,
                theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
              ]}
            >
              {title}
            </Text>

            {selftext ? (
              <Text
                style={[
                  oneRedditStyle.text,
                  theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
                ]}
              >
                {selftext}
              </Text>
            ) : null}

            <Text
              style={[
                oneRedditStyle.text,
                theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
              ]}
            >
              {moment.unix(created).format("YYYY-MM-DD h:mm a")}
            </Text>
            <TouchableOpacity
              style={oneRedditStyle.btnContainer}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={oneRedditStyle.btnLabel}>Watch on Reddit</Text>
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

  if (data === undefined && !isLoading) {
    refetch()
  }

  return (
    <ScrollView style={mainStyle.container}>
      <Header backButton={true} lastPath={{ pathname: ROUTES.REDDITS }} />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneReddit()}
    </ScrollView>
  )
}

export default OneReddit
