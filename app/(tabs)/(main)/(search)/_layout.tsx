import { Stack } from "expo-router"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function SearchLayout() {
  const theme = useColorScheme()
  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
