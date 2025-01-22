import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <Stack initialRouteName="oneMarathonLive">
            <Stack.Screen name="oneMarathonLive" options={{ headerShown: false }} />
            <Stack.Screen name="oneMarathonUpcoming" options={{ headerShown: false }} />
        </Stack>
    );
}