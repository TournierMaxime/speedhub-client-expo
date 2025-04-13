import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { authService, userService } from "@/services/speedhub"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import moment from "moment"
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
  setUser: React.Dispatch<React.SetStateAction<User | null>>
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
        if (user) {
          const getOneAccessToken = await userService.getOneAccessToken(
            user.userId,
            accessToken
          )

          if (getOneAccessToken.token !== accessToken) {
            await handleReplace(ROUTES.AUTH)
            await logout()
          }

          if (
            getOneAccessToken.revoked === true ||
            getOneAccessToken.isExpired === true
          ) {
            await handleReplace(ROUTES.AUTH)
            await logout()
          }

          const now = moment()
          const expiresIn = moment(getOneAccessToken.expiresIn)

          const diffInMinutes = expiresIn.diff(now, "minutes")

          if (diffInMinutes <= 5) {
            await authService.verifyToken(accessToken)
          }
        }
      } catch (error: any) {
        await handleReplace(ROUTES.AUTH)
        await logout()
      }
      setIsLoading(false)
    }

    verifySession()
  }, [])

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
        setUser,
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
