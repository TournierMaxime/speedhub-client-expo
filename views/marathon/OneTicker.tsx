import React, { Fragment } from "react"
import { Text, View, StyleSheet } from "react-native"
import { Ticker } from "./interface"
import Utils from "@/components/lib/Utils"
import moment from "moment"
import CatchError from "@/components/lib/CatchError"
import tickerStyle from "@/styles/views/ticker"

interface Item {
  previous: {
    length: string
    length_t: number
    scheduled: string
    scheduled_t: number
    data: string[]
  } | null
  current: {
    length: string
    length_t: number
    scheduled: string
    scheduled_t: number
    data: string[]
  } | null
  next: {
    length: string
    length_t: number
    scheduled: string
    scheduled_t: number
    data: string[]
  } | null
}

const OneTicker: React.FC<Ticker> = ({ ticker }) => {
  if (!ticker) {
    return <CatchError error={"No ticker for this event"} />
  }

  const renderCurrent = (item: Item) => {
    const { previous, current, next } = item
    return (
      <Fragment>
        {previous && (
          <View style={tickerStyle.card}>
            <View style={{ width: "20%" }}>
              <Text>Previous</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text>{Utils.removeMarkdownLinks(previous.data.join(", "))}</Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text>{moment(previous.scheduled).format("YYYY-MM-DD")}</Text>
              <Text>{moment(previous.scheduled).format("h:mm a")}</Text>
            </View>
          </View>
        )}

        {current && (
          <View style={tickerStyle.card}>
            <View style={{ width: "20%" }}>
              <Text>Current</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text>{Utils.removeMarkdownLinks(current.data.join(", "))}</Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text>{moment(current.scheduled).format("YYYY-MM-DD")}</Text>
              <Text>{moment(current.scheduled).format("h:mm a")}</Text>
            </View>
          </View>
        )}

        {next && (
          <View style={tickerStyle.card}>
            <View style={{ width: "20%" }}>
              <Text>Next</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text>{Utils.removeMarkdownLinks(next.data.join(", "))}</Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text>{moment(next.scheduled).format("YYYY-MM-DD")}</Text>
              <Text>{moment(next.scheduled).format("h:mm a")}</Text>
            </View>
          </View>
        )}

        {!previous && !current && !next && (
          <Text>No schedule for this event</Text>
        )}
      </Fragment>
    )
  }

  return (
    <View style={tickerStyle.container}>
      <View style={tickerStyle.header}>
        <Text style={tickerStyle.title}>Ticker</Text>
      </View>
      {renderCurrent(ticker.ticker)}
    </View>
  )
}

export default OneTicker
