import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack initialRouteName="login">
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="confirm-email" options={{ headerShown: false }} />
            <Stack.Screen name="forget-password" options={{ headerShown: false }} />
        </Stack>
    );
}