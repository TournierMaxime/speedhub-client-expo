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

export {
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
