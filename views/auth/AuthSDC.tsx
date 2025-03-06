import React, { Fragment, useEffect } from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import useHandleAuthSDC from "@/hooks/auth/useHandleAuthSDC"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import {
  FormButtonSubmit,
  FormInputText,
} from "@/components/lib/FormValidation"

const AuthSDC = () => {
  const { handleAuthSDC, data, setData, isProcessingSDC, step } =
    useHandleAuthSDC()

  const theme = useColorScheme() ?? "light"

  useEffect(() => {
    if (step === "FINALIZE") {
      handleAuthSDC()
    }
  }, [step])

  return (
    <View
      style={[
        style.container,
        theme === "dark"
          ? { backgroundColor: Colors.dark.background }
          : { backgroundColor: Colors.light.background },
      ]}
    >
      <Header backButton={false} title="Login with Speedrun.com" />
      <View style={style.section}>
        <Fragment>
          {step === "LOGIN" && (
            <Fragment>
              <FormInputText
                data={data}
                setData={setData}
                label="Username"
                name="name"
                value={data?.name ?? ""}
                secure={false}
                readOnly={false}
              />
              <FormInputText
                data={data}
                setData={setData}
                label="Password"
                name="password"
                value={data?.password ?? ""}
                secure={true}
                readOnly={false}
              />
            </Fragment>
          )}

          {step === "TOKEN" && (
            <FormInputText
              data={data}
              setData={setData}
              label="Token 2FA"
              name="token"
              value={data?.token ?? ""}
              secure={false}
              readOnly={false}
            />
          )}

          <View style={{ width: "90%" }}>
            {step === "LOGIN" || step === "TOKEN" ? (
              <FormButtonSubmit
                type="info"
                label={isProcessingSDC ? <ActivityIndicator /> : "Confirm"}
                fct={async () => {
                  await handleAuthSDC()
                }}
                disabled={
                  isProcessingSDC ||
                  (step === "LOGIN" && (!data.name || !data.password)) ||
                  (step === "TOKEN" && !data.token)
                }
              />
            ) : null}
          </View>
        </Fragment>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  section: {
    display: "flex",
    alignItems: "center",
  },
})

export default AuthSDC
