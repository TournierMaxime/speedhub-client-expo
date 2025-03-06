import { useState } from "react"
import {
  authService as authSdc,
  userService as userSdc,
} from "@/services/speedrunDotCom"
import { DataState } from "./interface"
import { useAuth } from "@/contexts/AuthContext"
import useHandleRouter from "../utils/useHandleRouter"
import { userService, authService } from "@/services/speedhub"
import ROUTES from "@/components/routes"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import useHandleToast from "../utils/useHandleToast"

const useHandleAuthSDC = () => {
  const [data, setData] = useState<DataState>({
    name: "",
    password: "",
    token: "",
  })
  const [step, setStep] = useState<"LOGIN" | "TOKEN" | "FINALIZE">("LOGIN")
  const [isProcessingSDC, setIsProcessingSDC] = useState<boolean>(false)
  const { handleRedirect } = useHandleRouter()
  const { login } = useAuth()
  const { handleSuccess, handleError } = useHandleToast()

  const handleAuthSDC = async () => {
    setIsProcessingSDC(true)
    try {
      switch (step) {
        case "LOGIN": {
          const sdc = await authSdc.putAuthLogin({
            name: data.name,
            password: data.password,
          })

          if (sdc.loggedIn === false && sdc.tokenChallengeSent === true) {
            setStep("TOKEN")
            setIsProcessingSDC(false)
            return
          }

          setStep("FINALIZE")
          break
        }

        case "TOKEN": {
          if (!data.token) {
            handleError("Please enter the verification token.")
            setIsProcessingSDC(false)
            return
          }

          const sdcVerify = await authSdc.putAuthLogin({
            name: data.name,
            password: data.password,
            token: data.token,
          })

          if (!sdcVerify.loggedIn) {
            handleError("Incorrect or expired token.")
            setIsProcessingSDC(false)
            return
          }

          setStep("FINALIZE")
          break
        }

        case "FINALIZE": {
          const users = await userService.searchUsers(
            { pseudo: data.name },
            { page: 1, size: 1 }
          )

          if (users.users && users.users.length > 0) {
            const userId = users.users[0].userId
            await authService.login({ userId })
            await login({ userId })
            await handleRedirect(ROUTES.HOME)
          } else {
            let token, sdcUser
            if (token) {
              token = await registerForPushNotificationsAsync()
            }

            if (data.name) {
              sdcUser = await userSdc.getUser(data.name ?? "")
            }

            const response = await authService.register({
              pseudo: `${data.name ?? ""}`,
              email: `change-your-email-${data.name}`,
              password: data.password,
              provider: "SDC",
              verified: true,
              expoPushToken: token ?? "",
              lang: "en",
              image: sdcUser?.data?.assets?.image?.uri ?? null,
            })

            await authService.login({ userId: response.user.userId })
            await login({ userId: response.user.userId })
            await handleRedirect(ROUTES.HOME)
          }

          return
        }

        default:
          throw new Error("Unknown step")
      }
    } catch (error: any) {
      console.log(error)
      handleError(error.message || "An error occurred")
    } finally {
      setIsProcessingSDC(false)
    }
  }

  return {
    handleAuthSDC,
    data,
    setData,
    isProcessingSDC,
    step,
  }
}

export default useHandleAuthSDC
