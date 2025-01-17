import { View, Button, StyleSheet, ScrollView } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { userService } from "@/services/speedhub"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import Header from "@/components/lib/Header"
import AllRuns from "./sdc/runs/Runs"

const Home = () => {
    const router = useRouter()
    const { user, logout } = useAuth()

    const userId = user?.userId
    const [data, setData] = useState(user)

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
    }, [userId])

    const handleLogout = async () => {
        await logout()
        router.replace("/(auth)")
    }

    return (
        <ScrollView style={style.container}>
            <Header backButton={false} title="" />
            <AllRuns />
            <Button title="Log Out" onPress={handleLogout} />
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
    },
})

export default Home
