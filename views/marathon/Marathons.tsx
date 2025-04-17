import React from "react"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import { BroadCast, Calendar, Chevron } from "@/components/lib/Icons"
import { ScrollView, TouchableOpacity, Text } from "react-native"
import Utils from "@/components/lib/Utils"
import profileStyle from "@/styles/views/profile"

const AllMarathons = () => {
  const { handleRedirect } = useHandleRouter()

  const links: any[] = [
    {
      path: ROUTES.LIVES,
      params: undefined,
      title: "Live",
      icon: <BroadCast />,
    },
    {
      path: ROUTES.UPCOMING,
      params: undefined,
      title: "Upcoming",
      icon: <Calendar />,
    },
  ]

  return (
    <ScrollView style={profileStyle.container}>
      {links.map((link, idx) => {
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
              link.path ? handleRedirect(link.path, link.params) : undefined
            }
          >
            <Text style={profileStyle.itemText}>
              {link.icon} {link.title}
            </Text>
            <Chevron />
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

export default AllMarathons
