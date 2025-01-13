import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import useHandleForgetPassword from "@/hooks/auth/useHandleForgetPassword"
import useOnChange from "@/hooks/utils/useOnChange"

const ForgetPasswordScreen: React.FC = () => {

    const {
        data,
        setData,
        handleCheckForgetPasswordCode,
        handleForgetPassword,
        handleResetPassword,
        step,
    } = useHandleForgetPassword()

    const { onChange } = useOnChange({ data, setData })

    return (
        <View style={""}>
            <View style={""}>
                {step === 1 && (
                    <View style={""}>
                        <Text style={""}>
                            Enter your email address
                        </Text>
                        <TextInput
                            style={""}
                            placeholder={"Email"}
                            value={data.email}
                            onChangeText={(value) => onChange({ name: "email", value })}
                        />

                        <TouchableOpacity
                            style={""}
                            onPress={handleForgetPassword}
                        >
                            <Text style={""}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {step === 2 && (
                    <View style={""}>
                        <Text style={""}>
                            Enter your verification code
                        </Text>
                        <TextInput
                            placeholder={"Verification code"}
                            style={""}
                            value={data.code !== null ? data.code.toString() : ""}
                            maxLength={6}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                                onChange({ name: "code", value: Number(value) })
                            }
                        />

                        <TouchableOpacity
                            style={""}
                            onPress={handleCheckForgetPasswordCode}
                        >
                            <Text style={""}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {step === 3 && (
                    <View style={""}>
                        <Text style={""}>
                            Enter your new password
                        </Text>
                        <TextInput
                            style={""}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            value={data.password}
                            onChangeText={(value) => onChange({ name: "password", value })}
                        />
                        <TextInput
                            style={""}
                            placeholder={"Confirm your password"}
                            secureTextEntry={true}
                            value={data.confirmPassword}
                            onChangeText={(value) =>
                                onChange({ name: "confirmPassword", value })
                            }
                        />

                        <TouchableOpacity
                            style={""}
                            onPress={handleResetPassword}
                        >
                            <Text style={""}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default ForgetPasswordScreen