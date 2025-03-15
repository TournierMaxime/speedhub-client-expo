import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import mainStyle from "@/styles/base/main"
import Header from "@/components/lib/Header"
import ROUTES from "@/components/routes"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/contexts/AuthContext"
import { GetSession } from "@/types/speedhub"
import { authService } from "@/services/speedhub"
import profileStyle from "@/styles/views/profile"
import Utils from "@/components/lib/Utils"

export default function Notifications() {
  const { user } = useAuth()

  const userId = user?.userId

  const { data, isLoading, error } = useQuery<GetSession>({
    queryKey: ["getSession", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Missing UserId")
      return await authService.getSession(userId)
    },
    enabled: !!userId,
  })
  console.log(data)
  return (
    <View style={mainStyle.container}>
      <Header backButton={true} lastPath={{ pathname: ROUTES.SETTINGS }} />
      <View style={profileStyle.container}>
        <TouchableOpacity
          style={[
            profileStyle.item,
            {
              borderTopWidth: Utils.moderateScale(2),
              borderBottomWidth: Utils.moderateScale(2),
            },
          ]}
        >
          <Text style={profileStyle.itemText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            profileStyle.item,
            { borderBottomWidth: Utils.moderateScale(2) },
          ]}
        >
          <Text style={profileStyle.itemText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
