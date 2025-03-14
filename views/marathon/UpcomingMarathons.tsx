import React, { Fragment } from "react"
import { Upcomings } from "@/types/speedhub"
import { View, StyleSheet, Text } from "react-native"
import mainStyle from "@/styles/base/main"
import OneMarathonUpcoming from "../marathon/OneMarathonUpcoming"
import Utils from "@/components/lib/Utils"
import { Calendar } from "@/components/lib/Icons"

const UpcomingMarathons = ({ data }: { data: Upcomings["data"] }) => {
  const upcomingMarathons = () => {
    if (data && data.length > 0) {
      return (
        <Fragment>
          <View style={style.titleAndIcon}>
            <Text style={style.title}>Upcoming Marathons</Text>
            <Calendar />
          </View>

          {data.map((upcoming, idx) => {
            if (!upcoming.ticker) return null
            return <OneMarathonUpcoming key={idx} data={upcoming} />
          })}
        </Fragment>
      )
    }

    return null
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>
        {!data ? null : data && data.length > 0 && upcomingMarathons()}
      </View>
    </Fragment>
  )
}

const style = StyleSheet.create({
  title: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
  },
  titleAndIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Utils.moderateScale(10),
  },
})

export default UpcomingMarathons
