import React, { Fragment } from "react"
import { View, StyleSheet } from "react-native"
import useHandleForgetPassword from "@/hooks/auth/useHandleForgetPassword"
import Form from "@/components/lib/Form"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import {
  FormButtonSubmit,
  FormInputNumber,
  FormInputText,
} from "@/components/lib/FormValidation"

const ForgetPasswordScreen = () => {
  const {
    data,
    setData,
    handleCheckForgetPasswordCode,
    handleForgetPassword,
    handleResetPassword,
    step,
  } = useHandleForgetPassword()

  const theme = useColorScheme() ?? "light"

  return (
    <View
      style={[
        style.container,
        theme === "dark"
          ? { backgroundColor: Colors.dark.background }
          : { backgroundColor: Colors.light.background },
      ]}
    >
      <Header backButton={true} title="" />
      <View style={style.section}>
        {step === 1 && (
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
            <FormButtonSubmit
              type="info"
              label="Confirm"
              fct={async () => {
                await handleForgetPassword()
              }}
              disabled={!data.email || !Utils.isValidEmail(data.email)}
            />
          </Fragment>
        )}
        {step === 2 && (
          <Fragment>
            <FormInputNumber
              data={data}
              setData={setData}
              label="Verification code"
              name="code"
              value={data.code ?? ""}
              type="number"
            />
            <FormButtonSubmit
              type="info"
              label="Confirm"
              fct={async () => {
                await handleCheckForgetPasswordCode()
              }}
              disabled={!data.code || !Utils.isValidCode(data.code)}
            />
          </Fragment>
        )}

        {step === 3 && (
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
            <FormInputText
              data={data}
              setData={setData}
              label="Confirm password"
              name="confirmPassword"
              value={data.confirmPassword ?? ""}
              secure={true}
              readOnly={false}
              type="password"
            />
            <FormButtonSubmit
              type="info"
              label="Confirm"
              fct={async () => {
                await handleResetPassword()
              }}
              disabled={
                !data.password ||
                (!Utils.isValidPassword(data.password) &&
                  !data.confirmPassword) ||
                !Utils.isValidPassword(data.confirmPassword ?? "")
              }
            />
          </Fragment>
        )}
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

export default ForgetPasswordScreen
