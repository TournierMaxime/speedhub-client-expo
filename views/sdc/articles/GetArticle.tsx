import { ArticleList, User } from "@/types/sdc"
import React from "react"
import {
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
} from "react-native"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import oneRedditStyle from "@/styles/views/oneReddit"
import moment from "moment"
import Utils from "@/components/lib/Utils"
import { userService } from "@/services/speedrunDotCom"
import { useQuery } from "@tanstack/react-query"
import { redirectAlertMessage } from "@/components/lib/AlertMessage"

const GetArticle = ({ data }: { data: ArticleList }) => {
  const theme = useColorScheme() ?? "light"

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<User>({
    queryKey: ["getUser", data.userId],
    queryFn: async () => {
      return await userService.getUser(data.userId)
    },
    enabled: !!data.userId,
  })

  const oneArticle = () => {
    if (data) {
      const article = data

      if (!article) return <Text>Article not found</Text>

      const { id, title, slug, publishDate, createDate } = article

      const url = `https://www.speedrun.com/news/${slug}`

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
                source={{ uri: user?.data.assets.image.uri }}
                style={{
                  width: Utils.moderateScale(40),
                  height: Utils.moderateScale(40),
                  borderRadius: Utils.moderateScale(20),
                }}
              />
              <Text
                style={[
                  oneRedditStyle.textAuthor,
                  theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
                ]}
              >
                {user?.data.names.international}
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

            <Text
              style={[
                oneRedditStyle.text,
                theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
              ]}
            >
              {moment
                .unix(publishDate ?? createDate)
                .format("YYYY-MM-DD h:mm a")}
            </Text>

            <TouchableOpacity
              style={oneRedditStyle.btnContainer}
              onPress={async () => {
                await redirectAlertMessage(url)
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

  return <View style={mainStyle.container}>{!data ? null : oneArticle()}</View>
}

export default GetArticle
