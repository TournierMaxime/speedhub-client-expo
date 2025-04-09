import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { authService } from "@/services/speedhub"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
/* import { speedHubApi } from "@/services/axios" */

interface Data {
  email?: string
  password?: string
  userId?: string | string[]
}

interface User {
  userId: string
  pseudo: string
  email: string
  image: string
  expoPushToken: string
  provider: string
}

interface AuthContextProps {
  user: User | null
  login: (data: Data) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string>("")

  const { handleReplace } = useHandleRouter()

  useEffect(() => {
    const loadUserFromStorage = async () => {
      setIsLoading(true)
      try {
        const storedUser = await AsyncStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
        const storedToken = await AsyncStorage.getItem("access_token")
        if (storedToken) {
          setAccessToken(JSON.parse(storedToken))
        }
      } catch (error: any) {
        console.log("loadUserFromStorage", error)

        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserFromStorage()
  }, [])

  useEffect(() => {
    const verifySession = async () => {
      setIsLoading(true)
      try {
        await authService.verifyToken(accessToken)
      } catch (error: any) {
        console.log(
          "🔴 Session expirée, redirection vers la connexion.",
          error.message
        )
        await handleReplace(ROUTES.AUTH)
        await logout()
      }
      setIsLoading(false)
    }

    verifySession()
  }, [])

  /*   speedHubApi.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          await speedHubApi.post("/auth/refresh-token")
          return speedHubApi(originalRequest)
        } catch (refreshErr) {
          console.log("🔒 Session expirée totalement")
          // Redirect user to login page or reset auth state
        }
      }

      return Promise.reject(error)
    }
  ) */

  const login = async (data: Data) => {
    const connection = await authService.login(data)
    setUser(connection.user)
    setAccessToken(connection.token)
    await AsyncStorage.setItem("user", JSON.stringify(connection.user))
    await AsyncStorage.setItem("access_token", JSON.stringify(connection.token))
  }

  const logout = async () => {
    setUser(null)
    await authService.logout()
    await AsyncStorage.removeItem("user")
    await AsyncStorage.removeItem("access_token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
