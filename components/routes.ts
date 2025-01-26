import { RelativePathString, ExternalPathString } from "expo-router"

const ROUTES = {
  HOME: "/(tabs)/home" as RelativePathString,
  CONFIRM_EMAIL: "/(auth)/confirm-email" as RelativePathString,
  ONE_USER_PROFILE: "/(tabs)/(main)/(profile)/user" as RelativePathString,
  SEARCH: "/(tabs)/(main)/(search)/search" as RelativePathString,
  AUTH: "/(auth)" as RelativePathString,
  ONE_RUN: "/(tabs)/(main)/(runs)/run" as RelativePathString,
  ONE_USER: "/(tabs)/(main)/(user)/user" as RelativePathString,
  ONE_GAME: "/(tabs)/(main)/(games)/game" as RelativePathString,
  RUNS: "/(tabs)/(main)/(runs)/run" as RelativePathString,
  FORGET_PASSWORD: "/(auth)/forget-password" as RelativePathString,
  ONE_MARATHON_LIVE:
    "/(tabs)/(main)/(marathon)/oneMarathonLive" as RelativePathString,
  ONE_MARATHON_UPCOMING:
    "/(tabs)/(main)/(marathon)/oneMarathonUpcoming" as RelativePathString,
  ONE_REDDIT: "/(tabs)/(main)/(reddit)/reddit" as RelativePathString,
} as const

export default ROUTES
