import { userService } from "@/services/speedhub"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { DataState } from "../auth/interface"

const useHandleUpdate = () => {
  const { user } = useAuth()
  const [data, setData] = useState<DataState>({
    pseudo: "",
    email: "",
    image: "",
  })

  const handleUpdateEmail = async () => {
    try {
      if (user?.userId) {
        await userService.updateUser(user?.userId, { email: data.email })
      }
    } catch (error: any) {
      console.error(error.message)
    }
    setData({
      pseudo: "",
      email: "",
      image: "",
    })
  }

  const handleUpdateUsername = async () => {
    try {
      if (user?.userId) {
        await userService.updateUser(user?.userId, { pseudo: data.pseudo })
      }
    } catch (error: any) {
      console.error(error.message)
    }
    setData({
      pseudo: "",
      email: "",
      image: "",
    })
  }

  const handleUpdateAvatar = async () => {
    try {
      const formData = new FormData()

      if (data.image) formData.append("image", data.image)
      if (user?.userId) {
        await userService.updateUser(
          user?.userId,
          { image: data.image },
          data.image
        )
      }
    } catch (error: any) {
      console.error(error.message)
    }
    setData({
      pseudo: "",
      email: "",
      image: "",
    })
  }
  return {
    handleUpdateAvatar,
    handleUpdateUsername,
    handleUpdateEmail,
    data,
    setData,
  }
}

export default useHandleUpdate
