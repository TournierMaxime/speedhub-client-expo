import React, { useState, useEffect } from "react"
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from "react-native"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams, useRouter } from "expo-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { PersonalBests } from "../interface"
import { userService } from "@/services/speedrunDotCom"
import Runtime from "@/components/lib/RunTime"

const PersonalBestsUser = () => {
    const { id } = useGlobalSearchParams()

    const router = useRouter()

    const { data, isLoading } = useInfiniteQuery({
        queryKey: ["getPersonalBests"],
        queryFn: async () => {
            return await userService.getPersonalBests(id)
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage || undefined
        },
    })

    const [personalBest, setPersonalBest] = useState<PersonalBests["data"]>([])

    const getPlace = (place: number) => {
        switch (place) {
            case 1:
                return <Text style={style.textCard}>{place}st place</Text>
            case 2:
                return <Text style={style.textCard}>{place}nd place</Text>
            case 3:
                return <Text style={style.textCard}>{place}rd place</Text>
            default:
                return <Text style={style.textCard}>{place}th place</Text>

        }
    }

    const personalBests = () => {

        const handleRedirectToRun = (id: string) => {
            router.push({
                pathname: "/(main)/(runs)/run",
                params: {
                    id
                }
            })
        }

        if (personalBest.length > 0) {
            const getPersonalBests = personalBest.map((pb, idx) => {
                return (
                    <TouchableOpacity key={idx} style={style.card} onPress={() => handleRedirectToRun(pb.run.id)}>
                        <View style={style.cardImage}>
                            <Image style={style.image} source={{ uri: pb.game.data.assets["cover-large"].uri }} />
                        </View>
                        <View style={style.cardInfo}>
                            <Text style={style.textCard}>{pb.game.data.names.international}</Text>
                            <Text style={style.textCard}>{pb.category.data.name}</Text>
                            <Runtime time={pb.run.times.primary_t} />
                            {getPlace(pb.place)}
                        </View>
                    </TouchableOpacity>
                )
            })
            return getPersonalBests
        }
        return null
    }

    useEffect(() => {
        if (data?.pages) {
            const mergedData = data.pages.flatMap((page) => page.data)
            setPersonalBest(mergedData)
        }
    }, [data])

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
        padding: Utils.moderateScale(10),
    },
    cardImage: {
        display: "flex",
        flexDirection: "column",
        width: "30%",
    },
    cardInfo: {
        display: "flex",
        flexDirection: "column",
        width: "70%",
    },
    image: {
        width: Utils.moderateScale(80),
        height: Utils.moderateScale(80),
        resizeMode: "contain",
        borderRadius: Utils.moderateScale(5)
    },
    textCard: {
        fontSize: Utils.moderateScale(16)
    }
})

export default PersonalBestsUser
