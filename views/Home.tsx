import { StyleSheet, ScrollView } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { userService } from "@/services/speedhub"
import { useEffect, useState } from "react"
import Header from "@/components/lib/Header"
import AllRuns from "./sdc/runs/Runs"

const Home = () => {
    const { user } = useAuth()

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

    return (
        <ScrollView style={style.container}>
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
