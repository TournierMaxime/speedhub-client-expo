import { Stack } from "expo-router"

export default function MainLayout() {
  return (
    <Stack initialRouteName="user">
      <Stack.Screen name="user" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="update-username" options={{ headerShown: false }} />
      <Stack.Screen name="update-avatar" options={{ headerShown: false }} />
    </Stack>
  )
}
