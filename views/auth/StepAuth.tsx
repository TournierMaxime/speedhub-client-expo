import React, { Fragment, useState } from "react"
import useHandleAuth from "@/hooks/auth/useHandleAuth"
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
                            {Form.submit(
                                "info",
                                "SignIn",
                                async () => {
                                    handleLogin()
                                },
                                !data.password || !Utils.isValidPassword(data.password)
                            )}
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            {Form.inputText(
                                data,
                                setData,
                                "Username",
                                "pseudo",
                                data.pseudo ?? "",
                                false,
                                false,
                                "text"
                            )}
                            {Form.submit(
                                "info",
                                "Next",
                                async () => {
                                    setStep(3)
                                },
                                !data.pseudo
                            )}
                        </Fragment>
                    )
                }
            case 3:
                if (!existingUser) {
                    return (
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
                            {Form.submit(
                                "info",
                                "SignUp",
                                async () => {
                                    handleRegister()
                                },
                                !data.password || !Utils.isValidPassword(data.password)
                            )}
                        </Fragment>
                    )
                }
            default:
                return (
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
                            "Next",
                            async () => {
                                searchUser()
                                setStep(2)
                            },
                            !data.email || !Utils.isValidEmail(data.email)
                        )}
                    </Fragment>
                )
        }
    }

    return renderForm()
}

export default StepAuth
