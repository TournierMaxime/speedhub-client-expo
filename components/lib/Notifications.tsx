import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { PROJECT_ID } from "@/constants/Utils"

const registerForPushNotificationsAsync = async (): Promise<string> => {
  try {
    if (!Device.isDevice) {
      console.log("❌ Must use physical device for Push Notifications")
      return ""
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    console.log("🔐 Existing permission:", existingStatus)

    let finalStatus = existingStatus

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
      console.log("🔐 Permission after prompt:", status)
    }

    if (finalStatus !== "granted") {
      console.log("❌ Permission not granted, cannot get token.")
      return ""
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: PROJECT_ID,
    })
    console.log("✅ Expo Push Token:", token.data)

    return token.data
  } catch (err) {
    console.log("❌ Error while registering for push notifications:", err)
    return ""
  }
}

export default registerForPushNotificationsAsync
