interface EmbedGame {
  data: {
    id: string
    name: string
    links: Links[]
  }[]
}

interface Links {
  rel: string
  uri: string
}

interface Assets {
  logo: { uri: string }
  "cover-tiny": { uri: string }
  "cover-small": { uri: string }
  "cover-medium": { uri: string }
  "cover-large": { uri: string }
  icon: { uri: string }
  image: { uri: string }
  "trophy-1st": { uri: string }
  "trophy-2nd": { uri: string }
  "trophy-3rd": { uri: string }
  background: { uri: string }
  foreground: { uri: string }
}

interface Times {
  primary_t: number
  realtime_t: number
}

interface Values {
  values: {
    [key: string]: {
      label: string
      rules: string
      flags: {
        miscellaneous: boolean
      }
    }
  }
  default: string
}

interface Run {
  data: {
    id: string
    game: {
      data: {
        id: string
        names: {
          international: string
        }
        assets: Assets
      }
    }
    category: {
      data: {
        id: string
        name: string
      }
    }
    videos: {
      links: Links[]
    }
    comment: string
    status: {
      status: string
      "verify-date": string
    }
    players: {
      data: {
        id: string
        names: {
          international: string
        }
        "name-style": {
          style: string
          "color-from": {
            light: string
            dark: string
          }
          "color-to": {
            light: string
            dark: string
          }
        }
        assets: Assets
      }[]
    }
    date: string
    submitted: string
    times: Times
    splits: {
      rel: string
      uri: string
    }
    platform: {
      data: {
        id: string
        name: string
        released: number
      }
    }
  }
}

interface Runs {
  data: {
    id: string
    game: {
      data: {
        id: string
        names: { international: string }
        assets: Assets
      }
    }
    category: {
      data: { id: string; name: string }
    }
    players: {
      data: {
        names: {
          international: string
        }
        "name-style": {
          style: string
          color: {
            light: string
            dark: string
          }
        }
      }[]
    }
    times: Times
  }[]
}

interface User {
  data: {
    id: string
    names: {
      international: string
    }
    "name-style": {
      style: string
      "color-from": {
        light: string
        dark: string
      }
      "color-to": {
        light: string
        dark: string
      }
    }
    role: string
    signup: string
    location: {
      country: {
        code: string
        names: {
          international: string
        }
      }
      region: {
        code: string
        names: {
          international: string
        }
      }
    }
    twitch: {
      uri: string
    }
    hitbox: {
      uri: string
    }
    youtube: {
      uri: string
    }
    twitter: {
      uri: string
    }
    speedrunslive: {
      uri: string
    }
    assets: Assets
  }
}

interface PersonalBests {
  data: {
    place: number
    run: {
      id: string
      weblink: string
      game: string
      level: string
      category: string
      videos: {
        links: Links[]
      }
      comment: string
      status: {
        status: string
        examiner: string
        "verify-date": string
      }
      date: string
      submitted: string
      times: Times
      splits: {
        uri: string
      }
    }
    game: {
      data: {
        id: string
        names: {
          international: string
        }
        weblink: string
        discord: string
        released: number
        "release-date": string
        created: string
        assets: Assets
      }
    }
    category: {
      data: {
        id: string
        name: string
        weblink: string
      }
    }
    platform: {
      data: {
        id: string
        name: string
        released: number
      }
    }
  }[]
}

interface Splits {
  run: {
    attempts: number
    category: {
      created_at: string
      id: number
      name: string
      updated_at: string
    }
    created_at: string
    game: {
      created_at: string
      id: number
      name: string
      shortname: string
      updated_at: string
    }
    id: number
    image_url: string
    name: string
    path: string
    program: string
    splits: {
      best: {
        duration: number
      }
      duration: number
      finish_time: number
      gold: boolean
      history: number[]
      name: string
      reduced: boolean
      skipped: boolean
    }[]
  }
}

interface Game {
  data: {
    id: string
    names: {
      international: string
    }
    abbreviation: string
    weblink: string
    discord: string
    released: number
    "release-date": string
    ruleset: {
      "show-milliseconds": boolean
      "require-verification": boolean
      "require-video": boolean
      "run-times": string[]
      "default-time": string
      "emulators-allowed": boolean
    }
    romhack: boolean
    gametypes: EmbedGame
    platforms: EmbedGame
    regions: EmbedGame
    genres: EmbedGame
    engines: EmbedGame
    developers: EmbedGame
    publishers: EmbedGame
    moderators: {
      data: {
        id: string
        names: {
          international: string
        }
      }[]
    }
    categories: {
      data: {
        id: string
        name: string
        weblink: string
        type: string
        rules: string
        links: Links[]
        variables: {
          data: [
            {
              id: string
              name: string
              category: string
              scope: {
                type: string
              }
              mandatory: boolean
              "user-defined": boolean
              obsoletes: boolean
              values: Values
              "is-subcategory": boolean
              links: Links[]
            }
          ]
        }
      }[]
    }
    created: string
    assets: Assets
    links: Links[]
  }
}

interface LeaderBoard {
  data: {
    weblink: string
    game: string
    category: string
    runs: [
      {
        place: number
        run: {
          id: string
          weblink: string
          game: string
          category: string
          videos: {
            links: Links[]
          }
          players: [
            {
              rel: string
              id: string
              uri: string
            }
          ]
          date: string
          submitted: string
          times: Times
        }
      }
    ]
    links: Links[]

    players: {
      data: [
        {
          id: string
          names: {
            international: string
          }
          weblink: string
          links: Links[]
        }
      ]
    }
  }
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

interface ArticleGameList {
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

interface ArticleUserList {
  id: string
  name: string
  url: string
  powerLevel: number
  pronouns: string[]
  areaId: string
  color1Id: string
  color2Id: string
  avatarDecoration: {
    enabled: boolean
  }
  iconType: number
  onlineDate: number
  signupDate: number
  touchDate: number
  staticAssets: {
    assetType: string
    path: string
  }[]
}

interface ArticleList {
  id: string
  slug: string
  title: string
  summary: string
  body: string
  userId: string
  createDate: number
  updateDate: number
  stickyDate: number
  publishDate: number
  publishTarget: string
  publishTags: string[]
  coverImagePath: string
  commentsCount: number
}

interface Articles {
  articleList: ArticleList[]
  pagination: {
    count: number
    page: number
    pages: number
    per: number
  }
  gameList: ArticleGameList[]
  userList: ArticleUserList[]
}

interface RelatedArticleList {
  id: string
  slug: string
  title: string
  summary: string
  body: string
  userId: string
  gameId: string
  createDate: number
  updateDate: number
  publishDate: number
  publishTarget: string
  publishTags: string[]
  coverImagePath: string
  commentsCount: number
}

interface ArticleContent {
  id: string
  slug: string
  title: string
  summary: string
  body: string
  userId: string
  createDate: number
  updateDate: number
  stickyDate: number
  publishDate: number
  publishTarget: string
  publishTags: string[]
  coverImagePath: string
  commentsCount: number
}

interface Article {
  article: ArticleContent
  relatedArticleList: RelatedArticleList[]
  gameList: ArticleGameList[]
  userList: ArticleUserList[]
}

interface SearchGameList {
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
    assetType: "cover"
    path: string
  }[]
}

interface SearchUserList {
  id: string
  name: string
  url: string
  powerLevel: number
  pronouns: string[]
  areaId: string
  color1Id: string
  color2Id: string
  avatarDecoration: {
    enabled: boolean
  }
  iconType: number
  onlineDate: number
  signupDate: number
  touchDate: number
  staticAssets: {
    assetType: "image" | "icon"
    path: string
  }[]
}

interface Search {
  newsList: []
  pageList: []
  seriesList: []
  challengeList: []
  gameList: SearchGameList[]
  userList: SearchUserList[]
}

interface GetRunGame {
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

interface GetRunCategory {
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

interface GetRunPlatform {
  id: string
  name: string
  url: string
  year: number
}

interface GetRunPlayers {
  id: string
  name: string
  url: string
  powerLevel: number
  color1Id: string
  color2Id: string
  colorAnimate: number
  areaId: string
}

interface GetRunRegion {
  id: string
  name: string
  url: string
  flag: string
}

interface GetOneRun {
  id: string
  gameId: string
  categoryId: string
  time: number
  platformId: string
  emulator: boolean
  regionId: string
  video: string
  comment: string
  submittedById: string
  verified: number
  verifiedById: string
  reason: string
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

interface GetRunUsers {
  id: string
  name: string
  url: string
  powerLevel: number
  pronouns: string[]
  areaId: string
  color1Id: string
  color2Id: string
  avatarDecoration: {
    enabled: boolean
  }
  iconType: number
  onlineDate: number
  signupDate: number
  touchDate: number
  staticAssets: {
    assetType: string
    path: string
  }[]
}

interface GetRunValues {
  id: string
  name: string
  url: string
  pos: number
  variableId: string
  isMisc: boolean
  rules: string
  archived: boolean
}

interface GetRunVariables {
  id: string
  name: string
  url: string
  pos: number
  gameId: string
  categoryScope: number
  levelScope: number
  isMandatory: boolean
  isSubcategory: boolean
  isUserDefined: boolean
  isObsoleting: boolean
  defaultValue: string
  archived: boolean
  description: string
  displayMode: number
}

interface GetRun {
  game: GetRunGame
  category: GetRunCategory
  platform: GetRunPlatform
  players: GetRunPlayers[]
  region: GetRunRegion
  run: GetOneRun
  users: GetRunUsers[]
  values: GetRunValues[]
  variables: GetRunVariables[]
}

interface GuideList {
  id: string
  name: string
  text: string
  date: number
  userId: string
  gameId: string
}

interface GuideUsers {
  id: string
  name: string
  url: string
  powerLevel: number
  pronouns: string[]
  areaId: string
  color1Id: string
  color2Id: string
  avatarDecoration: {
    enabled: boolean
  }
  iconType: number
  onlineDate: number
  signupDate: number
  touchDate: number
  titleId: string
  staticAssets: {
    assetType: string
    path: string
  }[]
}

interface GetGuideList {
  guideList: GuideList[]
  users: GuideUsers[]
}

interface GetGameSummaryGame {
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
  platformIds: string[]
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

interface GetGameSummaryGameBoosts {
  id: string
  createdAt: number
  updatedAt: number
  gameId: string
  donorUserId: string
  anonymous: boolean
  recipientUserIds: any[]
}

interface GetGameSummaryGameModerators {
  gameId: string
  userId: string
  level: number
}

interface GetGameSummaryForum {
  id: string
  name: string
  url: string
  description: string
  type: number
  threadCount: number
  postCount: number
  lastPostId: string
  lastPostDate: number
  lastPostUserId: string
  touchDate: number
}

interface GetGameSummaryNewsList {
  id: string
  gameId: string
  userId: string
  title: string
  body: string
  dateSubmitted: number
  dateEdited: number
}

interface GetGameSummaryGameStats {
  gameId: string
  totalRuns: number
  totalRunsFG: number
  totalRunsIL: number
  totalRunTime: number
  recentRuns: number
  recentRunsFG: number
  recentRunsIL: number
  totalPlayers: number
  activePlayers: number
  followers: number
  guides: number
  resources: number
}

interface GetGameSummaryStats {
  gameId: string
  totalRuns: number
  totalRunsFG: number
  totalRunsIL: number
  totalRunTime: number
  recentRuns: number
  recentRunsFG: number
  recentRunsIL: number
  totalPlayers: number
  activePlayers: number
  followers: number
  guides: number
  resources: number
}

interface GetGameSummaryRelatedGames {
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
  platformIds: string[]
  regionIds: any[]
  gameTypeIds: number[]
  baseGameId: string
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

interface GetGameSummarySeriesList {
  id: string
  name: string
  url: string
  addedDate: number
  touchDate: number
  discordUrl: string
  runCount: number
  activePlayerCount: number
  totalPlayerCount: number
  officialGameCount: number
  staticAssets: {
    assetType: string
    path: string
  }[]
}

interface GetGameSummaryTheme {
  id: string
  url: string
  primaryColor: string
  panelColor: string
  panelOpacity: number
  navbarColor: number
  backgroundColor: string
  backgroundFit: number
  backgroundPosition: number
  backgroundRepeat: number
  backgroundScrolling: number
  foregroundFit: number
  foregroundPosition: number
  foregroundRepeat: number
  foregroundScrolling: number
  touchDate: number
  staticAssets: {
    assetType: string
    path: string
  }[]
}

interface GetGameSummaryThreadList {
  id: string
  name: string
  gameId: string
  forumId: string
  userId: string
  replies: number
  created: number
  lastCommentId: string
  lastCommentUserId: string
  lastCommentDate: number
  sticky: boolean
  locked: boolean
}

interface GetGameSummaryUsers {
  id: string
  name: string
  url: string
  powerLevel: number
  pronouns: any[]
  areaId: string
  color1Id: string
  color2Id: string
  avatarDecoration: {
    enabled: boolean
  }
  iconType: number
  onlineDate: number
  signupDate: number
  touchDate: number
  staticAssets: any[]
}

interface GetGameSummary {
  game: GetGameSummaryGame
  gameBoosts: GetGameSummaryGameBoosts[]
  gameModerators: GetGameSummaryGameModerators[]
  forum: GetGameSummaryForum
  newsList: GetGameSummaryNewsList[]
  gameStats: GetGameSummaryGameStats[]
  stats: GetGameSummaryStats
  relatedGames: GetGameSummaryRelatedGames[]
  seriesList: GetGameSummarySeriesList[]
  theme: GetGameSummaryTheme
  threadList: GetGameSummaryThreadList[]
  users: GetGameSummaryUsers[]
  challengeList: any[]
  challengeCount: number
  guideCount: number
  levelCount: number
  newsCount: number
  relatedCount: number
  resourceCount: number
  streamCount: number
  threadCount: number
}

export {
  GetGameSummary,
  GetGameSummaryGame,
  GetGuideList,
  GuideList,
  GuideUsers,
  GetRun,
  GetRunGame,
  GetRunCategory,
  GetRunPlatform,
  GetRunPlayers,
  GetRunRegion,
  GetOneRun,
  GetRunUsers,
  GetRunValues,
  GetRunVariables,
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
  Search,
  SearchGameList,
  SearchUserList,
  Articles,
  ArticleGameList,
  ArticleUserList,
  ArticleList,
  Article,
  RelatedArticleList,
  ArticleContent,
  Run,
  Runs,
  User,
  PersonalBests,
  Splits,
  Game,
  LeaderBoard,
  Assets,
  Values,
}
