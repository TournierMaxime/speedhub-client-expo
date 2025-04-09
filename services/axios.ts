import axios from "axios"
import {
  EXPO_PUBLIC_SPEEDHUB_API,
  EXPO_PUBLIC_REDDIT_API,
  EXPO_PUBLIC_TWITCH_API,
} from "@/constants/Utils"

const speedHubApi = axios.create({
  baseURL: EXPO_PUBLIC_SPEEDHUB_API,
  withCredentials: true,
})

const redditApi = axios.create({
  baseURL: EXPO_PUBLIC_REDDIT_API,
})

const twitchApi = axios.create({
  baseURL: EXPO_PUBLIC_TWITCH_API,
})

export { speedHubApi, redditApi, twitchApi }
