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

const AllRuns = () => {
    const [runs, setRuns] = useState<Runs>()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const fetchRuns = async () => {
        setLoading(true)
        try {
            const result = await speedRunDotComRunService.getRuns()
            setRuns(result)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleRedirectGame = (id: string) => {
        router.push({
            pathname: "/(main)/(games)/game",
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
        if (runs) {
            const getRuns = runs.data.map((run, idx) => {
                return (
                    <View key={idx} style={style.card}>
                        <TouchableOpacity
                            onPress={() => handleRedirectGame(run.game.data.id)}
                            style={style.cardImage}
                        >
                            <Image
                                source={{ uri: run.game.data.assets["cover-large"].uri }}
                                style={style.image}
                            />
                        </TouchableOpacity>
                        <View style={style.cardInfo}>
                            {players(run)}
                            {category(run.category.data.name)}
                            <Runtime time={run.times.primary_t} />
                        </View>
                    </View>
                )
            })
            return getRuns
        }
    }

    useEffect(() => {
        fetchRuns()
    }, [])

    return (
        <View style={style.container}>
            {loading ? <ActivityIndicator /> : allRuns()}
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
