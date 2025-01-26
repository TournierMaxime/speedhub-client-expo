import { Stack } from "expo-router"

export default function RedditLayout() {
  return (
    <Stack>
      <Stack.Screen name="reddit" options={{ headerShown: false }} />
    </Stack>
  )
}
