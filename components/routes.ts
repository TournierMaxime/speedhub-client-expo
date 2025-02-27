import { RelativePathString, ExternalPathString } from "expo-router"

const ROUTES = {
  // Auth
  AUTH: "/(auth)" as RelativePathString,
  AUTH_SDC: "/(auth)/auth-sdc" as RelativePathString,
  FORGET_PASSWORD: "/(auth)/forget-password" as RelativePathString,
  CONFIRM_EMAIL: "/(auth)/confirm-email" as RelativePathString,

  // Profile
  SETTINGS: "/(tabs)/(main)/(profile)/settings" as RelativePathString,
  PRIVACY_POLICY:
    "/(tabs)/(main)/(profile)/privacy-policy" as RelativePathString,
  ONE_USER_PROFILE: "/(tabs)/(main)/(profile)/user" as RelativePathString,
  PROFILE: "/(tabs)/(main)/(profile)/profile" as RelativePathString,
  UPDATE_USERNAME:
    "/(tabs)/(main)/(profile)/update-username" as RelativePathString,
  UPDATE_EMAIL: "/(tabs)/(main)/(profile)/update-email" as RelativePathString,
  UPDATE_AVATAR: "/(tabs)/(main)/(profile)/update-avatar" as RelativePathString,

  // Utils
  SEARCH: "/(tabs)/(main)/(search)/search" as RelativePathString,

  //Tabs
  HOME: "/(tabs)/home" as RelativePathString,
  REDDITS: "/(tabs)/reddits" as RelativePathString,
  MARATHONS: "/(tabs)/marathons" as RelativePathString,
  RUNS: "/(tabs)/runs" as RelativePathString,

  // Views
  ONE_RUN: "/(tabs)/(main)/(runs)/run" as RelativePathString,
  ONE_USER: "/(tabs)/(main)/(user)/user" as RelativePathString,
  ONE_GAME: "/(tabs)/(main)/(games)/game" as RelativePathString,
  ONE_MARATHON_LIVE:
    "/(tabs)/(main)/(marathon)/oneMarathonLive" as RelativePathString,
  ONE_MARATHON_UPCOMING:
    "/(tabs)/(main)/(marathon)/oneMarathonUpcoming" as RelativePathString,
  ONE_REDDIT: "/(tabs)/(main)/(reddit)/reddit" as RelativePathString,
} as const

export default ROUTES
