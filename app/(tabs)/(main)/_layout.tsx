import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack initialRouteName="(runs)">
      <Stack.Screen name="(runs)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="(search)" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="(marathon)" options={{ headerShown: false }} />
      <Stack.Screen name="(games)" options={{ headerShown: false }} />
    </Stack>
  );
}