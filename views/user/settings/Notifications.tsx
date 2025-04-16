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

  const [isEmailActive, setIsEmailActive] = useState({
    live: false,
    upcoming: false,
    reddit: false,
  })
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)

  useEffect(() => {
    if (data && data.user.Notification.length > 0) {
      const notif = data.user.Notification
      setIsEmailActive({
        live:
          notif.find((n) => n.category === "live" && n.type === "email")
            ?.enabled ?? false,
        upcoming:
          notif.find((n) => n.category === "upcoming" && n.type === "email")
            ?.enabled ?? false,
        reddit:
          notif.find((n) => n.category === "reddit" && n.type === "email")
            ?.enabled ?? false,
      })
    }

    if (data?.user?.expoPushToken) {
      setExpoPushToken(data.user.expoPushToken)
    }
  }, [data])

  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: { expoPushToken?: string }) => {
      if (!userId) throw new Error("Missing UserId")
      return await userService.updateUser(userId, {
        expoPushToken: updates.expoPushToken,
      })
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["getSession", userId] })
      }
    },
  })

  const updateNotificationEmailMutation = useMutation({
    mutationFn: async ({
      type,
      category,
      enabled,
    }: {
      type: "email" | "push"
      category: "live" | "upcoming" | "reddit"
      enabled: boolean
    }) => {
      if (!userId) throw new Error("Missing UserId")
      return await userService.createNotification(userId, {
        type,
        category,
        enabled,
      })
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["getSession", userId] })
      }
    },
  })

  const deleteNotificationMutation = useMutation({
    mutationFn: async ({
      userId,
      notificationId,
    }: {
      userId: string
      notificationId: string
    }) => {
      return await userService.deleteNotification(notificationId, userId)
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["getSession", userId] })
      }
    },
  })

  const toggleEmailCategory =
    (category: keyof typeof isEmailActive) => (newValue: boolean) => {
      const updatedState = {
        ...isEmailActive,
        [category]: newValue,
      }
      setIsEmailActive(updatedState)

      const existingNotification = data?.user.Notification.find(
        (n) => n.category === category && n.type === "email"
      )

      if (newValue === true) {
        // Activation => créer la notif
        updateNotificationEmailMutation.mutate({
          type: "email",
          category,
          enabled: true,
        })
      } else if (existingNotification) {
        // Désactivation => supprimer la notif si elle existe
        deleteNotificationMutation.mutate({
          userId: userId ?? "",
          notificationId: existingNotification.notificationId,
        })
      }
    }

  const toggleNotificationSwitch = async (newValue: boolean) => {
    if (!userId) return

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
      // Supprimer le token
      setExpoPushToken(null)
      updatePreferencesMutation.mutate({ expoPushToken: "" })

      // Supprimer toutes les notifications de type "push"
      const pushNotifications = data?.user.Notification.filter(
        (n) => n.type === "push"
      )

      if (pushNotifications && pushNotifications.length > 0) {
        pushNotifications.forEach((n) => {
          deleteNotificationMutation.mutate({
            userId,
            notificationId: n.notificationId,
          })
        })
      }
    }
  }

  const togglePushCategory =
    (category: keyof typeof isEmailActive) => (newValue: boolean) => {
      const existingNotification = data?.user.Notification.find(
        (n) => n.category === category && n.type === "push"
      )

      if (newValue === true) {
        updateNotificationEmailMutation.mutate({
          type: "push",
          category,
          enabled: true,
        })
      } else if (existingNotification) {
        deleteNotificationMutation.mutate({
          userId: userId ?? "",
          notificationId: existingNotification.notificationId,
        })
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
            },
          ]}
        >
          <Text style={profileStyle.itemText}>Notified by email</Text>
        </TouchableOpacity>
        <View
          style={[
            profileStyle.item,
            {
              borderBottomWidth: Utils.moderateScale(2),
              marginLeft: Utils.moderateScale(10),
            },
          ]}
        >
          <Text style={profileStyle.itemText}>Upcoming marathon</Text>
          <Switch
            onValueChange={toggleEmailCategory("upcoming")}
            value={isEmailActive.upcoming}
          />
        </View>
        <View
          style={[
            profileStyle.item,
            {
              borderBottomWidth: Utils.moderateScale(2),
              marginLeft: Utils.moderateScale(10),
            },
          ]}
        >
          <Text style={profileStyle.itemText}>Live marathon</Text>
          <Switch
            onValueChange={toggleEmailCategory("live")}
            value={isEmailActive.live}
          />
        </View>
        <View
          style={[
            profileStyle.item,
            {
              borderBottomWidth: Utils.moderateScale(2),
              marginLeft: Utils.moderateScale(10),
            },
          ]}
        >
          <Text style={profileStyle.itemText}>News</Text>
          <Switch
            onValueChange={toggleEmailCategory("reddit")}
            value={isEmailActive.reddit}
          />
        </View>
        <TouchableOpacity
          style={[
            profileStyle.item,
            {
              borderBottomWidth: Utils.moderateScale(2),
            },
          ]}
        >
          <Text style={profileStyle.itemText}>
            Notified by push notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            profileStyle.item,
            {
              borderBottomWidth: Utils.moderateScale(2),
              marginLeft: Utils.moderateScale(10),
            },
          ]}
        >
          <Text style={profileStyle.itemText}>Enable notifications</Text>
          <Switch
            onValueChange={toggleNotificationSwitch}
            value={!!expoPushToken}
          />
        </TouchableOpacity>
        {expoPushToken && (
          <>
            <View
              style={[
                profileStyle.item,
                { marginLeft: Utils.moderateScale(10) },
              ]}
            >
              <Text style={profileStyle.itemText}>Upcoming marathon</Text>
              <Switch
                onValueChange={togglePushCategory("upcoming")}
                value={
                  !!data?.user.Notification.find(
                    (n) => n.type === "push" && n.category === "upcoming"
                  )
                }
              />
            </View>
            <View
              style={[
                profileStyle.item,
                { marginLeft: Utils.moderateScale(10) },
              ]}
            >
              <Text style={profileStyle.itemText}>Live marathon</Text>
              <Switch
                onValueChange={togglePushCategory("live")}
                value={
                  !!data?.user.Notification.find(
                    (n) => n.type === "push" && n.category === "live"
                  )
                }
              />
            </View>
            <View
              style={[
                profileStyle.item,
                { marginLeft: Utils.moderateScale(10) },
              ]}
            >
              <Text style={profileStyle.itemText}>News</Text>
              <Switch
                onValueChange={togglePushCategory("reddit")}
                value={
                  !!data?.user.Notification.find(
                    (n) => n.type === "push" && n.category === "reddit"
                  )
                }
              />
            </View>
          </>
        )}
      </View>
    </View>
  )
}
