import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Lives } from "@/types/speedhub"
import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { useColorScheme } from "react-native"
import ROUTES from "@/components/routes"
import Card from "@/components/lib/Card"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import useHandleRouter from "@/hooks/utils/useHandleRouter"

interface Props {
  limit?: number
}

const MarathonLives: React.FC<Props> = ({ limit }) => {
  const theme = useColorScheme() ?? "light"

  const { currentPath } = useHandleRouter()

  const { data, isLoading, error, refetch } = useInfiniteQuery({
    queryKey: ["getLives", limit],
    queryFn: async () => {
      return await horaroService.getLives(
        limit ? { limit, isLive: true } : null
      )
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
  })

  const [lives, setLives] = useState<Lives["data"]>([])

  if (error) {
    return <CatchError error={error} />
  }

  const marathonsLive = () => {
    if (lives.length > 0) {
      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          {lives.map((live, idx) => {
            if (live.isLive) {
              return (
                <Card
                  header={idx === 0 ? "Marathons Live" : undefined}
                  route={ROUTES.ONE_MARATHON_LIVE}
                  routeParams={{ horaroId: live.horaroId }}
                  key={idx}
                  currentPath={currentPath(ROUTES.MARATHONS)}
                >
                  <Text style={cardStyle.cardText}>{live.name}</Text>
                </Card>
              )
            }

            return null
          })}
        </View>
      )
    }

    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data)
      const filteredData = mergedData.filter((item) => item !== undefined)
      setLives(filteredData)
    }
  }, [data])

  if (lives === undefined && !isLoading) {
    refetch()
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>
        {isLoading ? (
          <IsLoading isLoading={isLoading} />
        ) : (
          lives && lives.length > 0 && marathonsLive()
        )}
      </View>
    </Fragment>
  )
}

export default MarathonLives
