import React, { Fragment } from "react"
import { horaroService } from "@/services/speedhub"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import Error from "@/components/lib/Error"
import { Upcomings } from "../interface"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Utils from "@/components/lib/Utils"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import AntDesign from "@expo/vector-icons/AntDesign"

const UpcomingMarathons = () => {
    const theme = useColorScheme() ?? "light"

    const { data, isLoading, error } = useInfiniteQuery({
        queryKey: ["getUpcomings"],
        queryFn: async () => {
            return await horaroService.getUpcomings()
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage || undefined
        },
    })

    const [upcomings, setUpcomings] = useState<Upcomings["data"]>([])

    if (error) {
        return <Error error />
    }

    const upcomingMarathons = () => {
        if (upcomings.length > 0) {
            const upcomingMarathons = upcomings.map((upcoming, idx) => {
                const isFirst = idx === 0
                const isLast = idx === upcomings.length - 1

                return (
                    <TouchableOpacity
                        key={idx}
                        style={[
                            style.cardItem,
                            isFirst
                                ? {
                                    borderTopWidth: Utils.moderateScale(1),
                                    borderBottomWidth: undefined,
                                }
                                : isLast
                                    ? {
                                        borderTopWidth: Utils.moderateScale(1),
                                        borderBottomWidth: undefined,
                                    }
                                    : {

                                        borderTopWidth: Utils.moderateScale(1),
                                    },
                        ]}
                    >
                        <Text style={style.cardText}>{upcoming.name}</Text>
                        <AntDesign
                            name="arrowright"
                            size={Utils.moderateScale(24)}
                            color="black"
                        />
                    </TouchableOpacity>
                )
            })
            return upcomingMarathons
        }

        return null
    }

    useEffect(() => {
        if (data?.pages) {
            const mergedData = data.pages.flatMap((page) => page.data)
            setUpcomings(mergedData)
        }
    }, [data])

    return (
        <View style={style.container}>
            {isLoading ? (
                <IsLoading isLoading />
            ) : (
                <View
                    style={[
                        style.card,
                        theme === "dark"
                            ? { backgroundColor: Colors.dark.background }
                            : { backgroundColor: Colors.light.background },
                    ]}
                >
                    <Text style={style.title}>Upcoming Marathons</Text>
                    <Fragment>{upcomingMarathons()}</Fragment>
                </View>
            )}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: Utils.moderateScale(10),
        borderWidth: Utils.moderateScale(1),
        borderRadius: Utils.moderateScale(5),
        borderColor: "grey"
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
        padding: Utils.moderateScale(10)
    },
})

export default UpcomingMarathons
