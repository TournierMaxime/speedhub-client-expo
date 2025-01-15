import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import useHandleConfirmEmail from "@/hooks/auth/useHandleConfirmEmail"
import Form from "@/components/lib/Form"
import { useGlobalSearchParams } from "expo-router"

const ConfirmEmail: React.FC = () => {
    const params = useGlobalSearchParams()

    const { userId } = params

    const { handleConfirmEmail, data, setData } = useHandleConfirmEmail({
        userId,
    })

    return (
        <View style={""}>
            <View style={""}>
                <View style={""}>
                    {Form.inputNumber(
                        data,
                        setData,
                        "Code",
                        "code",
                        data?.verificationCode ?? "",
                        "number"
                    )}
                    <TouchableOpacity
                        style={""}
                        onPress={handleConfirmEmail}
                    >
                        <Text style={""}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ConfirmEmail