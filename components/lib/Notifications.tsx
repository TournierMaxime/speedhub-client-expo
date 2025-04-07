import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { PROJECT_ID } from "@/constants/Utils"

const registerForPushNotificationsAsync = async () => {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      throw new Error("Failed to get push token for push notification!")
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: PROJECT_ID,
      })
    ).data
  } else {
    throw new Error("Must use physical device for Push Notifications")
  }

  return token
}

export default registerForPushNotificationsAsync
