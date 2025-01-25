import { Tabs } from "expo-router"
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons"
import Utils from "@/components/lib/Utils"

export default function TabsLayout() {
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
      <Tabs.Screen
        name="reddits"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="(main)" options={{ href: null }} />
    </Tabs>
  )
}
