import React, { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { gameService } from "@/services/speedrunDotCom"
import Runtime from "@/components/lib/RunTime"
import Utils from "@/components/lib/Utils"
import { Collapsible } from "@/components/Collapsible"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import { VideoCam } from "@/components/lib/Icons"

const Leaderboard = ({
  gameId,
  categoryId,
  variables = {},
  assets,
}: {
  gameId: string
  categoryId: string
  variables?: Record<string, string>
  assets?: any
}) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const { handleRedirect } = useHandleRouter()

  const {
    data: records,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getLeaderBoard", gameId, categoryId, variables],
    enabled: false,
    queryFn: async () => {
      const response = await gameService.getLeaderBoard(
        gameId,
        categoryId,
        variables
      )
      return response.data
    },
  })

  if (error) {
    return <CatchError error={error} />
  }

  if (records?.runs?.length === 0) {
    return <Text>No records available</Text>
  }

  return (
    <Collapsible
      title="Leaderboard"
      onToggle={(isOpen) => {
        console.log("isOpen", isOpen)
        setIsEnabled(isOpen)
        if (isOpen === true) {
          refetch()
        }
      }}
    >
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
        records?.runs?.map((run: any, idx: number) => {
          const playerId = run.run.players[0]?.id
          const player = records.players?.data?.find(
            (p: any) => p.id === playerId
          )
          const playerName = player?.names?.international ?? "Unknown Player"

          const getTrophyUri = (place: number) => {
            switch (place) {
              case 1:
                return assets["trophy-1st"]?.uri
              case 2:
                return assets["trophy-2nd"]?.uri
              case 3:
                return assets["trophy-3rd"]?.uri
              default:
                return null
            }
          }

          return (
            <View key={idx} style={style.row}>
              <View style={style.trophyContainer}>
                {getTrophyUri(run.place) && (
                  <Image
                    source={{ uri: getTrophyUri(run.place) }}
                    style={style.trophy}
                  />
                )}
              </View>
              <Text style={style.player}>{playerName}</Text>
              <Runtime time={run.run.times.primary_t} css={style.time} />
              <TouchableOpacity
                style={style.icon}
                onPress={async () =>
                  handleRedirect(ROUTES.ONE_RUN, { id: run.run.id })
                }
              >
                <VideoCam />
              </TouchableOpacity>
            </View>
          )
        })
      )}
    </Collapsible>
  )
}

const style = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingVertical: Utils.moderateScale(5),
    marginHorizontal: Utils.moderateScale(10),
  },
  trophyContainer: {
    width: "15%",
  },
  trophy: {
    width: Utils.moderateScale(20),
    height: Utils.moderateScale(20),
    resizeMode: "contain",
  },
  player: {
    fontSize: Utils.moderateScale(16),
    width: "40%",
  },
  time: {
    fontSize: Utils.moderateScale(16),
    width: "30%",
  },
  icon: {
    width: "15%",
  },
})

export default Leaderboard
