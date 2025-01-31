import React, { Fragment } from "react"
import { View, StyleSheet } from "react-native"
import useHandleConfirmEmail from "@/hooks/auth/useHandleConfirmEmail"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import {
  FormButtonSubmit,
  FormInputNumber,
} from "@/components/lib/FormValidation"

const ConfirmEmail = () => {
  const { handleConfirmEmail, data, setData } = useHandleConfirmEmail()

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
          <FormInputNumber
            data={data}
            setData={setData}
            label="Code"
            name="verificationCode"
            value={data?.verificationCode ?? ""}
            type="number"
          />
          <FormButtonSubmit
            type="info"
            label="Confirm"
            fct={async () => {
              await handleConfirmEmail()
            }}
            disabled={
              !data.verificationCode ||
              !Utils.isValidCode(data.verificationCode)
            }
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

export default ConfirmEmail
