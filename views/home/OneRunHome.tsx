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
import {
  GetLatestLeaderboardCategories,
  GetLatestLeaderboardGames,
  GetLatestLeaderboardPlayers,
  GetLatestLeaderboardRuns,
} from "@/types/sdc"
import Button from "@/components/lib/Button"
import Utils from "@/components/lib/Utils"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import { getPlatformFromUrl } from "@/components/lib/VideoPlatform"

const OneRunHome = ({
  run,
  categories,
  games,
  players,
}: {
  run: GetLatestLeaderboardRuns
  categories: GetLatestLeaderboardCategories[]
  games: GetLatestLeaderboardGames[]
  players: GetLatestLeaderboardPlayers[]
}) => {
  const theme = useColorScheme() ?? "light"
  const { handleRedirect } = useHandleRouter()

  const getPlayers = (players: GetLatestLeaderboardPlayers[]) => {
    const playersIds = run.playerIds.find((p) => p)
    const player = players.find((player) => player.id === playersIds)
    return player ? getPlayer(player) : null
  }

  const getPlayer = (player: GetLatestLeaderboardPlayers) => {
    return <UserName data={player.name} />
  }

  const getTime = () => {
    return <Runtime time={run.time} />
  }

  const getGames = (games: GetLatestLeaderboardGames[]) => {
    const game = games.find((game) => game.id === run.gameId)
    return game ? getGame(game) : null
  }

  const getGame = (game: GetLatestLeaderboardGames) => {
    return <Text style={cardStyle.text}>{game.name}</Text>
  }

  const getCategories = (categories: GetLatestLeaderboardCategories[]) => {
    const category = categories.find(
      (category) => category.id === run.categoryId
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
    return (
      <View
        style={[
          oneRunStyle.playerContainer,
          { width: Utils.moderateScale(220) },
        ]}
      >
        <View>
          {getPlayers(players)}
          {getGames(games)}
          {getCategories(categories)}
        </View>
      </View>
    )
  }

  const oneRun = () => {
    if (run) {
      const videoUri = run.video

      let videoComponent
      let platform = getPlatformFromUrl(videoUri)

      switch (platform) {
        case "youtube":
          videoComponent = (
            <YoutubeIframe
              videoUri={videoUri}
              platform={platform}
              width={340}
              height={180}
            />
          )
          break

        case "twitch":
          videoComponent = (
            <TwitchIframe
              videoUri={videoUri}
              platform={platform}
              width={340}
              height={180}
            />
          )
          break

        case "youtu.be":
          videoComponent = (
            <YoutubeIframe
              videoUri={videoUri}
              platform={platform}
              width={340}
              height={180}
            />
          )
          break

        default:
          return null
      }

      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          <View style={oneRunStyle.cardInfo}>
            {run ? (
              <View style={oneRunStyle.cardInfoItems}>
                {videoComponent}
                {getContent()}
                <Button
                  name="More"
                  redirect={() =>
                    handleRedirect(ROUTES.ONE_RUN, { id: run.id })
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

  return <View style={mainStyle.container}>{!run ? null : oneRun()}</View>
}

export default OneRunHome
