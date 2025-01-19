import React, { useState } from "react"
import { View, StyleSheet, Text, ActivityIndicator, Image, ScrollView } from "react-native"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { User } from "../interface"
import { userService } from "@/services/speedrunDotCom"
import PersonalBestsUser from "./PersonalBestsUser"
import moment from "moment"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

const OneUser = () => {
    const { id } = useGlobalSearchParams()

    const theme = useColorScheme() ?? 'light';

    const { data, isLoading, error } = useQuery<User>({
        queryKey: ["getUser", id],
        queryFn: async () => {
            if (!id) throw new Error("Missing ID")
            return await userService.getUser(id)
        },
        enabled: !!id,
    })

    if (error) {
        return (
            <View style={style.container}>
                <Header backButton={true} title="Run Details" />
                <Text>An error occurred: {error.message}</Text>
            </View>
        )
    }

    const oneUser = () => {
        if (data) {
            return (
                <View style={[style.cardUser, theme === "dark" ? { backgroundColor: Colors.dark.background, shadowColor: Colors.dark.shadowColor } : { backgroundColor: Colors.light.background, shadowColor: Colors.light.shadowColor }]}>
                    <View style={style.cardImage}>
                        <Image source={{ uri: data.data.assets.image.uri }} style={style.image} />
                        <Text style={[style.textCard, theme === "dark" ? { color: Colors.dark.text } : { color: Colors.light.text }]}>{data.data.names.international}</Text>
                    </View>
                    <View style={style.cardInfo}>
                        <Text style={[style.textCard, theme === "dark" ? { color: Colors.dark.text } : { color: Colors.light.text }]}>{data.data.location?.country.names.international ?? null}</Text>
                        <Text style={[style.textCard, theme === "dark" ? { color: Colors.dark.text } : { color: Colors.light.text }]}>{data.data.location?.region.names.international ?? null}</Text>
                        <Text style={[style.textCard, theme === "dark" ? { color: Colors.dark.text } : { color: Colors.light.text }]}>{`role ${data.data.role}`}</Text>
                        <Text style={[style.textCard, theme === "dark" ? { color: Colors.dark.text } : { color: Colors.light.text }]}>{moment(data.data.signup).format("YYYY-MM-DD h:mm:ss a") ?? null}</Text>
                    </View>
                </View>
            )
        }
        return null
    }

    return (
        <ScrollView style={[style.container, theme == "dark" ? { backgroundColor: Colors.dark.background } : { backgroundColor: Colors.light.background }]}>
            <Header backButton={true} title="" />
            {isLoading ? <ActivityIndicator /> : oneUser()}
            <PersonalBestsUser />
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

export default OneUser
