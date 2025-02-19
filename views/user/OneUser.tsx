import { useGlobalSearchParams } from "expo-router"
import React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import useHandleRouter, { Pathname } from "@/hooks/utils/useHandleRouter"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/lib/Header"
import ROUTES from "@/components/routes"
import mainStyle from "@/styles/base/main"
import profileStyle from "@/styles/views/profile"
import { Chevron, Settings, Shield } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"

interface Item {
  path: Pathname
  params?: any
  title: string
  icon?: React.JSX.Element
}

const OneUser = () => {
  const { userId } = useGlobalSearchParams()

  const { handleReplace, handleRedirect } = useHandleRouter()

  const { logout, user } = useAuth()

  const handleLogout = async () => {
    await logout()
    await handleReplace(ROUTES.AUTH)
  }

  const items: Item[] = [
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
  ]

  return (
    <View style={mainStyle.container}>
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
                    }
                  : {
                      borderTopWidth: Utils.moderateScale(2),
                      borderBottomWidth: Utils.moderateScale(2),
                    },
              ]}
              onPress={() => handleRedirect(item.path, item.params)}
            >
              <Text style={profileStyle.itemText}>
                {item.icon} {item.title}
              </Text>
              <Chevron />
            </TouchableOpacity>
          )
        })}

        <TouchableOpacity
          style={profileStyle.logout}
          onPress={() => handleLogout()}
        >
          <Text style={profileStyle.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default OneUser
