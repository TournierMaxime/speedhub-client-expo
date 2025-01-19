import React, { useState } from "react"
import { View, TouchableOpacity, Image, StyleSheet } from "react-native"
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons"
import Utils from "./Utils"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

interface HeaderProps {
    backButton: boolean
    title: string
}

const Header: React.FC<HeaderProps> = ({
    backButton,
    title
}) => {

    const { user, isAuthenticated } = useAuth()

    const theme = useColorScheme() ?? 'light';

    const logo = require("../../assets/images/speedhub.webp")

    const [modalVisible, setModalVisible] = useState(false)

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const router = useRouter()

    const handleRedirectToProfile = () => {
        router.push({
            pathname: "/(main)/(profile)/user",
            params: {
                userId: user?.userId
            }
        })
    }

    const handleRedirectToSearch = () => {
        router.push({
            pathname: "/(main)/(search)/search",
        })
    }

    const NotAuthenticatedUser = () => {
        if (isAuthenticated === false) {
            return (

                <View
                    style={[style.header, theme === "dark" ? { backgroundColor: Colors.dark.background, shadowColor: Colors.dark.shadowColor } : { backgroundColor: Colors.light.background, shadowColor: Colors.light.shadowColor }]}
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
                                    color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
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
                    style={[style.header, theme === "dark" ? { backgroundColor: Colors.dark.background, shadowColor: Colors.dark.shadowColor } : { backgroundColor: Colors.light.background, shadowColor: Colors.light.shadowColor }]}
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
                                    color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={""}>
                            <TouchableOpacity
                                style={""}
                                onPress={() => handleRedirectToProfile()}
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
                                        color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
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
                        <TouchableOpacity style={""} onPress={() => handleRedirectToSearch()}>
                            <FontAwesome
                                name="search"
                                size={Utils.moderateScale(25)}
                                color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}

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
        paddingHorizontal: Utils.moderateScale(10),
        paddingTop: Utils.moderateScale(30),
        width: "100%",
        shadowOffset: { width: Utils.moderateScale(0), height: Utils.moderateScale(2) },
        shadowOpacity: Utils.moderateScale(0.25),
        shadowRadius: Utils.moderateScale(3.5),
        elevation: Utils.moderateScale(5),
    },
})

export default Header