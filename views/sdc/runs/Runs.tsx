import { useState, useEffect, Fragment } from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import { runService } from "@/services/speedrunDotCom"
import { Runs } from "../interface"
import Utils from "@/components/lib/Utils"
import Runtime from "@/components/lib/RunTime"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import UserName from "@/components/lib/UserName"
import Card from "@/components/lib/Card"

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
      return (
        <Text
          style={[
            style.text,
            theme === "dark"
              ? { color: Colors.dark.text }
              : { color: Colors.light.text },
          ]}
        >
          {category.name}
        </Text>
      )
    }
  }

  const allRuns = () => {
    if (runs.length > 0) {
      return (
        <View
          style={[
            style.card,
            theme === "dark"
              ? { backgroundColor: Colors.dark.background }
              : { backgroundColor: Colors.light.background },
          ]}
        >
          {runs.map((run, idx) => (
            <Card
              header={idx === 0 ? "Latest Runs" : undefined}
              route={ROUTES.RUNS}
              routeParams={{ id: run.id }}
              key={idx}
            >
              <Fragment>
                <View style={style.cardImage}>
                  <Image
                    source={{
                      uri: run.game.data.assets["cover-large"].uri,
                    }}
                    style={style.image}
                  />
                </View>
                <View style={style.cardInfo}>
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
    <View style={style.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allRuns()}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: Utils.moderateScale(2),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    margin: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
  },
  cardImage: {
    display: "flex",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    marginLeft: Utils.moderateScale(10),
    width: "50%",
  },
  image: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
    resizeMode: "contain",
    borderRadius: Utils.moderateScale(5),
  },
  username: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
  },
  text: {
    fontSize: Utils.moderateScale(16),
  },
})

export default AllRuns
