import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin"
import { useState } from "react"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import ROUTES from "@/components/routes"
import useHandleRouter from "../utils/useHandleRouter"
import { userService } from "@/services/speedhub"
import { authService } from "@/services/speedhub"
import { useAuth } from "@/contexts/AuthContext"

const useHandleAuthGoogle = () => {
  const { handleRedirect } = useHandleRouter()
  const { login } = useAuth()

  const [isProcessing, setIsProcessing] = useState(false)

  const loginWithGoogle = async () => {
    setIsProcessing(true)
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      console.log("response", response)

      if (isSuccessResponse(response)) {
        const data = response.data
        const email = data.user.email.toString()

        console.log("email", email)

        const users = await userService.searchUsers(
          { email: email },
          { page: 1, size: 1 }
        )

        console.log("users", users)

        if (users.users && users.users.length > 0) {
          const userId = users.users[0].userId

          await authService.login({ userId })
          await login({ userId })

          await handleRedirect(ROUTES.HOME)

          setIsProcessing(false)
        } else {
          let token

          if (token) {
            token = await registerForPushNotificationsAsync()
          }

          const response = await authService.register({
            pseudo: data.user.name,
            email: data.user.email,
            password: data.user.id,
            image: data.user.photo,
            provider: "Google",
            verified: true,
            expoPushToken: token,
            lang: "en",
          })

          authService.login({ userId: response.user.userId })
          await login({ userId: response.user.userId })

          await handleRedirect(ROUTES.HOME)

          setIsProcessing(false)
        }
      } // else if (isNoSavedCredentialFoundResponse(response)) {
      // Android and Apple only.
      // No saved credential found (user has not signed in yet, or they revoked access)
      // call `createAccount()`
      // }
    } catch (error: any) {
      setIsProcessing(false)
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // Android-only, you probably have hit rate limiting.
            // You can still call `presentExplicitSignIn` in this case.
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android: play services not available or outdated.
            // Get more details from `error.userInfo`.
            // Web: when calling an unimplemented api (requestAuthorization)
            // or when the Google Client Library is not loaded yet.
            break
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
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
