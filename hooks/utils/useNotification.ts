import { useEffect } from "react"
import * as Notifications from "expo-notifications"
import registerForPushNotificationsAsync from "@/components/lib/Notifications"
import useHandleRouter from "./useHandleRouter"
import { useAuth } from "@/contexts/AuthContext"

const useNotification = () => {
  const { handleRedirect } = useHandleRouter()
  const { user } = useAuth()

  // Dernière notif cliquée
  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  useEffect(() => {
    // Handler global des notifs (quand l'app est ouverte)
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })
  }, [])

  // Enregistrement du token push si pas encore enregistré
  useEffect(() => {
    if (user && !user.expoPushToken) {
      registerForPushNotificationsAsync()
    }
  }, [user])

  // Gérer la notification reçue en foreground ou via clic
  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const { data } = lastNotificationResponse.notification.request.content
      handleNotificationRedirect(data)
    }
  }, [lastNotificationResponse])

  // Gérer la notification qui aurait ouvert l'app (à froid)
  useEffect(() => {
    const checkInitialNotification = async () => {
      const initialNotification =
        await Notifications.getLastNotificationResponseAsync()
      if (initialNotification) {
        const { data } = initialNotification.notification.request.content
        handleNotificationRedirect(data)
      }
    }

    checkInitialNotification()
  }, [])

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const data = notification.request.content.data
        handleNotificationRedirect(data)
      }
    )

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data
        handleNotificationRedirect(data)
      })

    return () => {
      receivedSubscription.remove()
      responseSubscription.remove()
    }
  }, [])

  // Redirection sécurisée (évite erreurs de viewState en Android)
  const handleNotificationRedirect = (data: any) => {
    console.log("handleNotificationRedirect", data)
    if (!data?.url) return

    setTimeout(() => {
      handleRedirect(data.url, {
        ...(data.params || {}),
      })
    }, 250) // Attendre que la view soit prête (évite crashs Surface)
  }
}

export default useNotification
