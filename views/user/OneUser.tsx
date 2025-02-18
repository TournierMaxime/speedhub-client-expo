import { useGlobalSearchParams } from "expo-router"
import React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import useHandleRouter, { Pathname } from "@/hooks/utils/useHandleRouter"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/lib/Header"
import ROUTES from "@/components/routes"
import mainStyle from "@/styles/base/main"
import profileStyle from "@/styles/views/profile"
import { Chevron, Settings } from "@/components/lib/Icons"

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
      path: ROUTES.HOME,
      params: undefined,
      title: "Settings",
      icon: <Settings />,
    },
    {
      path: ROUTES.MARATHONS,
      params: undefined,
      title: "Privacy Policy",
      icon: <Settings />,
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
              style={profileStyle.item}
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
