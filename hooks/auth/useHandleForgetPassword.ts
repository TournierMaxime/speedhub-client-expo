import { useState } from "react"
import { toast } from "@/components/lib/toast"
import { useRouter } from "expo-router"
import { authService } from "@/services/speedhub"
import { DataState } from "./interface"
import { useAuth } from "@/contexts/AuthContext"

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

  const handleForgetPassword = toast(async () => {
    try {
      await authService.forgetPasswordMobile({ email: data.email, lang: "en" })
      setStep(2)
    } catch (error: any) {
      console.log("handleForgetPassword", error)
      throw new Error(error.response.data.errMsg)
    }
    return {
      toastMessage: "An email has been sent to you containing a 6 digit code",
    }
  })

  const handleCheckForgetPasswordCode = toast(async () => {
    try {
      await authService.checkForgetPasswordCodeMobile({
        email: data.email,
        code: data.code,
      })

      setStep(3)
    } catch (error: any) {
      console.log("handleCheckForgetPasswordCode", error)
      throw new Error(error.response.data.errMsg)
    }
    setData({
      ...data,
      code: "",
    })
    return {
      toastMessage: "Your verification code has been validated",
    }
  })

  const handleResetPassword = toast(async () => {
    try {
      const response = await authService.resetPasswordMobile({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      authService.login({ userId: response.userId })
      await login({ email: data.email ?? "", password: data.password ?? "" })
      router.push({ pathname: "/(main)/home" })
    } catch (error: any) {
      console.log("handleResetPassword", error)

      throw new Error(error.response.data.errMsg)
    }
    setData({
      ...data,
      password: "",
      confirmPassword: "",
    })
    return {
      toastMessage: "Your password has been successfully reset",
    }
  })

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
