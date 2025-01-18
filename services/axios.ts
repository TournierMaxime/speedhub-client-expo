import axios from "axios"

const speedHubApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SPEEDHUB_API,
  withCredentials: true,
})

const speedRunDotComApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SPEEDRUNDOTCOM_API,
})

const splitIOApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SPLITIO_API,
})

export { speedHubApi, speedRunDotComApi, splitIOApi }
