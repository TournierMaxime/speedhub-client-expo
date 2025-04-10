import React from "react"
import { StyleSheet, View } from "react-native"
import {
  FormButtonSubmit,
  FormUploadFile,
} from "@/components/lib/FormValidation"
import mainStyle from "@/styles/base/main"
import Header from "@/components/lib/Header"
import ROUTES from "@/components/routes"
import useHandleUpdate from "@/hooks/user/useHandleUpdate"
import { useAuth } from "@/contexts/AuthContext"

const UpdateAvatar = () => {
  const { user } = useAuth()
  const { handleUpdateAvatar, data, setData } = useHandleUpdate()
  return (
    <View style={mainStyle.container}>
      <Header backButton={true} lastPath={{ pathname: ROUTES.PROFILE }} />
      <View style={style.container}>
        <View style={{ width: "90%" }}>
          <FormUploadFile
            data={data}
            setData={setData}
            name="image"
            value={data.image ?? ""}
          />
          <FormButtonSubmit
            type="primary"
            label={"Confirm"}
            fct={() => handleUpdateAvatar()}
            disabled={!data.image}
          />
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
})

export default UpdateAvatar
