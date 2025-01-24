import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme"

export default function SearchLayout() {
    const theme = useColorScheme()
    return (
        <Stack screenOptions={{
            contentStyle: {
                backgroundColor: theme === "dark" ? Colors.dark.background : Colors.light.background
            }
        }}>
            <Stack.Screen name="search" options={{
                headerShown: false
            }} />
        </Stack>
    );
}