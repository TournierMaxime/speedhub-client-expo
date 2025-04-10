import { userService } from "@/services/speedhub"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { DataState } from "../auth/interface"
import AsyncStorage from "@react-native-async-storage/async-storage"

const useHandleUpdate = () => {
  const { user, setUser } = useAuth()
  const [data, setData] = useState<DataState>({
    pseudo: "",
    email: "",
    image: "",
  })

  const handleUpdateEmail = async () => {
    try {
      if (user?.userId) {
        await userService.updateUser(user?.userId, { email: data.email })

        const updatedUser = {
          ...user,
          email: data.email ?? "",
        }

        await AsyncStorage.setItem("user", JSON.stringify(updatedUser))

        setUser(updatedUser)
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
        const updatedUser = {
          ...user,
          pseudo: data.pseudo ?? "",
        }

        await AsyncStorage.setItem("user", JSON.stringify(updatedUser))

        setUser(updatedUser)
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

      let imageUriParts, fileType

      if (data.image) {
        imageUriParts = data.image.split(".")
        fileType = imageUriParts[imageUriParts.length - 1]
      }

      let file = {
        uri: data.image,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      }

      if (file) {
        formData.append("image", {
          uri: file.uri,
          name: file.name,
          type: file.type,
        } as any)
      }
      if (user?.userId) {
        await userService.updateUser(user?.userId, formData, data.image)

        const updatedUser = {
          ...user,
          image: data.image ?? "",
        }

        await AsyncStorage.setItem("user", JSON.stringify(updatedUser))

        setUser(updatedUser)
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
