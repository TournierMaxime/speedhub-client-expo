import React, { Fragment } from "react"
import { Text, View } from "react-native"
import { Ticker, TickerChildren } from "@/types/speedhub"
import Utils from "@/components/lib/Utils"
import moment from "moment"
import CatchError from "@/components/lib/CatchError"
import tickerStyle from "@/styles/views/ticker"

const OneTicker = ({ ticker }: { ticker: TickerChildren }) => {
  if (!ticker) {
    return <CatchError error={"No ticker for this event"} />
  }

  const renderItem = () => {
    const { previous, current, next } = ticker
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
      {renderItem()}
    </View>
  )
}

export default OneTicker
