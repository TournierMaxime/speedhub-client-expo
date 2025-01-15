import { authorize, AuthConfiguration } from "react-native-app-auth"
import axios from "axios"
import { useState } from "react"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import { useRouter } from "expo-router"
import { userService } from "@/services/speedhub"
import { authService } from "@/services/speedhub"

const useHandleAuthGoogle = () => {
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)

  const config: AuthConfiguration = {
    issuer: "https://accounts.google.com",
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID || "",
    redirectUrl: process.env.GOOGLE_REDIRECT_URI || "",
    scopes: ["openid", "profile", "email"],
    serviceConfiguration: {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    },
  }

  const loginWithGoogle = async () => {
    setIsProcessing(true)
    try {
      const result = await authorize(config)
      const { accessToken } = result

      /*       const refreshedState = await refresh(config, {
        refreshToken: result.refreshToken,
      })

   
      await revoke(config, {
        tokenToRevoke: refreshedState.refreshToken,
      }) */

      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const userData = response.data
      const email = userData.email.toString()

      const users = await userService.searchUsers(
        { email: email },
        { page: 1, size: 1 }
      )

      if (users.users && users.users.length > 0) {
        const userId = users.users[0].userId

        await authService.login({ userId })

        router.push({ pathname: "/(main)/home" })

        setIsProcessing(false)
      } else {
        const token = await registerForPushNotificationsAsync()
        const response = await authService.register({
          pseudo: userData.name,
          email: userData.email,
          password: userData.sub,
          image: userData.picture,
          provider: "Google",
          verified: true,
          expoPushToken: token,
          lang: "en",
        })

        authService.login({ userId: response.user.userId })

        router.push({ pathname: "/(main)/home" })

        setIsProcessing(false)
      }
    } catch (error: any) {
      setIsProcessing(false)
      throw new Error(error)
    }
    return {
      toastMessage: "You are now logged with your Google account",
    }
  }

  return {
    loginWithGoogle,
    isProcessing,
  }
}

export default useHandleAuthGoogle
