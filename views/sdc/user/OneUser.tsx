import React, { useState } from "react"
import { View, StyleSheet, Text, ActivityIndicator, Image } from "react-native"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { User } from "../interface"
import { userService } from "@/services/speedrunDotCom"
import PersonalBestsUser from "./PersonalBestsUser"
import moment from "moment"

const OneUser = () => {
    const { id } = useGlobalSearchParams()

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
                <View style={style.cardUser}>
                    <View style={style.cardImage}>
                        <Image source={{ uri: data.data.assets.image.uri }} style={style.image} />
                        <Text>{data.data.names.international}</Text>
                    </View>
                    <View style={style.cardInfo}>
                        <Text>{data.data.location.country.names.international}</Text>
                        <Text>{data.data.location.region.names.international}</Text>
                        <Text>{data.data.role}</Text>
                        <Text>{moment(data.data.signup).format("YYYY-MM-DD h:mm:ss a")}</Text>
                    </View>
                </View>
            )
        }
        return null
    }

    return (
        <View style={style.container}>
            <Header backButton={true} title="" />
            {isLoading ? <ActivityIndicator /> : oneUser()}
            <PersonalBestsUser />
        </View>
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
        padding: Utils.moderateScale(10)
    },
    cardImage: {
        display: "flex",
        flexDirection: "column",
        width: "30%"
    },
    cardInfo: {
        display: "flex",
        flexDirection: "column",
        width: "70%"
    },
    image: {
        width: Utils.moderateScale(40),
        height: Utils.moderateScale(40)
    }
})

export default OneUser
