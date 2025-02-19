import React, { Fragment } from "react"
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from "react-native"
import GoogleSVG from "../../assets/images/GoogleSVG"
import AppleSVG from "../../assets/images/AppleSVG"
import useHandleAuthGoogle from "@/hooks/auth/useHandleAuthGoogle"
import Utils from "@/components/lib/Utils"
import useHandleAuthApple from "@/hooks/auth/useHandleAuthApple"
import StepAuth from "./StepAuth"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import { FormButtonSubmit } from "@/components/lib/FormValidation"

const LoginScreen = () => {
  const { handleRedirect } = useHandleRouter()

  const theme = useColorScheme() ?? "light"

  const { onAppleButtonPress, isProcessingApple } = useHandleAuthApple()

  const { loginWithGoogle, isProcessing } = useHandleAuthGoogle()

  return (
    <View
      style={[
        style.container,
        theme === "dark"
          ? { backgroundColor: Colors.dark.background }
          : { backgroundColor: Colors.light.background },
      ]}
    >
      {isProcessing ? (
        <View style={""}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : isProcessingApple ? (
        <View style={""}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <Fragment>
          <Header backButton={false} title="Login" />

          <View style={style.form}>
            <View style={style.section}>
              <StepAuth />
              <FormButtonSubmit
                type="error"
                label="Forgot your password"
                fct={async () => await handleRedirect(ROUTES.FORGET_PASSWORD)}
                disabled={false}
              />
            </View>

            {Platform.OS === "android" ? (
              <View style={style.section}>
                <TouchableOpacity
                  style={style.thirdParty}
                  onPress={() => loginWithGoogle()}
                >
                  <GoogleSVG />
                  <Text
                    style={[
                      style.text,
                      { marginLeft: Utils.moderateScale(10) },
                      theme === "dark"
                        ? { color: Colors.dark.text }
                        : { color: Colors.light.text },
                    ]}
                  >
                    Continue with Google
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {Platform.OS === "ios" ? (
              <View style={style.section}>
                <TouchableOpacity
                  style={style.thirdParty}
                  onPress={() => onAppleButtonPress()}
                >
                  <AppleSVG />
                  <Text
                    style={[
                      style.text,
                      theme === "dark"
                        ? { color: Colors.dark.text }
                        : { color: Colors.light.text },
                    ]}
                  >
                    Continue with Apple
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </Fragment>
      )}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginTop: Utils.moderateScale(20),
  },
  form: {
    marginTop: Utils.moderateScale(20),
  },
  section: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontSize: Utils.moderateScale(20),
  },
  thirdParty: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: Utils.moderateScale(10),
    padding: Utils.moderateScale(10),
    borderColor: "grey",
    borderWidth: Utils.moderateScale(1),
    width: "90%",
    borderRadius: Utils.moderateScale(5),
  },
})

export default LoginScreen
