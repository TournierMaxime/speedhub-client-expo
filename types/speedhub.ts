import { Pathname } from "@/hooks/utils/useHandleRouter"

// Horaro Schedule and Ticker

interface Items {
  length: string
  length_t: number
  scheduled: string
  scheduled_t: number
  data: string[]
}

interface TickerSchedule {
  id: string
  name: string
  slug: string
  timezone: string
  start: string
  start_t: number
  setup: string
  setup_t: number
  updated: string
  columns: string[]
  link: string
}

interface TickerChildren {
  previous: Items
  current: Items
  next: Items
}

interface Schedule {
  scheduleId: string
  horaroScheduleId: string
  marathonId: string
  name: string
  link: string
  slug: string
  schedule: {
    data: string[]
    length: string
    length_t: number
    scheduled: string
    scheduled_t: number
  }[]
  createdAt: string
  updatedAt: string
  datetime: string
}

interface Ticker {
  tickerId: string
  horaroTickerId: string
  marathonId: string
  name: string
  link: string
  slug: string
  previous: {
    data: string[]
    length: string
    length_t: number
    scheduled: string
    scheduled_t: number
  }
  current: {
    data: string[]
    length: string
    length_t: number
    scheduled: string
    scheduled_t: number
  }
  next: {
    data: string[]
    length: string
    length_t: number
    scheduled: string
    scheduled_t: number
  }
  createdAt: string
  updatedAt: string
  datetime: string
}

// Marathons

interface Marathons {
  data: Marathon[]
}

interface Marathon {
  marathonId: string
  name: string
  link: string
  slug: string
  isLive: boolean
  twitchChannel: string
  createdAt: string
  updatedAt: string
  datetime: string
  endtime: string
  type: string
  schedule: Schedule
  ticker: Ticker
}

interface GetMarathon {
  marathonId: string
  name: string
  link: string
  slug: string
  twitchChannel: string
  isLive: boolean
  type: string
  datetime: string
  endTime: string
  isTweeted: boolean
  createdAt: string
  updatedAt: string
}

// Privacy Policy

interface PrivacyPolicyProps {
  title: string
  content: string[]
}

// Favorites

interface Favorites {
  data: {
    games: Favorite[]
    marathons: Favorite[]
    runners: Favorite[]
  }
}

interface Favorite {
  id?: string
  url?: string
  name: string
  image?: string
  type: "Runner" | "Marathon" | "Game"
  twitchChannel?: string
}

// Profile Path

interface ProfilePath {
  path: Pathname | undefined
  params?: any
  title: string
  icon?: React.JSX.Element
  action?: () => Promise<void>
}

// Video

type VideoPlatform = "youtube" | "youtu.be" | "twitch"

interface Video {
  videoUri?: string
  platform: VideoPlatform
  channel?: string
  width?: number
  height?: number
  isReddit?: boolean
}

interface User {
  userId: string
  pseudo: string
  image: string
  provider: string
  expoPushToken: string
  isEmailActive: boolean
}

interface GetSession {
  user: User
  favorites: Favorites
}

export {
  GetMarathon,
  GetSession,
  User,
  VideoPlatform,
  Video,
  ProfilePath,
  Favorites,
  Favorite,
  PrivacyPolicyProps,
  Schedule,
  Ticker,
  Items,
  TickerSchedule,
  TickerChildren,
  Marathon,
  Marathons,
}
