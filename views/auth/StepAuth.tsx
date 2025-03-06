import React, { Fragment, useEffect, useState, useCallback } from "react"
import useHandleAuth from "@/hooks/auth/useHandleAuth"
import Utils from "@/components/lib/Utils"
import { userService } from "@/services/speedhub"
import { Text, ActivityIndicator, View } from "react-native"
import {
  FormButtonSubmit,
  FormInputText,
} from "@/components/lib/FormValidation"

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const StepAuth = () => {
  const {
    handleLogin,
    handleRegister,
    searchUser,
    existingUser,
    data,
    setData,
  } = useHandleAuth()

  const [step, setStep] = useState(1)
  const [checkPseudo, setCheckPseudo] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const isPseudoExist = useCallback(async (pseudo: string) => {
    setLoading(true)
    try {
      const response = await userService.searchUsers(
        { pseudo },
        { page: 1, size: 1 }
      )
      setCheckPseudo(
        response.users.length > 0 && response.users[0].pseudo === pseudo
      )
    } catch (error) {
      console.error("Error checking pseudo:", error)
      setCheckPseudo(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const debouncedCheckPseudo = useCallback(debounce(isPseudoExist, 500), [
    isPseudoExist,
  ])

  useEffect(() => {
    if (data.pseudo) {
      debouncedCheckPseudo(data.pseudo)
    } else {
      setCheckPseudo(false)
    }
  }, [data.pseudo, debouncedCheckPseudo])

  const renderForm = () => {
    switch (step) {
      case 2:
        if (existingUser) {
          return (
            <Fragment>
              <FormInputText
                data={data}
                setData={setData}
                label="Password"
                name="password"
                value={data.password ?? ""}
                secure={true}
                readOnly={false}
                type="password"
              />
              <View style={{ width: "90%" }}>
                <FormButtonSubmit
                  type="info"
                  label="SignIn"
                  fct={async () => {
                    await handleLogin()
                  }}
                  disabled={
                    !data.password || !Utils.isValidPassword(data.password)
                  }
                />
              </View>
            </Fragment>
          )
        } else {
          return (
            <Fragment>
              <FormInputText
                data={data}
                setData={setData}
                label="Username"
                name="pseudo"
                value={data.pseudo ?? ""}
                secure={false}
                readOnly={false}
              />

              {loading ? (
                <ActivityIndicator size="small" color="blue" />
              ) : checkPseudo ? (
                <Text style={{ color: "red" }}>Pseudo already taken</Text>
              ) : null}
              <View style={{ width: "90%" }}>
                <FormButtonSubmit
                  type="info"
                  label="Next"
                  fct={async () => {
                    setStep(3)
                  }}
                  disabled={!data.pseudo || checkPseudo}
                />
              </View>
            </Fragment>
          )
        }
      case 3:
        if (!existingUser) {
          return (
            <Fragment>
              <FormInputText
                data={data}
                setData={setData}
                label="Password"
                name="password"
                value={data.password ?? ""}
                secure={true}
                readOnly={false}
                type="password"
              />
              <View style={{ width: "90%" }}>
                <FormButtonSubmit
                  type="info"
                  label="SignUp"
                  fct={async () => {
                    await handleRegister()
                  }}
                  disabled={
                    !data.password || !Utils.isValidPassword(data.password)
                  }
                />
              </View>
            </Fragment>
          )
        }
      default:
        return (
          <Fragment>
            <FormInputText
              data={data}
              setData={setData}
              label="Email"
              name="email"
              value={data.email ?? ""}
              secure={false}
              readOnly={false}
              type="email"
            />
            <View style={{ width: "90%" }}>
              <FormButtonSubmit
                type="info"
                label="Next"
                fct={async () => {
                  await searchUser()
                  setStep(2)
                }}
                disabled={!data.email || !Utils.isValidEmail(data.email)}
              />
            </View>
          </Fragment>
        )
    }
  }

  return renderForm()
}

export default StepAuth
