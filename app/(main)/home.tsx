import { View, Text, Button } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { userService } from "@/services/speedhub"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"

export default function Home() {
    const router = useRouter()
    const { user, logout } = useAuth()

    const userId = user?.userId
    const [data, setData] = useState(user)


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userId) {
                    const result = await userService.getOneUser(userId);
                    setData(result);
                }
            } catch (error) {
                console.log("Erreur de récupération de l'utilisateur :", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleLogout = async () => {
        await logout()
        router.replace("/(auth)")
    }

    return (
        <View>
            <Text>Welcome to the Home Screen {user?.pseudo}!</Text>
            <Button title="Log Out" onPress={handleLogout} />
        </View>
    )
}
