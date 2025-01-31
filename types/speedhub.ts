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

interface Lives {
  data: {
    horaroId: string
    scheduleId: string | null
    name: string
    link: string
    slug: string
    isLive: boolean
    createdAt: string
    schedule: Schedule
    ticker: {
      schedule: TickerSchedule
      ticker: TickerChildren
      links: Links[]
    }
  }[]
}

interface Upcomings {
  data: {
    horaroId: string
    scheduleId: string | null
    name: string
    link: string
    slug: string
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
  }[]
}

interface Live {
  horaroId: string
  scheduleId: string
  name: string
  link: string
  slug: string
  isLive: boolean
  createdAt: string
  schedule: Schedule
  ticker: {
    schedule: TickerSchedule
    ticker: TickerChildren
    links: Links[]
  }
}

interface Upcoming {
  horaroId: string
  scheduleId: string
  name: string
  link: string
  slug: string
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

export {
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
