import React, { Fragment } from "react"
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
  const { loginWithSDC, data, setData, isProcessingSDC } = useHandleAuthSDC()

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
      <Header backButton={false} title="" />
      <View style={style.section}>
        <Fragment>
          <FormInputText
            data={data}
            setData={setData}
            label="X-API-KEY"
            name="xApiKey"
            value={data?.xApiKey ?? ""}
            secure={false}
            readOnly={false}
          />
          <FormButtonSubmit
            type="info"
            label={isProcessingSDC ? <ActivityIndicator /> : "Confirm"}
            fct={async () => {
              await loginWithSDC()
            }}
            disabled={!data.xApiKey}
          />
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
