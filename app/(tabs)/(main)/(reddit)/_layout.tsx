import { Stack } from "expo-router"

export default function RedditLayout() {
  return (
    <Stack>
      <Stack.Screen name="reddits" options={{ headerShown: false }} />
    </Stack>
  )
}
