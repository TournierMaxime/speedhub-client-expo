import { useState } from "react"
import { toast } from "@/components/lib/toast"
import { useRouter } from "expo-router"
import { authService } from "@/services/speedhub"

type FormData = {
  [key: string]: any
}

const useHandleForgetPassword = () => {
  const router = useRouter()

  const [step, setStep] = useState<number>(1)

  const [data, setData] = useState<FormData>({
    email: "",
    code: null,
    password: "",
    confirmPassword: "",
  })

  const handleForgetPassword = toast(async () => {
    try {
      await authService.forgetPasswordMobile({ email: data.email })
      setStep(2)
    } catch (error: any) {
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
      throw new Error(error.response.data.errMsg)
    }
    setData({
      ...data,
      code: null,
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
      router.push({ pathname: "/(main)/home" })
    } catch (error: any) {
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
