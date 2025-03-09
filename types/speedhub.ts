import { Pathname } from "@/hooks/utils/useHandleRouter"

// Horaro Schedule and Ticker

interface Links {
  rel: string
  uri: string
}

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
  id: string
  name: string
  slug: string
  timezone: string
  start: string
  start_t: number
  website: string
  twitter: string
  twitch: string
  description: string
  setup: string
  setup_t: number
  updated: string
  hidden_columns: string[]
  link: string
  columns: string[]
  items: Items[]
  links: Links[]
}

interface Ticker {
  ticker: {
    schedule: TickerSchedule
    ticker: TickerChildren
    links: Links[]
  }
}

// Marathons Live and Upcoming

interface Upcomings {
  data: Upcoming[]
}

interface Upcoming {
  horaroId: string
  scheduleId: string
  name: string
  link: string
  slug: string
  twitchChannel: string
  datetime: string
  schedules: {
    link: string
    name: string
  }[]
  createdAt: string
  schedule: Schedule
  ticker: {
    schedule: TickerSchedule
    ticker: TickerChildren
    links: Links[]
  }
}

interface Lives {
  data: Live[]
}

interface Live {
  horaroId: string
  scheduleId: string
  name: string
  link: string
  slug: string
  isLive: boolean
  twitchChannel: string
  createdAt: string
  schedule: Schedule
  ticker: {
    schedule: TickerSchedule
    ticker: TickerChildren
    links: Links[]
  }
}

// Privacy Policy

interface PrivacyPolicyProps {
  title: string
  content: string[]
}

// Favorites

interface Favorites {
  favorites: {
    data: {
      games: Favorite[]
      marathons: Favorite[]
      runners: Favorite[]
    }
  }
}

interface Favorite {
  id: string
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

export {
  ProfilePath,
  Favorites,
  Favorite,
  PrivacyPolicyProps,
  Schedule,
  Ticker,
  Items,
  TickerSchedule,
  TickerChildren,
  Lives,
  Upcomings,
  Live,
  Upcoming,
}
