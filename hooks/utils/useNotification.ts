import { useEffect } from "react"
import * as Notifications from "expo-notifications"
import registerForPushNotificationsAsync from "../../components/lib/Notifications"
import { useRouter } from "expo-router"
import { useAuth } from "@/contexts/AuthContext"

const useNotification = () => {
  const router = useRouter()
  const { user } = useAuth()
  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })

    if (!user?.expoPushToken) {
      // Enregistrer pour les notifications push dès le chargement du composant
      registerForPushNotificationsAsync()
    }

    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const { data } = lastNotificationResponse.notification.request.content
      handleNotificationRedirect(data)
    }

    // Vérifier si l'app a été ouverte par une notification
    const checkInitialNotification = async () => {
      const initialNotification =
        await Notifications.getLastNotificationResponseAsync()

      if (initialNotification) {
        const { data } = initialNotification.notification.request.content
        handleNotificationRedirect(data)
      }
    }

    checkInitialNotification()

    // Ajouter un écouteur pour les notifications reçues pendant que l'app est ouverte ou en arrière-plan
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const data = notification.request.content.data
        handleNotificationRedirect(data)
      }
    )

    // Ajouter un écouteur pour les réponses aux notifications (l'utilisateur appuie sur la notification)
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data
        handleNotificationRedirect(data)
      })

    // Nettoyer les écouteurs lors du démontage du composant
    return () => {
      Notifications.removeNotificationSubscription(subscription)
      Notifications.removeNotificationSubscription(responseSubscription)
    }
  }, [lastNotificationResponse])

  const handleNotificationRedirect = (data: any) => {
    if (data) {
      router.push({
        pathname: data.redirect,
        params: {
          userId: data.userId ?? null,
          screen: data.screen ?? null,
          articleId: data.articleId ?? null,
        },
      })
    }
  }
}

export default useNotification
