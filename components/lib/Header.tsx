import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons"
import Utils from "./Utils"
import useResponsive from "../../hooks/utils/useResponsive"
import { useAuth } from "@/contexts/AuthContext"

interface HeaderProps {
    backButton: boolean
    title: string
    type: string
}

const Header: React.FC<HeaderProps> = ({
    backButton,
    title,
    type,
}) => {

    const { user, isAuthenticated } = useAuth()

    const logo = require("../../../../../assets/images/videotek_logo.webp")

    const [modalVisible, setModalVisible] = useState(false)

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const { userIcon } = useResponsive()

    const NotAuthenticatedUser = () => {
        if (isAuthenticated === false) {
            return (
                <View>
                    <View
                        style={""}
                    >
                        {backButton ? (
                            <View style={""}>
                                <TouchableOpacity
                                    style={""}
                                >
                                    <Ionicons
                                        name="arrow-back-outline"
                                        size={Utils.moderateScale(25)}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View />
                        )}

                        <Text
                            style={""}
                        >
                            {title}
                        </Text>
                        <View style={""}></View>
                    </View>
                </View>
            )
        }
    }

    const AuthenticatedUser = () => {
        if (isAuthenticated === true) {
            return (
                <View>
                    <View
                        style={""}
                    >
                        {backButton ? (
                            <View style={""}>
                                <TouchableOpacity
                                    style={""}
                                >
                                    <Ionicons
                                        name="arrow-back-outline"
                                        size={Utils.moderateScale(25)}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={""}>
                                <TouchableOpacity
                                    style={""}
                                >
                                    {user?.image ? (
                                        <Image source={{ uri: user?.image }} style={userIcon()} />
                                    ) : (
                                        <FontAwesome5
                                            name="user"
                                            size={Utils.moderateScale(25)}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={""}>
                            <Image
                                style={{
                                    resizeMode: "contain",
                                    width: Utils.moderateScale(120),
                                    height: Utils.moderateScale(80),
                                }}
                                source={logo}
                            />
                        </View>

                        <View style={""}>
                            <TouchableOpacity style={""} onPress={handleModal}>
                                <FontAwesome
                                    name="search"
                                    size={Utils.moderateScale(25)}

                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            )
        }
    }

    return isAuthenticated === true ? AuthenticatedUser() : NotAuthenticatedUser()
}

export default Header