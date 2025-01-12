import { useState } from "react"
import { toast } from "@/components/lib/toast"
import { useRouter } from "expo-router"
import { authService } from "@/services/speedhub"

type FormData = {
  [key: string]: any
}

interface HandleConfirmEmailProps {
  userId: string
}

const useHandleConfirmEmail = ({ userId }: HandleConfirmEmailProps) => {
  const router = useRouter()

  const [data, setData] = useState<FormData>({ verificationCode: null })

  const handleConfirmEmail = toast(async () => {
    try {
      await authService.confirmEmail(userId, data)

      await authService.login({ userId })
      router.push({
        pathname: "/(main)/home",
      })
    } catch (error: any) {
      throw new Error(error.response.data.errMsg)
    }
    setData({
      verificationCode: null,
    })
    return {
      toastMessage: "Your account has been successfully verified",
    }
  })

  return {
    handleConfirmEmail,
    data,
    setData,
  }
}

export default useHandleConfirmEmail
