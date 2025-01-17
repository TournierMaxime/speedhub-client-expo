import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="(games)" options={{ headerShown: false }} />
    </Stack>
  );
}