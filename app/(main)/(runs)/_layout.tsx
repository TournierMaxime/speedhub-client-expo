import { Stack } from "expo-router";

export default function RunLayout() {
    return (
        <Stack>
            <Stack.Screen name="run" options={{ headerShown: false }} />
        </Stack>
    );
}