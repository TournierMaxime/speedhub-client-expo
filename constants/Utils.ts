import Constants from "expo-constants"

const { expoConfig } = Constants

const TWITCH_TOKEN = expoConfig?.extra?.TWITCH_TOKEN
const TWITCH_CLIENT_ID = expoConfig?.extra?.TWITCH_CLIENT_ID

export { TWITCH_TOKEN, TWITCH_CLIENT_ID }
