import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { authService } from "@/services/speedhub"

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

    useEffect(() => {
        const loadUserFromStorage = async () => {
            setIsLoading(true)
            try {
                const storedUser = await AsyncStorage.getItem("user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }
            } catch (error: any) {
                console.log("loadUserFromStorage", error);

                setIsLoading(false)
            } finally {
                setIsLoading(false)
            }
        }

        loadUserFromStorage()
    }, [])

    const login = async (data: Data) => {
        const connection = await authService.login(data)
        setUser(connection.user)
        await AsyncStorage.setItem("user", JSON.stringify(connection.user))
    }

    const logout = async () => {
        setUser(null)
        await AsyncStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
                isLoading
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
