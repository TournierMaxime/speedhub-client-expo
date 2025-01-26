import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Utils from "@/components/lib/Utils"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"
import Card from "@/components/lib/Card"
import { redditService } from "@/services/reddit"
import { Reddits } from "./interface"

interface Props {
  limit?: number
}

const AllReddits: React.FC<Props> = ({ limit }) => {
  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["getReddits", limit],
    queryFn: async () => {
      return await redditService.getAllNews(limit ? { limit } : null)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
  })

  const [reddits, setReddits] = useState<Reddits["data"]["children"]>([])

  const allReddits = () => {
    if (reddits.length > 0) {
      return (
        <View
          style={[
            style.card,
            theme === "dark"
              ? { backgroundColor: Colors.dark.background }
              : { backgroundColor: Colors.light.background },
          ]}
        >
          {reddits.map((reddit, idx) => {
            const permalink = reddit.data.permalink.endsWith("/")
              ? reddit.data.permalink.slice(0, -1)
              : reddit.data.permalink

            console.log(permalink.substring(11))

            return (
              <Card
                header={idx === 0 ? "News" : undefined}
                route={ROUTES.ONE_REDDIT}
                routeParams={{
                  permalink: `${permalink.substring(11)}.json`,
                }}
                key={idx}
              >
                <Text style={style.cardText}>{reddit?.data?.title}</Text>
              </Card>
            )
          })}
        </View>
      )
    }

    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data.children)
      setReddits(mergedData)
    }
  }, [data])

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <View style={style.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allReddits()}
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
  cardText: {
    fontSize: Utils.moderateScale(16),
    paddingVertical: Utils.moderateScale(10),
    textAlign: "justify",
    width: "90%",
  },
})

export default AllReddits
