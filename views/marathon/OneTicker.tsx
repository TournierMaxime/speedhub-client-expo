import React, { Fragment } from "react"
import { Text, View, StyleSheet } from "react-native"
import { Ticker } from "./interface"
import Utils from "@/components/lib/Utils"
import moment from "moment"
import CatchError from "@/components/lib/CatchError"

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
                    <View style={style.card}>
                        <View style={{ width: "25%" }}>
                            <Text>Previous</Text>
                        </View>
                        <View style={{ width: "45%" }}>
                            <Text>
                                {Utils.removeMarkdownLinks(previous.data.join(", "))}
                            </Text>
                        </View>
                        <View style={{ width: "25%" }}>
                            <Text>
                                {moment(previous.scheduled).format("YYYY-MM-DD")}
                            </Text>
                            <Text>{moment(previous.scheduled).format("h:mm a")}</Text>
                        </View>
                    </View>
                )}

                {current && (
                    <View style={style.card}>
                        <View style={{ width: "25%" }}>
                            <Text>Current</Text>
                        </View>
                        <View style={{ width: "45%" }}>
                            <Text>
                                {Utils.removeMarkdownLinks(current.data.join(", "))}
                            </Text>
                        </View>
                        <View style={{ width: "25%" }}>
                            <Text>{moment(current.scheduled).format("YYYY-MM-DD")}</Text>
                            <Text>{moment(current.scheduled).format("h:mm a")}</Text>
                        </View>
                    </View>
                )}

                {next && (
                    <View style={style.card}>
                        <View style={{ width: "25%" }}>
                            <Text>Next</Text>
                        </View>
                        <View style={{ width: "45%" }}>
                            <Text>
                                {Utils.removeMarkdownLinks(next.data.join(", "))}
                            </Text>
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
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.title}>Ticker</Text>
            </View>
            {renderCurrent(ticker.ticker)}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "auto",
        marginRight: "auto",
        width: "90%",
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
        marginVertical: Utils.moderateScale(10),
    },
})

export default OneTicker
