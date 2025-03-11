import React from "react"
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native"
import Utils from "@/components/lib/Utils"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import { useColorScheme } from "react-native"
import TwitchIframe from "@/components/lib/TwitchIframe"
import moment from "moment"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import oneRedditStyle from "@/styles/views/oneReddit"
import { Reddit } from "@/types/reddit"
import { getPlatformFromUrl } from "@/components/lib/VideoPlatform"

const OneReddit = ({ data }: { data: Reddit }) => {
  const theme = useColorScheme() ?? "light"

  const userDefaultImg = require("../../assets/images/default.png")

  const oneReddit = () => {
    if (data) {
      const post = data

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

      let videoComponent

      let platform = getPlatformFromUrl(url_overridden_by_dest)

      switch (platform) {
        case "youtube":
          videoComponent = (
            <YoutubeIframe
              videoUri={url_overridden_by_dest}
              platform={platform}
              width={360}
              isReddit={true}
            />
          )
          break

        case "twitch":
          videoComponent = (
            <TwitchIframe
              videoUri={url_overridden_by_dest}
              platform={platform}
              width={360}
              isReddit={true}
            />
          )
          break

        case "youtu.be":
          videoComponent = (
            <YoutubeIframe
              videoUri={url_overridden_by_dest}
              platform={platform}
              width={360}
              isReddit={true}
            />
          )
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

            {videoComponent}

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
              onPress={async () => {
                const canOpenUrl = await Linking.canOpenURL(url)
                let message
                if (canOpenUrl === true) {
                  message = Alert.alert(
                    "Redirection link",
                    "You will be redirect to " +
                      url +
                      " are you sure to continue ?",
                    [
                      {
                        text: "Yes",
                        onPress: () => Linking.openURL(url),
                      },
                      {
                        text: "No",
                      },
                    ]
                  )
                }
              }}
            >
              <Text style={oneRedditStyle.btnLabel}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return null
  }

  return <View style={mainStyle.container}>{!data ? null : oneReddit()}</View>
}

export default OneReddit
