import React, { Fragment } from "react"
import { Marathons, Marathon } from "@/types/speedhub"
import { View, StyleSheet, Text, FlatList } from "react-native"
import mainStyle from "@/styles/base/main"
import OneMarathonUpcoming from "../marathon/OneMarathonUpcoming"
import Utils from "@/components/lib/Utils"
import { Calendar } from "@/components/lib/Icons"

const UpcomingMarathons = ({ data }: { data: Marathons["data"] }) => {
  const renderItem = ({ item, index }: { item: Marathon; index: number }) => {
    if (item.type === "upcoming") {
      return <OneMarathonUpcoming key={index} data={item} />
    }
    return null
  }

  const upcomingMarathons = () => {
    if (data && data.length > 0) {
      return (
        <Fragment>
          <View style={style.titleAndIcon}>
            <Text style={style.title}>Upcoming Marathons</Text>
            <Calendar />
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.marathonId.toString()}
            nestedScrollEnabled={true}
            initialNumToRender={data.length}
            maxToRenderPerBatch={data.length}
            removeClippedSubviews={true}
            windowSize={data.length}
          />
        </Fragment>
      )
    }

    return null
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>
        {!data ? null : upcomingMarathons()}
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
