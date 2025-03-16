import axios from "axios"
import {
  EXPO_PUBLIC_SPEEDHUB_API,
  EXPO_PUBLIC_SPEEDRUNDOTCOM_API,
  EXPO_PUBLIC_SPEEDRUNDOTCOM_API_V2,
  EXPO_PUBLIC_SPLITIO_API,
  EXPO_PUBLIC_REDDIT_API,
  EXPO_PUBLIC_TWITCH_API,
} from "@/constants/Utils"

const speedHubApi = axios.create({
  baseURL: EXPO_PUBLIC_SPEEDHUB_API,
  withCredentials: true,
})

const speedRunDotComApi = axios.create({
  baseURL: EXPO_PUBLIC_SPEEDRUNDOTCOM_API,
})

const speedRunDotComApiV2 = axios.create({
  baseURL: EXPO_PUBLIC_SPEEDRUNDOTCOM_API_V2,
})

const splitIOApi = axios.create({
  baseURL: EXPO_PUBLIC_SPLITIO_API,
})

const redditApi = axios.create({
  baseURL: EXPO_PUBLIC_REDDIT_API,
})

const twitchApi = axios.create({
  baseURL: EXPO_PUBLIC_TWITCH_API,
})

export {
  speedHubApi,
  speedRunDotComApi,
  splitIOApi,
  redditApi,
  speedRunDotComApiV2,
  twitchApi,
}
