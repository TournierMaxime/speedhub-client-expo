import { useState, useEffect } from "react"
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from "react-native"
import { runService } from "@/services/speedrunDotCom"
import { Runs } from "../interface"
import Utils from "@/components/lib/Utils"
import Runtime from "@/components/lib/RunTime"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import UserName from "@/components/lib/UserName"

const AllRuns = () => {
    const { handleRedirect } = useHandleRouter()
    const theme = useColorScheme() ?? 'light';

    const { data, isLoading, error } = useInfiniteQuery({
        queryKey: ["getRuns"],
        queryFn: async () => {
            return await runService.getRuns();
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage || undefined;
        },
    });

    if (error) {
        return <CatchError error={error} />
    }

    const [runs, setRuns] = useState<Runs["data"]>([]);

    useEffect(() => {
        if (data?.pages) {
            const mergedData = data.pages.flatMap((page) => page.data);
            setRuns(mergedData);
        }
    }, [data]);

    const players = (data: any) => {
        if (data) {
            const getPlayers = data.map(
                (player: any, idx: number) => {
                    return <UserName data={player} key={idx} width={"auto"} />
                }
            )
            return getPlayers
        }
        return null
    }

    const category = (data: string) => {
        if (data) {
            return <Text style={[style.text, theme === "dark" ? { color: Colors.dark.text } : { color: Colors.light.text }]}>{data}</Text>
        }
    }

    const allRuns = () => {
        if (runs.length > 0) {
            const getRuns = runs.map((run, idx) => {
                return (
                    <TouchableOpacity
                        onPress={async () => await handleRedirect(ROUTES.RUNS, { id: run.id })}
                        style={[style.card, theme === "dark" ? { backgroundColor: Colors.dark.background, shadowColor: Colors.dark.shadowColor, } : { backgroundColor: Colors.light.background, shadowColor: Colors.light.shadowColor }]}
                        key={idx}
                    >
                        <View style={style.cardImage}>
                            <Image
                                source={{ uri: run.game.data.assets["cover-large"].uri }}
                                style={style.image}
                            />
                        </View>
                        <View style={style.cardInfo}>
                            {players(run.players.data)}
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
        <View style={[style.container, theme === "dark" ? { backgroundColor: Colors.dark.background } : { backgroundColor: Colors.light.background }]}>
            {isLoading ? <IsLoading isLoading={isLoading} /> : allRuns()}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        marginTop: Utils.moderateScale(2),
    },
    card: {
        display: "flex",
        flexDirection: "row",
        margin: Utils.moderateScale(10),
        padding: Utils.moderateScale(10),
        borderRadius: Utils.moderateScale(5),
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
    username: {
        fontSize: Utils.moderateScale(18),
        fontWeight: "bold"
    },
    text: {
        fontSize: Utils.moderateScale(16)
    }
})

export default AllRuns
