import { useState, useEffect, Fragment } from "react"
import { View, Text, Image } from "react-native"
import { runService } from "@/services/speedrunDotCom"
import { Runs } from "@/types/sdc"
import Runtime from "@/components/lib/RunTime"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useColorScheme } from "react-native"
import ROUTES from "@/components/routes"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import UserName from "@/components/lib/UserName"
import Card from "@/components/lib/Card"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"

interface Props {
  limit?: number
}

const AllRuns: React.FC<Props> = ({ limit }) => {
  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["getRuns", limit],
    queryFn: async () => {
      return await runService.getRuns(limit ?? 20)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
  })

  const [runs, setRuns] = useState<Runs["data"]>([])

  const getPlayers = (players: Runs["data"][0]["players"]["data"]) => {
    if (players) {
      const getPlayers = players.map((player: any, idx: number) => {
        return <UserName data={player} key={idx} width={"auto"} />
      })
      return getPlayers
    }
    return null
  }

  const getCategory = (category: Runs["data"][0]["category"]["data"]) => {
    if (category) {
      return <Text style={cardStyle.text}>{category.name}</Text>
    }
  }

  const allRuns = () => {
    if (runs.length > 0) {
      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          {runs.map((run, idx) => (
            <Card
              header={idx === 0 ? "Latest Runs" : undefined}
              route={ROUTES.ONE_RUN}
              routeParams={{ id: run.id }}
              key={idx}
            >
              <Fragment>
                <View style={cardStyle.cardImage}>
                  <Image
                    source={{
                      uri: run.game.data.assets["cover-large"].uri,
                    }}
                    style={cardStyle.image}
                  />
                </View>
                <View style={cardStyle.cardInfo}>
                  {getPlayers(run.players.data)}
                  {getCategory(run.category.data)}
                  <Runtime time={run.times.primary_t} />
                </View>
              </Fragment>
            </Card>
          ))}
        </View>
      )
    }
    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data)
      setRuns(mergedData)
    }
  }, [data])

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <View style={mainStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allRuns()}
    </View>
  )
}

export default AllRuns
