import { useState } from "react"
import { profileService } from "@/services/speedrunDotCom"
import { DataState } from "./interface"
import { useAuth } from "@/contexts/AuthContext"
import useHandleRouter from "../utils/useHandleRouter"
import { userService, authService } from "@/services/speedhub"
import ROUTES from "@/components/routes"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"

const useHandleAuthSDC = () => {
  const [data, setData] = useState<DataState>({
    xApiKey: "",
  })
  const [isProcessingSDC, setIsProcessingSDC] = useState<boolean>(false)
  const { handleRedirect } = useHandleRouter()
  const { login } = useAuth()

  const loginWithSDC = async () => {
    setIsProcessingSDC(true)
    try {
      const sdc = await profileService.getProfile(
        data.xApiKey ?? "ahr93b9ke5z0i3flcw4x4d40f"
      )
      console.log(sdc)

      const users = await userService.searchUsers(
        { email: sdc.data.names.international },
        {
          page: 1,
          size: 1,
        }
      )

      if (users.users && users.users.length > 0) {
        const userId = users.users[0].userId

        await authService.login({ userId })
        await login({ userId })

        await handleRedirect(ROUTES.HOME)

        setIsProcessingSDC(false)
      } else {
        let token

        if (token) {
          token = await registerForPushNotificationsAsync()
        }

        const response = await authService.register({
          pseudo: `${sdc.data.names.international ?? ""}`,
          email: `change-your-email-${sdc.data.id}`,
          password: sdc.data.id,
          provider: "SDC",
          verified: true,
          expoPushToken: token ?? "",
          lang: "en",
        })

        authService.login({ userId: response.user.userId })
        await login({ userId: response.user.userId })

        await handleRedirect(ROUTES.HOME)

        setIsProcessingSDC(false)
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  return {
    loginWithSDC,
    data,
    setData,
    isProcessingSDC,
  }
}

export default useHandleAuthSDC
