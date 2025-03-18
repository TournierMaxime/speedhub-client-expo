import { Stack } from "expo-router"

export default function MainLayout() {
  return (
    <Stack initialRouteName="(marathon)">
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="(marathon)" options={{ headerShown: false }} />
      <Stack.Screen name="(games)" options={{ headerShown: false }} />
      <Stack.Screen name="(reddit)" options={{ headerShown: false }} />
    </Stack>
  )
}
