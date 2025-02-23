import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Upcomings } from "@/types/speedhub"
import { useState, useEffect } from "react"
import { View } from "react-native"
import { useColorScheme } from "react-native"
import mainStyle from "@/styles/base/main"
import cardStyle from "@/styles/components/card"
import OneMarathonUpcoming from "../marathon/OneMarathonUpcoming"

const UpcomingMarathons = ({ limit }: { limit: number }) => {
  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error, refetch } = useInfiniteQuery({
    queryKey: ["getUpcomings", limit],
    queryFn: async () => {
      return await horaroService.getUpcomings(limit ? { limit } : null)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
    staleTime: 1000 * 60 * 30,
  })

  const [upcomings, setUpcomings] = useState<Upcomings["data"]>([])

  if (error) {
    return <CatchError error={error} />
  }

  const upcomingMarathons = () => {
    if (upcomings.length > 0) {
      return (
        <View
          style={[
            cardStyle.card,
            theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
          ]}
        >
          {upcomings.map((upcoming, idx) => (
            <OneMarathonUpcoming key={idx} data={upcoming} />
          ))}
        </View>
      )
    }

    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data)
      const filteredData = mergedData.filter((item) => item !== undefined)
      setUpcomings(filteredData)
    }
  }, [data])

  if (upcomings === undefined && !isLoading) {
    refetch()
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>
        {isLoading ? (
          <IsLoading isLoading={isLoading} />
        ) : (
          upcomings && upcomings.length > 0 && upcomingMarathons()
        )}
      </View>
    </Fragment>
  )
}

export default UpcomingMarathons
