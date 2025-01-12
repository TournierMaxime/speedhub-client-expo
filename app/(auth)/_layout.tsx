import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack initialRouteName="login">
            <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
            <Stack.Screen name="register" options={{ headerTitle: "Register" }} />
            <Stack.Screen name="confirm-email" options={{ headerTitle: "ConfirmEmail" }} />
        </Stack>
    );
}