import { useEffect, useState } from "react"
import { speedRunDotComGameService } from "@/services/speedrunDotCom"
import { StyleSheet, View, Text } from "react-native"
import { useGlobalSearchParams } from "expo-router"
import Header from "@/components/lib/Header"

interface Game {
    data: {
        id: string
        names: {
            international: string
        },
        discord: string
        "release-date": string,
        platforms: {
            data: [
                {
                    id: string,
                    name: string
                }
            ]
        },
        assets: {
            logo: {
                uri: string
            }
            "cover-tiny": {
                uri: string
            },
            "cover-small": {
                uri: string
            },
            "cover-medium": {
                uri: string
            },
            "cover-large": {
                uri: string
            },
            icon: {
                uri: string
            },
            "trophy-1st": {
                uri: string
            },
            "trophy-2nd": {
                uri: string
            },
            "trophy-3rd": {
                uri: string
            },
            background: {
                uri: string
            },
            foreground: {
                uri: string
            }
        }
    }
}

const OneGame = () => {
    const { id } = useGlobalSearchParams()

    const [game, setGame] = useState<Game>()

    const fetchGame = async () => {
        try {
            const result = await speedRunDotComGameService.getGame(id)
            setGame(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGame()
    }, [])

    return (
        <View style={style.container}>
            <Header backButton={true} title="" />
            <Text>{game?.data.names.international}</Text>
            <Text>{game?.data["release-date"]}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
    },
})

export default OneGame
