import { useState } from "react"
import { useRouter } from "expo-router"
import { authService } from "@/services/speedhub"
import useHandleToast from "../utils/useHandleToast"

type FormData = {
  [key: string]: any
}

interface HandleConfirmEmailProps {
  userId: string | string[]
}

const useHandleConfirmEmail = ({ userId }: HandleConfirmEmailProps) => {
  const router = useRouter()

  const [data, setData] = useState<FormData>({ verificationCode: null })

  const { handleError, handleSuccess } = useHandleToast()

  const handleConfirmEmail = async () => {
    try {
      await authService.confirmEmail(userId, data)

      await authService.login({ userId })
      router.push({
        pathname: "/(main)/home",
      })
      setData({
        verificationCode: null,
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
