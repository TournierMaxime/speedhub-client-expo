import React, { useState } from "react"
import { View, TouchableOpacity, Image, StyleSheet } from "react-native"
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons"
import Utils from "./Utils"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "expo-router"

interface HeaderProps {
    backButton: boolean
    title: string
}

const Header: React.FC<HeaderProps> = ({
    backButton,
    title
}) => {

    const { user, isAuthenticated } = useAuth()

    const logo = require("../../assets/images/speedhub.webp")

    const [modalVisible, setModalVisible] = useState(false)

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const router = useRouter()

    const NotAuthenticatedUser = () => {
        if (isAuthenticated === false) {
            return (

                <View
                    style={style.header}
                >
                    {backButton ? (
                        <View style={{ marginLeft: Utils.moderateScale(10) }}>
                            <TouchableOpacity
                                style={""}
                                onPress={() => router.back()}
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

                    <Image
                        style={{
                            resizeMode: "contain",
                            width: Utils.moderateScale(120),
                            height: Utils.moderateScale(80),
                        }}
                        source={logo}
                    />

                    <View />

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
                                        <Image source={{ uri: user?.image }} style={""} />
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

const style = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: Utils.moderateScale(20),
    },
})

export default Header