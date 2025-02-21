import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack, useRouter } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import "react-native-reanimated"
import { AuthProvider, useAuth } from "../contexts/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useColorScheme } from "@/hooks/useColorScheme"
import ToastManager from "toastify-react-native"
import Utils from "@/components/lib/Utils"
import { ActivityIndicator } from "react-native"
import { Colors } from "@/constants/Colors"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const queryClient = new QueryClient()

  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    const config = GoogleSignin.configure({
      webClientId:
        "725923225701-m2nejmr6c26kbslbr9vpgoplt0mok483.apps.googleusercontent.com",
      iosClientId:
        "725923225701-o7lln8hsuklrhofcrh4qh2752unhfhah.apps.googleusercontent.com",
    })
    console.log("config", config)
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastManager
          width={Utils.moderateScale(350)}
          height={Utils.moderateScale(100)}
          showCloseIcon={false}
        />
        <ThemeProvider
          value={colorScheme === "light" ? DefaultTheme : DarkTheme}
        >
          <Navigation />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

function Navigation() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const theme = useColorScheme()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/(tabs)/home")
    } else if (!isLoading && !isAuthenticated) {
      router.push("/(auth)/login")
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor:
            theme === "dark" ? Colors.dark.background : Colors.light.background,
        },
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
