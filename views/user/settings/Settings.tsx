import { Text, View, TouchableOpacity, ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import mainStyle from "@/styles/base/main"
import ROUTES from "@/components/routes"
import { ProfilePath } from "@/types/speedhub"
import { Chevron, Notifications } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"
import profileStyle from "@/styles/views/profile"
import useHandleRouter from "@/hooks/utils/useHandleRouter"

const Settings = () => {
  const { handleRedirect } = useHandleRouter()

  const items: ProfilePath[] = []

  items.push({
    path: ROUTES.NOTIFICATIONS,
    params: undefined,
    title: "Notifications",
    icon: <Notifications />,
  })

  return (
    <View style={mainStyle.container}>
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
      </ScrollView>
    </View>
  )
}

export default Settings
