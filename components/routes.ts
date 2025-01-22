import { RelativePathString, ExternalPathString } from "expo-router"

const ROUTES = {
  HOME: "/(main)/(tabs)/home" as RelativePathString,
  CONFIRM_EMAIL: "/(auth)/confirm-email" as RelativePathString,
  ONE_USER_PROFILE: "/(main)/(profile)/user" as RelativePathString,
  SEARCH: "/(main)/(search)/search" as RelativePathString,
  AUTH: "/(auth)" as RelativePathString,
  ONE_RUN: "/(main)/(runs)/run" as RelativePathString,
  ONE_USER: "/(main)/(user)/user" as RelativePathString,
  RUNS: "/(main)/(runs)/run" as RelativePathString,
  FORGET_PASSWORD: "(auth)/forget-password" as RelativePathString,
  ONE_MARATHON_LIVE: "/(main)/(marathon)/oneMarathonLive" as RelativePathString,
  ONE_MARATHON_UPCOMING:
    "/(main)/(marathon)/oneMarathonUpcoming" as RelativePathString,
} as const

export default ROUTES
