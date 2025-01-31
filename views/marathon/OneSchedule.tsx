import React from "react"
import { Text, View } from "react-native"
import Utils from "@/components/lib/Utils"
import moment from "moment"
import CatchError from "@/components/lib/CatchError"
import scheduleStyle from "@/styles/views/schedule"
import { Schedule, Items } from "@/types/speedhub"

const OneSchedule = ({ schedule }: { schedule: Schedule }) => {
  if (!schedule) {
    return <CatchError error={"No schedule for this event"} />
  }

  const renderItems = (items: Items[]) => {
    if (items.length > 0) {
      return items.map((item, idx) => (
        <View style={scheduleStyle.card} key={idx}>
          <View style={{ width: "60%" }}>
            <Text>{Utils.removeMarkdownLinks(item.data.join(", "))}</Text>
          </View>
          <View style={{ width: "30%" }}>
            <Text>{moment(item.scheduled).format("YYYY-MM-DD")}</Text>
            <Text>{moment(item.scheduled).format("h:mm a")}</Text>
          </View>
        </View>
      ))
    }
    return <Text>No schedule for this event</Text>
  }

  return (
    <View style={scheduleStyle.container}>
      <View style={scheduleStyle.header}>
        <Text style={scheduleStyle.title}>Schedule</Text>
        <Text style={scheduleStyle.subTitle}>{schedule.name}</Text>
      </View>
      {renderItems(schedule.items)}
    </View>
  )
}

export default OneSchedule
