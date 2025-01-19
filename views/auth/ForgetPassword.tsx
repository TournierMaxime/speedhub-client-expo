import React, { Fragment } from "react"
import { View, StyleSheet } from "react-native"
import useHandleForgetPassword from "@/hooks/auth/useHandleForgetPassword"
import Form from "@/components/lib/Form"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

const ForgetPasswordScreen = () => {

    const {
        data,
        setData,
        handleCheckForgetPasswordCode,
        handleForgetPassword,
        handleResetPassword,
        step,
    } = useHandleForgetPassword()

    const theme = useColorScheme() ?? 'light';

    return (
        <View style={[style.container, theme === "dark" ? { backgroundColor: Colors.dark.background } : { backgroundColor: Colors.light.background }]}>
            <Header backButton={true} title="" />
            <View style={style.section}>
                {step === 1 && (
                    <Fragment>
                        {Form.inputText(
                            data,
                            setData,
                            "Email",
                            "email",
                            data.email ?? "",
                            false,
                            false,
                            "email"
                        )}
                        {Form.submit(
                            "info",
                            "Confirm",
                            async () => {
                                await handleForgetPassword()
                            },
                            !data.email || !Utils.isValidEmail(data.email)
                        )}
                    </Fragment>
                )}
                {step === 2 && (
                    <Fragment>
                        {Form.inputNumber(
                            data,
                            setData,
                            "Verification code",
                            "code",
                            data.code ?? "",
                            "number"
                        )}
                        {Form.submit(
                            "info",
                            "Confirm",
                            async () => {
                                await handleCheckForgetPasswordCode()
                            },
                            !data.code || !Utils.isValidCode(data.code)
                        )}
                    </Fragment>
                )}

                {step === 3 && (
                    <Fragment>
                        {Form.inputText(
                            data,
                            setData,
                            "Password",
                            "password",
                            data.password ?? "",
                            true,
                            false,
                            "password"
                        )}
                        {Form.inputText(
                            data,
                            setData,
                            "Confirm password",
                            "confirmPassword",
                            data.confirmPassword ?? "",
                            true,
                            false,
                            "password"
                        )}
                        {Form.submit(
                            "info",
                            "Confirm",
                            async () => {
                                await handleResetPassword()
                            },
                            !data.password || !Utils.isValidPassword(data.password) && !data.confirmPassword || !Utils.isValidPassword(data.confirmPassword ?? "")
                        )}

                    </Fragment>
                )}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%"
    },
    section: {
        display: "flex",
        alignItems: "center"
    },
})

export default ForgetPasswordScreen