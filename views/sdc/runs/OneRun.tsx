import React from "react"
import { View, Text } from "react-native"
import YoutubeIframe from "@/components/lib/YouTubeIframe"
import Runtime from "@/components/lib/RunTime"
import { useColorScheme } from "react-native"
import TwitchIframe from "@/components/lib/TwitchIframe"
import UserName from "@/components/lib/UserName"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import oneRunStyle from "@/styles/views/oneRun"
import Utils from "@/components/lib/Utils"
import Button from "@/components/lib/Button"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import {
  GetLatestLeaderboardRuns,
  GetLatestLeaderboardPlayers,
  GetLatestLeaderboardGames,
  GetLatestLeaderboardCategories,
} from "@/types/sdc"
import { getPlatformFromUrl } from "@/components/lib/VideoPlatform"

const OneRun = ({
  data,
  categories,
  games,
  players,
}: {
  data: GetLatestLeaderboardRuns
  categories: GetLatestLeaderboardCategories[]
  games: GetLatestLeaderboardGames[]
  players: GetLatestLeaderboardPlayers[]
}) => {
  const theme = useColorScheme() ?? "light"

  const { handleRedirect } = useHandleRouter()

  const getPlayers = (players: GetLatestLeaderboardPlayers[]) => {
    const playersIds = data.playerIds.find((p) => p)
    const player = players.find((player) => player.id === playersIds)
    return player ? getPlayer(player) : null
  }

  const getPlayer = (player: GetLatestLeaderboardPlayers) => {
    return <UserName data={player.name} />
  }

  const getTime = () => {
    return <Runtime time={data.time} />
  }

  const getGames = (games: GetLatestLeaderboardGames[]) => {
    const game = games.find((game) => game.id === data.gameId)
    return game ? getGame(game) : null
  }

  const getGame = (game: GetLatestLeaderboardGames) => {
    return <Text style={cardStyle.text}>{game.name}</Text>
  }

  const getCategories = (categories: GetLatestLeaderboardCategories[]) => {
    const category = categories.find(
      (category) => category.id === data.categoryId
    )
    return category ? getCategory(category) : null
  }

  const getCategory = (category: GetLatestLeaderboardCategories) => {
    return (
      <Text style={cardStyle.text}>
        {category.name} in {getTime()}
      </Text>
    )
  }

  const getContent = () => {
    if (data) {
      return (
        <View style={oneRunStyle.playerContainer}>
          <View>
            {getPlayers(players)}
            {getGames(games)}
            {getCategories(categories)}
            {getTime()}
          </View>
        </View>
      )
    }
    return null
  }

  const getOneRun = () => {
    if (data) {
      const videoUri = data.video

      let videoComponent

      let platform = getPlatformFromUrl(videoUri)

      switch (platform) {
        case "youtube":
          videoComponent = (
            <YoutubeIframe
              videoUri={videoUri}
              platform={platform}
              width={380}
              height={220}
            />
          )
          break

        case "twitch":
          videoComponent = (
            <TwitchIframe
              videoUri={videoUri}
              platform={platform}
              width={380}
              height={220}
            />
          )
          break

        case "youtu.be":
          videoComponent = (
            <YoutubeIframe
              videoUri={videoUri}
              platform={platform}
              width={380}
              height={220}
            />
          )
          break

        default:
          return <Text>Unsupported video platform</Text>
      }

      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          <View style={oneRunStyle.cardInfo}>
            {data ? (
              <View style={oneRunStyle.cardInfoItems}>
                {videoComponent}
                {getContent()}
                <Button
                  name="More"
                  redirect={() =>
                    handleRedirect(ROUTES.ONE_RUN, { id: data.id })
                  }
                  style={{ marginTop: Utils.moderateScale(10) }}
                />
              </View>
            ) : null}
          </View>
        </View>
      )
    }
    return null
  }

  return <View style={mainStyle.container}>{!data ? null : getOneRun()}</View>
}

export default OneRun
