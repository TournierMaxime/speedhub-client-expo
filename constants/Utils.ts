import Constants from "expo-constants"

const { expoConfig } = Constants

const TWITCH_TOKEN = expoConfig?.extra?.TWITCH_TOKEN
const TWITCH_CLIENT_ID = expoConfig?.extra?.TWITCH_CLIENT_ID
const EXPO_PUBLIC_SPEEDHUB_API = "https://api.speedrunfrance.fr/api/v1"
const EXPO_PUBLIC_SPEEDRUNDOTCOM_API = "https://www.speedrun.com/api/v1"
const EXPO_PUBLIC_SPEEDRUNDOTCOM_API_V2 = "https://www.speedrun.com/api/v2"
const EXPO_PUBLIC_SPLITIO_API = "https://splits.io/api/v3"
const EXPO_PUBLIC_REDDIT_API = "https://www.reddit.com/r/speedrun"
const EXPO_PUBLIC_TWITCH_PARENT_DOMAIN = "speedrunfrance.fr"
const EXPO_PUBLIC_TWITCH_API = "https://api.twitch.tv/helix"

export {
  TWITCH_TOKEN,
  TWITCH_CLIENT_ID,
  EXPO_PUBLIC_SPEEDHUB_API,
  EXPO_PUBLIC_SPEEDRUNDOTCOM_API,
  EXPO_PUBLIC_SPEEDRUNDOTCOM_API_V2,
  EXPO_PUBLIC_SPLITIO_API,
  EXPO_PUBLIC_REDDIT_API,
  EXPO_PUBLIC_TWITCH_PARENT_DOMAIN,
  EXPO_PUBLIC_TWITCH_API,
}
