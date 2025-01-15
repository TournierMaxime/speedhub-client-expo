import { useState } from "react"
import { authService, userService } from "@/services/speedhub"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import { useRouter } from "expo-router"
import { useAuth } from "@/contexts/AuthContext"
import { DataState } from "./interface"
import useHandleToast from "../utils/useHandleToast"

const useHandleAuth = () => {
  const router = useRouter()
  const { login } = useAuth()

  const [data, setData] = useState<DataState>({
    email: "",
    password: "",
    pseudo: "",
    expoPushToken: "",
    lang: "",
  })

  const [existingUser, setExistingUser] = useState<boolean>(false)

  const { handleError, handleSuccess } = useHandleToast()

  const searchUser = async () => {
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
      handleError(error)
    }
  }

  const handleLogin = async () => {
    try {
      if (!data.email || !data.password) {
        handleError("Email/Password missing or invalid")
      }

      await authService.login({ email: data.email, password: data.password })
      await login({ email: data.email ?? "", password: data.password ?? "" })
      handleSuccess("Successfully connected")
      setData({
        email: "",
        password: "",
        pseudo: "",
      })
    } catch (error: any) {
      handleError(error)
    }
  }

  const handleRegister = async () => {
    try {
      const token = await registerForPushNotificationsAsync()

      if (!data.pseudo || !data.email || !data.password || !data.lang) {
        handleError("All fields are mandatory")
      }

      const response = await authService.register({
        ...data,
        expoPushToken: token,
        lang: "en",
      })

      router.push({
        pathname: "/(auth)/confirm-email",
        params: {
          userId: response.user.userId,
        },
      })
      handleSuccess("Your account has been created")
      setData({
        email: "",
        password: "",
        pseudo: "",
      })
    } catch (error: any) {
      handleError(error)
    }
  }

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
