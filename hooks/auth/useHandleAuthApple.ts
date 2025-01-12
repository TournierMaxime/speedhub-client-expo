import * as AppleAuthentication from "expo-apple-authentication"
import { useState } from "react"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import { toast } from "@/components/lib/toast"
import { authService } from "@/services/speedhub"
import { userService } from "@/services/speedhub"
import { useRouter } from "expo-router"

const useHandleAuthApple = () => {
  const [isProcessingApple, setIsProcessingApple] = useState<boolean>(false)
  const router = useRouter()

  const onAppleButtonPress = toast(async () => {
    setIsProcessingApple(true)
    let users
    try {
      const credential: AppleAuthentication.AppleAuthenticationCredential =
        await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        })

      if (!credential.identityToken) {
        throw new Error("No identity token returned from Apple Sign In")
      }

      const appleToken = await authService.verifyAppleToken({
        identityToken: credential.identityToken,
      })

      if (appleToken) {
        users = await userService.searchUsers(
          { email: appleToken.decodedToken.email },
          {
            page: 1,
            size: 1,
          }
        )
      }

      if (users.users && users.users.length > 0) {
        const userId = users.users[0].userId

        await authService.login({ userId })

        router.push({
          pathname: "/(main)/home",
        })

        setIsProcessingApple(false)
      } else {
        const token = await registerForPushNotificationsAsync()
        const response = await authService.register({
          pseudo: `${credential.fullName?.givenName ?? ""} ${
            credential.fullName?.familyName ?? ""
          }`,
          email: appleToken.decodedToken.email,
          password: credential.user,
          provider: "Apple",
          verified: true,
          expoPushToken: token,
          lang: "en",
        })

        authService.login({ userId: response.user.userId })

        router.push({
          pathname: "/(main)/home",
        })

        setIsProcessingApple(false)
      }
    } catch (error: any) {
      setIsProcessingApple(false)
      throw new Error(error.message)
    }
    return {
      toastMessage: "You are now logged with your Apple account",
    }
  })

  return {
    onAppleButtonPress,
    isProcessingApple,
  }
}

export default useHandleAuthApple
