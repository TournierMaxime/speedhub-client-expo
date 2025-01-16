import React, { Fragment, useEffect, useState, useCallback } from "react"
import useHandleAuth from "@/hooks/auth/useHandleAuth"
import Form from "@/components/lib/Form"
import Utils from "@/components/lib/Utils"
import { userService } from "@/services/speedhub"
import { Text, ActivityIndicator } from "react-native"

const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

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
    const [checkPseudo, setCheckPseudo] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const isPseudoExist = useCallback(
        async (pseudo: string) => {
            setLoading(true);
            try {
                const response = await userService.searchUsers({ pseudo }, { page: 1, size: 1 });
                setCheckPseudo((response.users.length > 0 && response.users[0].pseudo === pseudo));
            } catch (error) {
                console.error("Error checking pseudo:", error);
                setCheckPseudo(false);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const debouncedCheckPseudo = useCallback(debounce(isPseudoExist, 500), [isPseudoExist]);

    useEffect(() => {
        if (data.pseudo) {
            debouncedCheckPseudo(data.pseudo);
        } else {
            setCheckPseudo(false);
        }
    }, [data.pseudo, debouncedCheckPseudo]);

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
                                    await handleLogin()
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
                                false
                            )}

                            {loading ? (
                                <ActivityIndicator size="small" color="blue" />
                            ) : checkPseudo ? (
                                <Text style={{ color: "red" }}>Pseudo already taken</Text>
                            ) : null}

                            {Form.submit(
                                "info",
                                "Next",
                                async () => {
                                    setStep(3)
                                },
                                !data.pseudo || checkPseudo
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
                                    await handleRegister()
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
                                await searchUser()
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
