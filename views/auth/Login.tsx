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
import { useRouter } from "expo-router"
import Form from "@/components/lib/Form"
import Header from "@/components/lib/Header"

const LoginScreen: React.FC = () => {
    const router = useRouter()

    const { onAppleButtonPress, isProcessingApple } = useHandleAuthApple()

    const { loginWithGoogle, isProcessing } = useHandleAuthGoogle()

    const handleForgetPassword = () => {
        router.push({
            pathname: "/(auth)/forget-password",
        })
    }

    return (
        <View style={style.container}>
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

                    <View style={style.section}>
                        <StepAuth />

                        {Form.submit("error", "Forgot your password", async () => await handleForgetPassword(), false)}
                    </View>

                    <View style={style.section}>
                        <TouchableOpacity style={style.googleCard} onPress={() => loginWithGoogle()}>
                            <GoogleSVG />
                            <Text style={[style.text, { marginLeft: Utils.moderateScale(10) }]}>Continue with Google</Text>
                        </TouchableOpacity>
                    </View>

                    {Platform.OS === "ios" ? (
                        <View style={style.section}>
                            <View style={""}>
                                <TouchableOpacity
                                    style={""}
                                    onPress={() => onAppleButtonPress()}
                                >
                                    <AppleSVG />
                                    <Text style={style.text}>Continue with Apple</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null}
                </Fragment>
            )}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex"
    },
    header: {
        display: "flex",
        alignItems: "center",
        marginTop: Utils.moderateScale(20),
    },
    section: {
        display: "flex",
        alignItems: "center"
    },
    text: {
        fontSize: Utils.moderateScale(20)
    },
    googleCard: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: Utils.moderateScale(10),
        padding: Utils.moderateScale(10),
        borderColor: "gray",
        borderWidth: Utils.moderateScale(1),
        width: "90%",
        borderRadius: Utils.moderateScale(5)
    }
})

export default LoginScreen
