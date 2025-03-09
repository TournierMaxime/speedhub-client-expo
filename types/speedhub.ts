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

// SDC V2

interface GetLatestLeaderboardCategories {
  id: string
  name: string
  url: string
  pos: number
  gameId: string
  isMisc: boolean
  isPerLevel: boolean
  numPlayers: number
  exactPlayers: boolean
  playerMatchMode: number
  timeDirection: number
  enforceMs: boolean
  archived: boolean
  rules: string
}

interface GetLatestLeaderboardGames {
  id: string
  name: string
  url: string
  type: string
  loadtimes: boolean
  milliseconds: boolean
  igt: boolean
  verification: boolean
  autoVerify: boolean
  requireVideo: boolean
  emulator: number
  defaultTimer: number
  validTimers: number[]
  releaseDate: number
  addedDate: number
  touchDate: number
  coverPath: string
  trophy1stPath: string
  trophy2ndPath: string
  trophy3rdPath: string
  runCommentsMode: number
  runCount: number
  activePlayerCount: number
  totalPlayerCount: number
  boostReceivedCount: number
  boostDistinctDonorsCount: number
  rules: string
  viewPowerLevel: number
  platformIds: any[]
  regionIds: any[]
  gameTypeIds: any[]
  websiteUrl: string
  discordUrl: string
  defaultView: number
  guidePermissionType: number
  resourcePermissionType: number
  staticAssets: {
    assetType: string
    path: string
  }[]
}

interface GetLatestLeaderboardLevels {
  id: string
  gameId: string
  name: string
  url: string
  pos: number
  rules: string
  archived: boolean
}

interface GetLatestLeaderboardPlatforms {
  id: string
  name: string
  url: string
  year: number
}

interface GetLatestLeaderboardPlayers {
  id: string
  name: string
  url: string
  powerLevel: number
  color1Id: string
  color2Id: string
  colorAnimate: number
  areaId: string
}

interface GetLatestLeaderboardRegions {}

interface GetLatestLeaderboardRuns {
  id: string
  gameId: string
  categoryId: string
  time: number
  platformId: string
  emulator: boolean
  video: string
  submittedById: string
  verified: number
  verifiedById: string
  date: number
  dateSubmitted: number
  dateVerified: number
  hasSplits: boolean
  videoState: number
  obsolete: boolean
  place: number
  issues: any
  playerIds: string[]
  valueIds: string[]
}

interface GetLatestLeaderboardValues {
  id: string
  name: string
  url: string
  pos: number
  variableId: string
  isMisc: boolean
  archived: boolean
}

interface GetLatestLeaderboardVariables {
  id: string
  name: string
  url: string
  pos: number
  gameId: string
  categoryScope: number
  categoryId: string
  levelScope: number
  isMandatory: boolean
  isSubcategory: boolean
  isUserDefined: boolean
  isObsoleting: boolean
  defaultValue: string
  archived: boolean
  displayMode: number
}

interface GetLatestLeaderboard {
  categories: GetLatestLeaderboardCategories[]
  games: GetLatestLeaderboardGames[]
  levels: GetLatestLeaderboardLevels[]
  platforms: GetLatestLeaderboardPlatforms[]
  players: GetLatestLeaderboardPlayers[]
  regions: GetLatestLeaderboardRegions[]
  runs: GetLatestLeaderboardRuns[]
  values: GetLatestLeaderboardValues[]
  variables: GetLatestLeaderboardVariables[]
}

export {
  GetLatestLeaderboard,
  GetLatestLeaderboardCategories,
  GetLatestLeaderboardGames,
  GetLatestLeaderboardLevels,
  GetLatestLeaderboardPlatforms,
  GetLatestLeaderboardPlayers,
  GetLatestLeaderboardRegions,
  GetLatestLeaderboardRuns,
  GetLatestLeaderboardValues,
  GetLatestLeaderboardVariables,
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
