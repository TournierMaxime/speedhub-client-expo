import React, { Fragment } from "react"
import { Marathons, Marathon } from "@/types/speedhub"
import { View, Text, StyleSheet, FlatList } from "react-native"
import mainStyle from "@/styles/base/main"
import { BroadCast } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"
import OneMarathonLive from "../marathon/OneMarathonLive"

const MarathonLives = ({ data }: { data: Marathons["data"] }) => {
  const renderItem = ({ item, index }: { item: Marathon; index: number }) => {
    if (item.isLive && item.type === "live") {
      return <OneMarathonLive key={index} data={item} />
    }
    return null
  }

  const marathonsLive = () => {
    if (data && data.length > 0) {
      return (
        <Fragment>
          <View style={style.titleAndIcon}>
            <Text style={style.title}>Live Marathons</Text>
            <BroadCast />
          </View>
          <FlatList data={data} horizontal={true} renderItem={renderItem} />
        </Fragment>
      )
    }

    return null
  }

  return (
    <Fragment>
      <View style={mainStyle.container}>{!data ? null : marathonsLive()}</View>
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

export default MarathonLives
