import { Tabs } from "expo-router"
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons"
import Utils from "@/components/lib/Utils"
import { Platform } from "react-native"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:
          Platform.OS === "ios"
            ? { height: Utils.moderateScale(60) }
            : { height: Utils.moderateScale(40) },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              color={color}
              size={Utils.moderateScale(18)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="runs"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="run"
              size={Utils.moderateScale(18)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="marathons"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="calendar"
              size={Utils.moderateScale(18)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reddits"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="newspaper-outline"
              size={Utils.moderateScale(18)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="(main)" options={{ href: null }} />
    </Tabs>
  )
}
