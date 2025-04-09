import Constants from "expo-constants"

const { expoConfig } = Constants

const PROJECT_ID = expoConfig?.extra?.eas?.projectId
const TWITCH_TOKEN = expoConfig?.extra?.TWITCH_TOKEN
const TWITCH_CLIENT_ID = expoConfig?.extra?.TWITCH_CLIENT_ID
const EXPO_PUBLIC_SPEEDHUB_API = expoConfig?.extra?.EXPO_PUBLIC_SPEEDHUB_API
const EXPO_PUBLIC_REDDIT_API = expoConfig?.extra?.EXPO_PUBLIC_REDDIT_API
const EXPO_PUBLIC_TWITCH_PARENT_DOMAIN =
  expoConfig?.extra?.EXPO_PUBLIC_TWITCH_PARENT_DOMAIN
const EXPO_PUBLIC_TWITCH_API = expoConfig?.extra?.EXPO_PUBLIC_TWITCH_API
console.log("GOOGLE_SERVICES_JSON", expoConfig?.extra?.GOOGLE_SERVICES_JSON)
console.log(
  "EXPO_PUBLIC_SPEEDHUB_API",
  expoConfig?.extra?.EXPO_PUBLIC_SPEEDHUB_API
)
export {
  PROJECT_ID,
  TWITCH_TOKEN,
  TWITCH_CLIENT_ID,
  EXPO_PUBLIC_SPEEDHUB_API,
  EXPO_PUBLIC_REDDIT_API,
  EXPO_PUBLIC_TWITCH_PARENT_DOMAIN,
  EXPO_PUBLIC_TWITCH_API,
}
