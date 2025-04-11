import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin"
import { useState } from "react"
import useHandleRouter from "../utils/useHandleRouter"
import { useAuth } from "@/contexts/AuthContext"
import { userService, authService } from "@/services/speedhub"
import ROUTES from "@/components/routes"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import * as Device from "expo-device"
import { getDeviceType } from "@/utils/getDeviceType"

const useHandleAuthGoogle = () => {
  const { handleRedirect } = useHandleRouter()
  const { login } = useAuth()

  const [isProcessingGoogle, setIsProcessingGoogle] = useState<boolean>(false)

  const signIn = async () => {
    setIsProcessingGoogle(true)
    let users

    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        users = await userService.searchUsers(
          { email: response.data.user.email },
          {
            page: 1,
            size: 1,
          }
        )

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

          setIsProcessingGoogle(false)
        } else {
          let token

          if (token) {
            token = await registerForPushNotificationsAsync()
          }

          const register = await authService.register({
            pseudo: response.data.user.name,
            email: response.data.user.email,
            password: response.data.user.id,
            provider: "Google",
            verified: true,
            expoPushToken: token ?? "",
            lang: "en",
            image: response.data.user.photo,
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

          setIsProcessingGoogle(false)
        }
      } else {
        // sign in was cancelled by user
        console.warn("Google sign-in annulé")
      }
    } catch (error) {
      console.error("Erreur Google sign-in :", error)

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.warn("Connexion déjà en cours")
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.warn("Google Play Services non dispo")
            break
          default:
            console.warn("Erreur inconnue", error)
        }
      } else {
        console.warn("Erreur non liée à Google Signin")
      }
    } finally {
      setIsProcessingGoogle(false) // ✅ TOUJOURS à la fin
    }
  }
  return {
    signIn,
    isProcessingGoogle,
  }
}

export default useHandleAuthGoogle
