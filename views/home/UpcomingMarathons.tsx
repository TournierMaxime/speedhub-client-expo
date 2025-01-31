import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { Upcomings } from "../interface"
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

const UpcomingMarathons: React.FC<Props> = ({ limit }) => {
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
            style.card,
            theme === "dark"
              ? { backgroundColor: Colors.dark.background }
              : { backgroundColor: Colors.light.background },
          ]}
        >
          {upcomings.map((upcoming, idx) => (
            <Card
              header={idx === 0 ? "Upcoming Marathons" : undefined}
              route={ROUTES.ONE_MARATHON_UPCOMING}
              routeParams={{ horaroId: upcoming.horaroId }}
              key={idx}
            >
              <Text style={style.cardText}>{upcoming.name}</Text>
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
      const filteredData = mergedData.filter((item) => item !== undefined)
      setUpcomings(filteredData)
    }
  }, [data])

  if (upcomings === undefined && !isLoading) {
    refetch()
  }

  return (
    <Fragment>
      <View style={style.container}>
        {isLoading ? (
          <IsLoading isLoading={isLoading} />
        ) : (
          upcomings && upcomings.length > 0 && upcomingMarathons()
        )}
      </View>
    </Fragment>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    marginBottom: Utils.moderateScale(10),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginHorizontal: "auto",
    marginTop: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    borderColor: "grey",
    /*     shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5), */
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

export default UpcomingMarathons
