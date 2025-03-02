import { useGlobalSearchParams } from "expo-router"
import React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import useHandleRouter, { Pathname } from "@/hooks/utils/useHandleRouter"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/lib/Header"
import ROUTES from "@/components/routes"
import mainStyle from "@/styles/base/main"
import profileStyle from "@/styles/views/profile"
import {
  Chevron,
  Heart,
  Logout,
  Settings,
  Shield,
  User,
} from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"
import app from "../../package.json"
import { ProfilePath } from "@/types/speedhub"

const OneUser = () => {
  const { userId } = useGlobalSearchParams()

  const { handleReplace, handleRedirect } = useHandleRouter()

  const { logout, user } = useAuth()

  const handleLogout = async () => {
    await logout()
    await handleReplace(ROUTES.AUTH)
  }

  const items: ProfilePath[] = [
    {
      path: ROUTES.PROFILE,
      params: undefined,
      title: "Profile",
      icon: <User size={20} />,
    },
    {
      path: ROUTES.FAVORITES,
      params: undefined,
      title: "Favorites",
      icon: <Heart />,
    },
    {
      path: ROUTES.SETTINGS,
      params: undefined,
      title: "Settings",
      icon: <Settings />,
    },
    {
      path: ROUTES.PRIVACY_POLICY,
      params: undefined,
      title: "Privacy Policy",
      icon: <Shield />,
    },
    {
      path: undefined,
      params: undefined,
      title: "Log out",
      icon: <Logout />,
      action: async () => await handleLogout(),
    },
  ]

  return (
    <View style={[mainStyle.container, { flex: 1 }]}>
      <Header backButton={true} lastPath={{ pathname: ROUTES.HOME }} />
      <ScrollView style={profileStyle.container}>
        {items.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              style={[
                profileStyle.item,
                idx === 0
                  ? {
                      borderTopWidth: Utils.moderateScale(2),
                      borderBottomWidth: Utils.moderateScale(2),
                    }
                  : {
                      borderBottomWidth: Utils.moderateScale(2),
                    },
              ]}
              onPress={() =>
                item.path
                  ? handleRedirect(item.path, item.params)
                  : item.action
                  ? item.action()
                  : null
              }
            >
              <Text
                style={[
                  profileStyle.itemText,
                  item.title === "Log out" ? { color: "red" } : null,
                ]}
              >
                {item.icon} {item.title}
              </Text>
              <Chevron />
            </TouchableOpacity>
          )
        })}

        <View style={profileStyle.version}>
          <Text style={profileStyle.versionText}>{app.version}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default OneUser
