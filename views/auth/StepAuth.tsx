import React, { Fragment, useState } from "react"
import useHandleAuth from "@/hooks/auth/useHandleAuth"
import { TextInput, Text, TouchableOpacity } from "react-native"

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
                            <Text style={""}>Password</Text>
                            <TextInput
                                placeholder={"Password"}
                                onChangeText={(text) => setData({ ...data, password: text })}
                                value={data.password}
                                secureTextEntry={true}
                                style={""}
                            />
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
                            <Text style={""}>Username</Text>
                            <TextInput
                                placeholder={"Username"}
                                onChangeText={(text) => setData({ ...data, pseudo: text })}
                                value={data.pseudo}
                                style={""}
                            />
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
                            <Text style={""}>Password</Text>
                            <TextInput
                                placeholder={"Password"}
                                onChangeText={(text) => setData({ ...data, password: text })}
                                value={data.password}
                                secureTextEntry={true}
                                style={""}
                            />
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
                        <Text style={""}>Email</Text>
                        <TextInput
                            placeholder={"Email"}
                            onChangeText={(text) => setData({ ...data, email: text })}
                            value={data.email}
                            style={""}
                        />
                        <TouchableOpacity
                            style={""}
                            onPress={() => {
                                searchUser(), setStep(2)
                            }}
                            disabled={!data.email}
                        >
                            <Text style={""}>Next</Text>
                        </TouchableOpacity>
                    </Fragment>
                )
        }
    }

    return renderForm()
}

export default StepAuth