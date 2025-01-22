import { useState } from "react"
import { useGlobalSearchParams } from "expo-router"
import { authService } from "@/services/speedhub"
import useHandleToast from "../utils/useHandleToast"
import { DataState } from "./interface"
import { useAuth } from "@/contexts/AuthContext"
import ROUTES from "@/components/routes"
import useHandleRouter from "../utils/useHandleRouter"

const useHandleConfirmEmail = () => {
  const { handleRedirect } = useHandleRouter()
  const { userId } = useGlobalSearchParams()

  const { login } = useAuth()

  const [data, setData] = useState<DataState>({ verificationCode: "" })

  const { handleError, handleSuccess } = useHandleToast()

  const handleConfirmEmail = async () => {
    try {
      await authService.confirmEmail(userId, {
        verificationCode: data.verificationCode,
      })

      await authService.login({ userId })

      await handleRedirect(ROUTES.HOME)

      await login({ userId })

      setData({
        verificationCode: "",
      })
      handleSuccess("Your account has been successfully verified")
    } catch (error: any) {
      handleError(error)
    }
  }

  return {
    handleConfirmEmail,
    data,
    setData,
  }
}

export default useHandleConfirmEmail
