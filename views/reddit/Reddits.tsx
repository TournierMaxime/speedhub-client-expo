import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { useColorScheme } from "react-native"
import ROUTES from "@/components/routes"
import Card from "@/components/lib/Card"
import { redditService } from "@/services/reddit"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import { Reddits } from "@/types/reddit"

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
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          {reddits.map((reddit, idx) => {
            const permalink = reddit.data.permalink.endsWith("/")
              ? reddit.data.permalink.slice(0, -1)
              : reddit.data.permalink

            return (
              <Card
                header={idx === 0 ? "News" : undefined}
                route={ROUTES.ONE_REDDIT}
                routeParams={{
                  permalink: `${permalink.substring(11)}.json`,
                }}
                key={idx}
              >
                <Text style={cardStyle.cardText}>{reddit?.data?.title}</Text>
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
    <View style={mainStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allReddits()}
    </View>
  )
}

export default AllReddits
