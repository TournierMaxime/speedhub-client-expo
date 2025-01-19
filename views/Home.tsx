import { StyleSheet, ScrollView } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { userService } from "@/services/speedhub"
import { useEffect, useState } from "react"
import Header from "@/components/lib/Header"
import AllRuns from "./sdc/runs/Runs"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

const Home = () => {
    const { user } = useAuth()

    const userId = user?.userId
    const [data, setData] = useState(user)

    const theme = useColorScheme() ?? "light";

    const fetchUserData = async () => {
        try {
            if (userId) {
                const result = await userService.getOneUser(userId)
                setData(result)
            }
        } catch (error) {
            console.log("Erreur de récupération de l'utilisateur :", error)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [userId, theme])

    return (
        <ScrollView style={[style.container, theme === "dark" ? { backgroundColor: Colors.dark.background } : { backgroundColor: Colors.light.background }]}>
            <Header backButton={false} title="" />
            <AllRuns />
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
    },
})

export default Home
