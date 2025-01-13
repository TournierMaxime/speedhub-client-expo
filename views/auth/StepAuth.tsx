import React, { Fragment, useState } from "react"
import useHandleAuth from "@/hooks/auth/useHandleAuth"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import Form from "@/components/lib/Form"
import Utils from "@/components/lib/Utils"

const StepAuth: React.FC = () => {
    const {
        handleLogin,
        handleRegister,
        searchUser,
        existingUser,
        data,
        setData,
    } = useHandleAuth()

    const [step, setStep] = useState(1)

    const renderForm = () => {
        switch (step) {
            case 2:
                if (existingUser) {
                    return (
                        <Fragment>
                            {Form.inputText(data, setData, "Password", "password", data.password, true, false)}
                            <TouchableOpacity
                                style={""}
                                onPress={handleLogin}
                                disabled={!data.password}
                            >
                                <Text style={""}>SignIn</Text>
                            </TouchableOpacity>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            {Form.inputText(data, setData, "Username", "pseudo", data.pseudo, false, false)}
                            <TouchableOpacity
                                style={""}
                                onPress={() => setStep(3)}
                                disabled={!data.pseudo}
                            >
                                <Text style={""}>Next</Text>
                            </TouchableOpacity>
                        </Fragment>
                    )
                }
            case 3:
                if (!existingUser) {
                    return (
                        <Fragment>
                            {Form.inputText(data, setData, "Password", "password", data.password, true, false)}
                            <TouchableOpacity
                                style={""}
                                onPress={handleRegister}
                                disabled={!data.password}
                            >
                                <Text style={""}>SignUp</Text>
                            </TouchableOpacity>
                        </Fragment>
                    )
                }
            default:
                return (
                    <Fragment>
                        {Form.inputText(data, setData, "Email", "email", data.email, false, false)}
                        {Form.submit("info", "Next", async () => {
                            searchUser();
                            setStep(2);
                        }, !data.email)}

                    </Fragment>
                )
        }
    }

    return renderForm()
}

const style = StyleSheet.create({
    text: {
        fontSize: Utils.moderateScale(20)
    },
})

export default StepAuth