import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useColorScheme } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Utils from "@/components/lib/Utils"
import AntDesign from "@expo/vector-icons/AntDesign"

export default function TabsLayout() {
    const theme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "blue",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { height: Utils.moderateScale(40) },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="runs"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="run" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="marathons"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="calendar" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
