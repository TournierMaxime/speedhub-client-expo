import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, View, Switch } from "react-native"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/contexts/AuthContext"
import { GetSession } from "@/types/speedhub"
import { authService, userService } from "@/services/speedhub"
import mainStyle from "@/styles/base/main"
import profileStyle from "@/styles/views/profile"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import ROUTES from "@/components/routes"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"

export default function Notifications() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const userId = user?.userId

  const { data, isLoading } = useQuery<GetSession>({
    queryKey: ["getSession", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Missing UserId")
      return await authService.getSession(userId)
    },
    enabled: !!userId,
  })

  const [isEmailActive, setIsEmailActive] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)

  useEffect(() => {
    if (data?.user) {
      setIsEmailActive(!!data.user.isEmailActive)
      setExpoPushToken(data.user.expoPushToken ?? null)
    }
  }, [data])

  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: {
      isEmailActive?: boolean
      expoPushToken?: string
    }) => {
      if (!userId) throw new Error("Missing UserId")
      return await userService.updateUser(userId, {
        isEmailActive: updates.isEmailActive,
        expoPushToken: updates.expoPushToken,
      })
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["getSession", userId] })
      }
    },
  })

  const toggleEmailSwitch = (newValue: boolean) => {
    setIsEmailActive(newValue)
    updatePreferencesMutation.mutate({ isEmailActive: newValue })
  }

  const toggleNotificationSwitch = async (newValue: boolean) => {
    if (newValue) {
      const newToken = await registerForPushNotificationsAsync()
      console.log("📦 Token returned to switch:", newToken)

      if (!newToken) {
        alert("Impossible d'obtenir le token de notifications.")
        return
      }

      setExpoPushToken(newToken)
      updatePreferencesMutation.mutate({ expoPushToken: newToken })
    } else {
      setExpoPushToken(null)
      updatePreferencesMutation.mutate({ expoPushToken: "" })
    }
  }

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
          <Switch onValueChange={toggleEmailSwitch} value={isEmailActive} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            profileStyle.item,
            { borderBottomWidth: Utils.moderateScale(2) },
          ]}
        >
          <Text style={profileStyle.itemText}>Notifications</Text>
          <Switch
            onValueChange={toggleNotificationSwitch}
            value={!!expoPushToken}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
