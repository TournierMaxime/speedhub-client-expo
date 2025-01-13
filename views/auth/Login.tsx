import React, { Fragment } from "react"
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    ActivityIndicator,
    Image,
    Platform,
} from "react-native"
import GoogleSVG from "../../assets/images/GoogleSVG"
import AppleSVG from "../../assets/images/AppleSVG"
import useHandleAuthGoogle from "@/hooks/auth/useHandleAuthGoogle"
import Utils from "@/components/lib/Utils"
import useHandleAuthApple from "@/hooks/auth/useHandleAuthApple"
import StepAuth from "./StepAuth"
import { useRouter } from "expo-router"

const LoginScreen: React.FC = () => {

    const router = useRouter()

    const { onAppleButtonPress, isProcessingApple } = useHandleAuthApple()

    const { loginWithGoogle, isProcessing } = useHandleAuthGoogle()

    const handleForgetPassword = () => {
        router.push({
            pathname: "/(auth)/forget-password"
        })
    }

    const logo = require("../../assets/images/videotek_logo.webp")

    return (
        <ScrollView style={""}>
            <View style={""}>
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
                        <View style={""}>
                            <View style={""}>
                                <Image
                                    style={{
                                        resizeMode: "contain",
                                        width: Utils.moderateScale(280),
                                        height: Utils.moderateScale(80),
                                    }}
                                    source={logo}
                                />
                            </View>
                        </View>

                        <View style={""}>
                            <StepAuth />

                            <TouchableOpacity onPress={handleForgetPassword}>
                                <Text style={""}>
                                    Forgot your password
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={""}>
                            <View
                                style={""}
                            >
                                <TouchableOpacity
                                    style={""}
                                    onPress={() => loginWithGoogle()}
                                >
                                    <GoogleSVG />
                                    <Text style={""}>
                                        Continue with Google
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {Platform.OS === "ios" ? (
                            <View style={""}>
                                <View
                                    style={""}
                                >
                                    <TouchableOpacity
                                        style={""}
                                        onPress={() => onAppleButtonPress()}
                                    >
                                        <AppleSVG />
                                        <Text style={""}>
                                            Continue with Apple
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                    </Fragment>
                )}
            </View>
        </ScrollView>
    )
}

export default LoginScreen