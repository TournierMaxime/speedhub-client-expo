import axios from "axios"

const speedHubApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SPEEDHUB_API,
  withCredentials: true,
})

export { speedHubApi }