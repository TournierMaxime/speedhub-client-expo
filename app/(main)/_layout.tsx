import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="home" />
    </Stack>
  );
}