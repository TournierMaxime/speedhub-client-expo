import React, { Fragment } from "react"
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from "react-native"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { Live } from "../interface"
import { horaroService } from "@/services/speedhub"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import OneSchedule from "./OneSchedule"
import OneTicker from "./OneTicker"

const OneMarathonUpcoming = () => {
    const { horaroId } = useGlobalSearchParams()

    const theme = useColorScheme() ?? 'light';

    const { data, isLoading, error } = useQuery<Live>({
        queryKey: ["getUpcoming", horaroId],
        queryFn: async () => {
            if (!horaroId) throw new Error("Missing ID")
            return await horaroService.getUpcoming(horaroId)

        },
        enabled: !!horaroId,
    })

    if (error) {
        return <CatchError error={error} />
    }

    const oneMarathonUpcoming = () => {
        if (data) {
            return (
                <Fragment>
                    <View style={[style.cardUser, theme === "dark" ? { backgroundColor: Colors.dark.background, shadowColor: Colors.dark.shadowColor } : { backgroundColor: Colors.light.background, shadowColor: Colors.light.shadowColor }]}>
                        <View style={style.cardInfo}>
                            <Text>Upcoming</Text>
                            <Text style={[style.textCard, theme === "dark" ? { color: Colors.dark.text } : { color: Colors.light.text }]}>{data.name}</Text>
                        </View>
                    </View>
                    <OneTicker ticker={data.ticker} />
                    <OneSchedule schedule={data.schedule} />
                </Fragment>
            )
        }
        return null
    }

    return (
        <ScrollView style={[style.container, theme == "dark" ? { backgroundColor: Colors.dark.background } : { backgroundColor: Colors.light.background }]}>
            <Header backButton={true} title="" />
            {isLoading ? <IsLoading isLoading={isLoading} /> : oneMarathonUpcoming()}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#fff",
        height: "100%",
    },
    cardUser: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "auto",
        marginRight: "auto",
        width: "90%",
        borderWidth: Utils.moderateScale(1),
        marginTop: Utils.moderateScale(10),
        borderRadius: Utils.moderateScale(5),
        padding: Utils.moderateScale(10),
        borderColor: "grey"
    },
    cardImage: {
        display: "flex",
        flexDirection: "column",
        width: "40%"
    },
    cardInfo: {
        display: "flex",
        flexDirection: "column",
        width: "60%"
    },
    image: {
        width: Utils.moderateScale(80),
        height: Utils.moderateScale(80)
    },
    textCard: {
        fontSize: Utils.moderateScale(16)
    }
})

export default OneMarathonUpcoming
