import { useState } from "react"
import { useRouter } from "expo-router"
import { authService } from "@/services/speedhub"
import { DataState } from "./interface"
import { useAuth } from "@/contexts/AuthContext"
import useHandleToast from "../utils/useHandleToast"

const useHandleForgetPassword = () => {
  const router = useRouter()

  const { login } = useAuth()

  const [step, setStep] = useState<number>(1)

  const [data, setData] = useState<DataState>({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  })

  const { handleError, handleSuccess } = useHandleToast()

  const handleForgetPassword = async () => {
    try {
      await authService.forgetPasswordMobile({ email: data.email, lang: "en" })
      setStep(2)
      handleSuccess("An email has been sent to you containing a 6 digit code")
    } catch (error: any) {
      handleError(error)
    }
  }

  const handleCheckForgetPasswordCode = async () => {
    try {
      await authService.checkForgetPasswordCodeMobile({
        email: data.email,
        code: data.code,
      })
      setData({
        ...data,
        code: "",
      })
      setStep(3)
      handleSuccess("Your verification code has been validated")
    } catch (error: any) {
      handleError(error)
    }
  }

  const handleResetPassword = async () => {
    try {
      const response = await authService.resetPasswordMobile({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      authService.login({ userId: response.userId })
      await login({ email: data.email ?? "", password: data.password ?? "" })
      router.push({ pathname: "/(main)/home" })

      setData({
        ...data,
        password: "",
        confirmPassword: "",
      })
      handleSuccess("Your password has been successfully reset")
    } catch (error: any) {
      handleError(error)
    }
  }

  return {
    handleForgetPassword,
    handleResetPassword,
    handleCheckForgetPasswordCode,
    step,
    data,
    setData,
  }
}

export default useHandleForgetPassword
