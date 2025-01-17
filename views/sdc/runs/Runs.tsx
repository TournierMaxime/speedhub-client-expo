import { useState, useEffect } from "react"
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native"
import { speedRunDotComRunService } from "@/services/speedrunDotCom"
import { useRouter } from "expo-router"
import { Runs } from "../interface"
import Utils from "@/components/lib/Utils"
import Runtime from "@/components/lib/RunTime"
import { useInfiniteQuery } from "@tanstack/react-query"

const AllRuns = () => {
    const router = useRouter()

    const { data, isLoading } = useInfiniteQuery({
        queryKey: ["getRuns"],
        queryFn: async () => {
            return await speedRunDotComRunService.getRuns();
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage || undefined;
        },
    });

    const [runs, setRuns] = useState<Runs["data"]>([]);

    useEffect(() => {
        if (data?.pages) {
            const mergedData = data.pages.flatMap((page) => page.data);
            setRuns(mergedData);
        }
    }, [data]);

    const handleRedirectRun = (id: string) => {
        router.push({
            pathname: "/(main)/(runs)/run",
            params: {
                id,
            },
        })
    }

    const players = (data: any) => {
        if (data) {
            const getPlayers = data.players.data.map(
                (player: { names: { international: string } }, idx: string) => {
                    return <Text style={{ fontSize: Utils.moderateScale(18), fontWeight: "bold" }} key={idx}>{player?.names?.international}</Text>
                }
            )
            return getPlayers
        }
        return null
    }

    const category = (data: string) => {
        if (data) {
            return <Text style={{ fontSize: Utils.moderateScale(16) }}>{data}</Text>
        }
    }

    const allRuns = () => {
        if (runs.length > 0) {
            const getRuns = runs.map((run, idx) => {
                return (
                    <TouchableOpacity
                        onPress={() => handleRedirectRun(run.id)}
                        style={style.card}
                        key={idx}
                    >
                        <View style={style.cardImage}>
                            <Image
                                source={{ uri: run.game.data.assets["cover-large"].uri }}
                                style={style.image}
                            />
                        </View>
                        <View style={style.cardInfo}>
                            {players(run)}
                            {category(run.category.data.name)}
                            <Runtime time={run.times.primary_t} />
                        </View>

                    </TouchableOpacity>
                )
            })
            return getRuns
        }
        return null
    }

    return (
        <View style={style.container}>
            {isLoading ? <ActivityIndicator /> : allRuns()}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#fff",
        marginTop: Utils.moderateScale(2),
    },
    card: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff",
        margin: Utils.moderateScale(10),
        padding: Utils.moderateScale(10),
        borderRadius: Utils.moderateScale(5),
        shadowColor: "#000",
        shadowOffset: { width: Utils.moderateScale(0), height: Utils.moderateScale(2) },
        shadowOpacity: Utils.moderateScale(0.25),
        shadowRadius: Utils.moderateScale(3.5),
        elevation: Utils.moderateScale(5),
    },
    cardImage: {
        display: "flex",
    },
    cardInfo: {
        display: "flex",
        flexDirection: "column",
        marginLeft: Utils.moderateScale(10)
    },
    image: {
        width: Utils.moderateScale(80),
        height: Utils.moderateScale(80),
        resizeMode: "contain",
        borderRadius: Utils.moderateScale(5),
    },
})

export default AllRuns
