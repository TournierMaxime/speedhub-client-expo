import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function Profile() {
    const { user, logout, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login"); // Redirige si l'utilisateur n'est pas connecté
        }
    }, [isAuthenticated]);

    const handleLogout = async () => {
        await logout();
        router.replace("/login"); // Redirige après déconnexion
    };

    return (
        <View>
            <Text>Welcome, {user?.username}!</Text>
            <Button title="Log Out" onPress={handleLogout} />
        </View>
    );
}