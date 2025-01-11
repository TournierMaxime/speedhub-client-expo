import { useState } from "react"

interface DataState {
  email: string
  password: string
  pseudo: string
  expoPushToken?: string
}

const useHandleAuth = () => {
  const [data, setData] = useState<DataState>({
    email: "",
    password: "",
    pseudo: "",
    expoPushToken: "",
  })

  const [existingUser, setExistingUser] = useState<boolean>(false)

  const searchUser = toast(async () => {
    try {
      const response = await dispatch(
        searchUsers({
          email: data.email,
          page: 1,
          size: 1,
        })
      )
      if (response && response.users.length > 0) setExistingUser(true)
    } catch (error: any) {
      throw new Error(error.message)
    }
  })

  const handleLogin = toast(async () => {
    try {
      if (!data.email || !data.password) {
        throw new Error(t("errors.emailPasswordMissingOrInvalid"))
      }

      await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).then(() => {
        navigation.navigate("MainStackNavigator", {
          screen: "Home",
          params: {},
        })
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
    setData({
      email: "",
      password: "",
      pseudo: "",
    })
    return {
      toastMessage: t("actions.successfullyConnected"),
    }
  })

  const handleRegister = toast(async () => {
    try {
      const token = await registerForPushNotificationsAsync()

      if (!data.pseudo || !data.email || !data.password) {
        throw new Error("All fields are mandatory")
      }

      await dispatch(register({ ...data, lang, expoPushToken: token })).then(
        (response: any) => {
          navigation.navigate("ConfirmEmail", {
            userId: response.user.userId,
          })
        }
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
    setData({
      email: "",
      password: "",
      pseudo: "",
    })
    return {
      toastMessage: "Your account has been created",
    }
  })

  return {
    handleLogin,
    handleRegister,
    searchUser,
    data,
    setData,
    existingUser,
  }
}

export default useHandleAuth
