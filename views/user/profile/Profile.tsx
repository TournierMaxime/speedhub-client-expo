import React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import useHandleRouter, { Pathname } from "@/hooks/utils/useHandleRouter"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/lib/Header"
import ROUTES from "@/components/routes"
import mainStyle from "@/styles/base/main"
import profileStyle from "@/styles/views/profile"
import { Avatar, Chevron, Email, User } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"

interface Item {
  path: Pathname | undefined
  params?: any
  title: string
  icon?: React.JSX.Element
  action?: () => Promise<void>
}

const Profile = () => {
  const { handleReplace, handleRedirect } = useHandleRouter()

  const { logout, user } = useAuth()

  const items: Item[] = [
    {
      path: ROUTES.PROFILE,
      params: undefined,
      title: "Username",
      icon: <User size={20} />,
    },
    {
      path: ROUTES.SETTINGS,
      params: undefined,
      title: "Email",
      icon: <Email />,
    },
    {
      path: ROUTES.PRIVACY_POLICY,
      params: undefined,
      title: "Avatar",
      icon: <Avatar />,
    },
  ]

  return (
    <View style={[mainStyle.container, { flex: 1 }]}>
      <Header
        backButton={true}
        lastPath={{ pathname: ROUTES.ONE_USER_PROFILE }}
      />
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
                item.path ? handleRedirect(item.path, item.params) : undefined
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
      </ScrollView>
    </View>
  )
}

export default Profile
