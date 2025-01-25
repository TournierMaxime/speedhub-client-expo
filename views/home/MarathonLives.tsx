import React from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Lives } from "../interface"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Utils from "@/components/lib/Utils"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"
import Card from "@/components/lib/Card"

interface Props {
  limit?: number
}

const MarathonLives: React.FC<Props> = ({ limit }) => {
  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["getLives", limit],
    queryFn: async () => {
      return await horaroService.getLives(limit ? { limit } : null)
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
            style.card,
            theme === "dark"
              ? { backgroundColor: Colors.dark.background }
              : { backgroundColor: Colors.light.background },
          ]}
        >
          {lives.map((live, idx) => (
            <Card
              header={idx === 0 ? "Marathons Live" : undefined}
              route={ROUTES.ONE_MARATHON_LIVE}
              routeParams={{ horaroId: live.horaroId }}
              key={idx}
            >
              <Text style={style.cardText}>{live.name}</Text>
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
      setLives(mergedData)
    }
  }, [data])

  return (
    <View style={style.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : marathonsLive()}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    marginHorizontal: "auto",
    marginTop: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
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
  cardItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Utils.moderateScale(10),
  },
  cardText: {
    fontSize: Utils.moderateScale(16),
    paddingVertical: Utils.moderateScale(10),
  },
  title: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
    padding: Utils.moderateScale(10),
  },
})

export default MarathonLives
