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
import { useAuth } from "@/contexts/AuthContext"

const UpdateUsername = () => {
  const { user } = useAuth()
  const { handleUpdateUsername, data, setData } = useHandleUpdate()
  return (
    <View style={mainStyle.container}>
      <Header backButton={true} lastPath={{ pathname: ROUTES.PROFILE }} />
      <View style={style.container}>
        <FormInputText
          data={data}
          setData={setData}
          label={user?.pseudo ?? "Pseudo"}
          name="pseudo"
          value={data.pseudo ?? ""}
          secure={false}
          readOnly={false}
        />
        <FormButtonSubmit
          type="primary"
          label={"Confirm"}
          fct={() => handleUpdateUsername()}
          disabled={!data.pseudo}
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

export default UpdateUsername
