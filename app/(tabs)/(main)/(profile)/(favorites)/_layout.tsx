import { Stack } from "expo-router"

export default function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen name="games" options={{ headerShown: false }} />
      <Stack.Screen name="runners" options={{ headerShown: false }} />
      <Stack.Screen name="marathons" options={{ headerShown: false }} />
    </Stack>
  )
}
