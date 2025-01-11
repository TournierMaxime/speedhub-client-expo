import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import useHandleForgetPassword from "../../lib/hooks/auth/useHandleForgetPassword"
import useOnChange from "@mod/mobile-common/lib/hooks/utils/useOnChange"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "../../../../store"
import { AuthStackParamList } from "../../navigators/AuthStackNavigator"
import { NavigationProp } from "@react-navigation/native"

interface ForgetPasswordProps {
    i18n: any
    t: any
    navigation: NavigationProp<AuthStackParamList, "ForgetPassword">
}

const ForgetPasswordScreen: React.FC<ForgetPasswordProps> = () => {
    const { t } = useTranslation()

    const {
        data,
        setData,
        handleCheckForgetPasswordCode,
        handleForgetPassword,
        handleResetPassword,
        step,
    } = useHandleForgetPassword()

    const { onChange } = useOnChange({ data, setData })

    const darkMode = useSelector((state: RootState) => state.theme.darkMode)
    const { background, text } = useDynamicThemeStyles(darkMode)

    const { fontSize, widthAspectRatio, placeholder, btnSubmit } = useResponsive()

    return (
        <View style={tw`items-center`}>
            <View style={widthAspectRatio()}>
                {step === 1 && (
                    <View style={tw`${background} p-4 h-full mb-2`}>
                        <Text style={fontSize(text)}>
                            {t("utils.enterYourEmailAddress")}
                        </Text>
                        <TextInput
                            style={placeholder()}
                            placeholder={t("utils.email")}
                            value={data.email}
                            onChangeText={(value) => onChange({ name: "email", value })}
                        />

                        <TouchableOpacity
                            style={tw`flex-row justify-center mt-4 mb-8 bg-indigo-600 rounded-lg`}
                            onPress={handleForgetPassword}
                        >
                            <Text style={btnSubmit()}>{t("utils.confirm")}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {step === 2 && (
                    <View style={tw`${background} p-4 rounded-md h-full`}>
                        <Text style={fontSize(text)}>
                            {t("utils.enterYourVerificationCode")}
                        </Text>
                        <TextInput
                            placeholder={t("utils.verificationCode")}
                            style={placeholder()}
                            value={data.code !== null ? data.code.toString() : ""}
                            maxLength={6}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                                onChange({ name: "code", value: Number(value) })
                            }
                        />

                        <TouchableOpacity
                            style={tw`flex-row justify-center mt-4 mb-8 bg-indigo-600 rounded-lg`}
                            onPress={handleCheckForgetPasswordCode}
                        >
                            <Text style={btnSubmit()}>{t("utils.confirm")}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {step === 3 && (
                    <View style={tw`${background} p-4 rounded-md h-full`}>
                        <Text style={fontSize(text)}>
                            {t("utils.enterYourNewPassword")}
                        </Text>
                        <TextInput
                            style={placeholder()}
                            placeholder={t("utils.password")}
                            secureTextEntry={true}
                            value={data.password}
                            onChangeText={(value) => onChange({ name: "password", value })}
                        />
                        <TextInput
                            style={placeholder()}
                            placeholder={t("utils.confirmYourPassword")}
                            secureTextEntry={true}
                            value={data.confirmPassword}
                            onChangeText={(value) =>
                                onChange({ name: "confirmPassword", value })
                            }
                        />

                        <TouchableOpacity
                            style={tw`flex-row justify-center mt-4 mb-8 bg-indigo-600 rounded-lg`}
                            onPress={handleResetPassword}
                        >
                            <Text style={btnSubmit()}>{t("utils.confirm")}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default ForgetPasswordScreen