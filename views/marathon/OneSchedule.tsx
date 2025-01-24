import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { Schedule } from "./interface"
import Utils from "@/components/lib/Utils"
import moment from "moment"
import CatchError from "@/components/lib/CatchError"

interface Item {
    length: string
    length_t: number
    scheduled: string
    scheduled_t: number
    data: string[]
}

const OneSchedule: React.FC<Schedule> = ({ schedule }) => {

    if (!schedule) {
        return <CatchError error={"No schedule for this event"} />
    }

    const renderItems = (items: Item[]) => {
        if (items.length > 0) {
            return items.map((item, idx) => (
                <View style={style.card} key={idx}>
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
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.title}>Schedule</Text>
                <Text style={style.subTitle}>{schedule.name}</Text>
            </View>
            {renderItems(schedule.items)}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%",
        borderWidth: Utils.moderateScale(1),
        marginTop: Utils.moderateScale(10),
        borderRadius: Utils.moderateScale(5),
        padding: Utils.moderateScale(10),
        borderColor: "grey",
    },
    title: {
        fontSize: Utils.moderateScale(18),
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: Utils.moderateScale(16),
    },
    header: {
        display: "flex",
        flexDirection: "column",
    },
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: Utils.moderateScale(10)
    },
})

export default OneSchedule
