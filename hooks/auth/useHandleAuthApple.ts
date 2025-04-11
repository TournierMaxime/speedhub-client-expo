import * as AppleAuthentication from "expo-apple-authentication"
import { useState } from "react"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import { authService } from "@/services/speedhub"
import { userService } from "@/services/speedhub"
import ROUTES from "@/components/routes"
import useHandleRouter from "../utils/useHandleRouter"
import { useAuth } from "@/contexts/AuthContext"
import * as Device from "expo-device"
import { getDeviceType } from "@/utils/getDeviceType"

const useHandleAuthApple = () => {
  const [isProcessingApple, setIsProcessingApple] = useState<boolean>(false)
  const { handleRedirect } = useHandleRouter()
  const { login } = useAuth()

  const onAppleButtonPress = async () => {
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

      if (users && users.length > 0) {
        const userId = users[0].userId

        await authService.login({ userId }).then(async (l) => {
          await authService.createDevice(l.authAccessTokenId, {
            authAccessTokenId: l.authAccessTokenId,
            brand: Device.brand,
            deviceType: getDeviceType(Device.deviceType ?? 0),
            manufacturer: Device.manufacturer,
            modelName: Device.modelName,
            osName: Device.osName,
            osVersion: Device.osVersion,
            osBuildId: Device.osBuildId,
            osInternalBuildId: Device.osInternalBuildId,
          })
          return l
        })

        await login({ userId })

        await handleRedirect(ROUTES.HOME)

        setIsProcessingApple(false)
      } else {
        let token

        if (token) {
          token = await registerForPushNotificationsAsync()
        }

        const register = await authService.register({
          pseudo: `${credential.fullName?.givenName ?? ""} ${
            credential.fullName?.familyName ?? ""
          }`,
          email: appleToken.decodedToken.email,
          password: credential.user,
          provider: "Apple",
          verified: true,
          expoPushToken: token ?? "",
          lang: "en",
        })

        await authService
          .login({
            userId: register.user.userId,
          })
          .then(async (l) => {
            await authService.createDevice(l.authAccessTokenId, {
              authAccessTokenId: l.authAccessTokenId,
              brand: Device.brand,
              deviceType: getDeviceType(Device.deviceType ?? 0),
              manufacturer: Device.manufacturer,
              modelName: Device.modelName,
              osName: Device.osName,
              osVersion: Device.osVersion,
              osBuildId: Device.osBuildId,
              osInternalBuildId: Device.osInternalBuildId,
            })
            return l
          })

        await login({ userId: register.user.userId })

        await handleRedirect(ROUTES.HOME)

        setIsProcessingApple(false)
      }
    } catch (error: any) {
      setIsProcessingApple(false)
      throw new Error(error.message)
    }
    return {
      toastMessage: "You are now logged with your Apple account",
    }
  }

  return {
    onAppleButtonPress,
    isProcessingApple,
  }
}

export default useHandleAuthApple
