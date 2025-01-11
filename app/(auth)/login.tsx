import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { View, Text, Button } from "react-native";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        const user = { email: "tourniermaxime@orange.fr", password: "Jslogcndmenptein@06" };

        await login(user); // Simule la connexion
        router.replace("/(main)"); // Redirige vers la page principale
    };

    return (
        <View>
            <Text>Login Screen</Text>
            <Button title="Log In" onPress={handleLogin} />
        </View>
    );
}