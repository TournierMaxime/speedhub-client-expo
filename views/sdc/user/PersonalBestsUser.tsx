import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { PersonalBests } from "../interface"
import { userService } from "@/services/speedrunDotCom"

const PersonalBestsUser = () => {
    const { id } = useGlobalSearchParams()

    const { data, isLoading } = useInfiniteQuery({
        queryKey: ["getPersonalBests"],
        queryFn: async () => {
            return await userService.getPersonalBests(id);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage || undefined;
        },
    });

    const [personalBest, setPersonalBest] = useState<PersonalBests["data"]>([]);

    useEffect(() => {
        if (data?.pages) {
            const mergedData = data.pages.flatMap((page) => page.data);
            setPersonalBest(mergedData);
        }
    }, [data]);

    const personalBests = () => {
        if (personalBest.length > 0) {
            const getPersonalBests = personalBest.map((pb, idx) => {
                return (
                    <TouchableOpacity
                        key={idx}
                        style={style.card}
                    >
                        <View>
                            <Text>{pb.place}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
            return getPersonalBests
        }
        return null
    }

    return (
        <View style={style.container}>
            {isLoading ? <ActivityIndicator /> : personalBests()}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
    },
    card: {
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
})

export default PersonalBestsUser
