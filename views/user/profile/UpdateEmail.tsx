import React from "react"
import { StyleSheet, View } from "react-native"
import {
  FormButtonSubmit,
  FormInputText,
} from "@/components/lib/FormValidation"
import mainStyle from "@/styles/base/main"
import Header from "@/components/lib/Header"
import ROUTES from "@/components/routes"
import useHandleUpdate from "@/hooks/user/useHandleUpdate"

const UpdateEmail = () => {
  const { handleUpdateEmail, data, setData } = useHandleUpdate()
  return (
    <View style={mainStyle.container}>
      <Header backButton={true} lastPath={{ pathname: ROUTES.PROFILE }} />
      <View style={style.container}>
        <FormInputText
          data={data}
          setData={setData}
          label="Email"
          name="email"
          value={data.email ?? ""}
          secure={false}
          readOnly={false}
        />
        <FormButtonSubmit
          type="primary"
          label={"Confirm"}
          fct={() => handleUpdateEmail()}
          disabled={!data.email}
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
})

export default UpdateEmail
