import { useState } from "react"
import { authService, userService } from "@/services/speedhub"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import { useRouter } from "expo-router"
import { toast } from "@/components/lib/toast"

interface DataState {
  email: string
  password: string
  pseudo: string
  expoPushToken?: string
}

const router = useRouter()

const useHandleAuth = () => {
  const [data, setData] = useState<DataState>({
    email: "",
    password: "",
    pseudo: "",
    expoPushToken: "",
  })

  const [existingUser, setExistingUser] = useState<boolean>(false)

  const searchUser = toast(async () => {
    try {
      const response = await userService.searchUsers(
        { email: data.email },
        {
          page: 1,
          size: 1,
        }
      )

      if (response && response.users.length > 0) setExistingUser(true)
    } catch (error: any) {
      throw new Error(error.message)
    }
  })

  const handleLogin = toast(async () => {
    try {
      if (!data.email || !data.password) {
        throw new Error("Email/Password missing or invalid")
      }

      await authService.login({ email: data.email, password: data.password })
    } catch (error: any) {
      throw new Error(error.message)
    }
    setData({
      email: "",
      password: "",
      pseudo: "",
    })
    return {
      toastMessage: "Successfully connected",
    }
  })

  const handleRegister = toast(async () => {
    try {
      const token = await registerForPushNotificationsAsync()

      if (!data.pseudo || !data.email || !data.password) {
        throw new Error("All fields are mandatory")
      }

      const response = await authService.register({
        ...data,
        expoPushToken: token,
      })

      router.push({
        pathname: "/(auth)/confirm-email",
        params: {
          userId: response.user.userId,
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
    setData({
      email: "",
      password: "",
      pseudo: "",
    })
    return {
      toastMessage: "Your account has been created",
    }
  })

  return {
    handleLogin,
    handleRegister,
    searchUser,
    data,
    setData,
    existingUser,
  }
}

export default useHandleAuth
