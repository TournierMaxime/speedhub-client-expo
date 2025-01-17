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
                        <View style={""}>
                            <TouchableOpacity
                                style={""}
                            >
                                {user?.image ? (
                                    <Image source={{ uri: user.image }} style={{
                                        width: Utils.moderateScale(40),
                                        height: Utils.moderateScale(40),
                                    }} />
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
        padding: Utils.moderateScale(10),
        backgroundColor: "#fff",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: Utils.moderateScale(0), height: Utils.moderateScale(2) },
        shadowOpacity: Utils.moderateScale(0.25),
        shadowRadius: Utils.moderateScale(3.5),
        elevation: Utils.moderateScale(5),
    },
})

export default Header