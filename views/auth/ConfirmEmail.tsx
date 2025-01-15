import React, { Fragment } from "react"
import { View, StyleSheet } from "react-native"
import useHandleConfirmEmail from "@/hooks/auth/useHandleConfirmEmail"
import Form from "@/components/lib/Form"
import { useGlobalSearchParams } from "expo-router"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"

const ConfirmEmail: React.FC = () => {
    const params = useGlobalSearchParams()

    const { userId } = params

    const { handleConfirmEmail, data, setData } = useHandleConfirmEmail({
        userId,
    })

    return (
        <View style={style.container}>
            <Header backButton={true} title="" />
            <View style={style.section}>
                <Fragment>
                    {Form.inputNumber(
                        data,
                        setData,
                        "Code",
                        "code",
                        data?.verificationCode ?? "",
                        "number"
                    )}
                    {Form.submit(
                        "info",
                        "Confirm",
                        async () => {
                            await handleConfirmEmail()
                        },
                        !data.verificationCode || !Utils.isValidCode(data.verificationCode)
                    )}
                </Fragment>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex"
    },
    section: {
        display: "flex",
        alignItems: "center"
    },
})

export default ConfirmEmail