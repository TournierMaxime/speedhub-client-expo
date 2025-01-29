interface Run {
  data: {
    id: string
    game: {
      data: {
        id: string
        names: {
          international: string
        }
        assets: {
          "cover-large": {
            uri: string
          }
        }
      }
    }
    category: {
      data: {
        id: string
        name: string
      }
    }
    videos: {
      links: {
        uri: string
      }[]
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
        assets: {
          image: {
            uri: string
          }
        }
      }[]
    }
    date: string
    submitted: string
    times: {
      primary_t: number
    }
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
        assets: {
          logo: { uri: string }
          "cover-tiny": { uri: string }
          "cover-small": { uri: string }
          "cover-medium": { uri: string }
          "cover-large": { uri: string }
          icon: { uri: string }
          "trophy-1st": { uri: string }
          "trophy-2nd": { uri: string }
          "trophy-3rd": { uri: string }
          background: { uri: string }
          foreground: { uri: string }
        }
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
    times: { primary_t: number }
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
    assets: {
      icon: {
        uri: string
      }
      image: {
        uri: string
      }
    }
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
        links: {
          uri: string
        }[]
      }
      comment: string
      status: {
        status: string
        examiner: string
        "verify-date": string
      }
      date: string
      submitted: string
      times: {
        primary_t: number
      }
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
        assets: {
          logo: {
            uri: string
          }
          "cover-tiny": {
            uri: string
          }
          "cover-small": {
            uri: string
          }
          "cover-medium": {
            uri: string
          }
          "cover-large": {
            uri: string
          }
          icon: {
            uri: string
          }
          "trophy-1st": {
            uri: string
          }
          "trophy-2nd": {
            uri: string
          }
          "trophy-3rd": {
            uri: string
          }
          background: {
            uri: string
          }
          foreground: {
            uri: string
          }
        }
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
    gametypes: {
      data: {
        id: string
        name: string
        links: {
          rel: string
          uri: string
        }[]
      }[]
    }
    platforms: {
      data: {
        id: string
        name: string
        released: number
        links: {
          rel: string
          uri: string
        }[]
      }[]
    }
    regions: {
      data: {
        id: string
        name: string
        links: {
          rel: string
          uri: string
        }[]
      }[]
    }
    genres: {
      data: {
        id: string
        name: string
        links: {
          rel: string
          uri: string
        }[]
      }[]
    }
    engines: {
      data: {
        id: string
        name: string
        links: {
          rel: string
          uri: string
        }[]
      }[]
    }
    developers: {
      data: {
        id: string
        name: string
        links: {
          rel: string
          uri: string
        }[]
      }[]
    }
    publishers: {
      data: {
        id: string
        name: string
        links: {
          rel: string
          uri: string
        }[]
      }[]
    }
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
        links: {
          rel: string
          uri: string
        }[]
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
              values: {
                values: Record<
                  string,
                  {
                    label: string
                    rules: string
                    flags: {
                      miscellaneous: boolean
                    }
                  }
                >
                default: string
              }
              "is-subcategory": boolean
              links: {
                rel: string
                uri: string
              }[]
            }
          ]
        }
      }[]
    }
    created: string
    assets: {
      logo: {
        uri: string
      }
      "cover-tiny": {
        uri: string
      }
      "cover-small": {
        uri: string
      }
      "cover-medium": {
        uri: string
      }
      "cover-large": {
        uri: string
      }
      icon: {
        uri: string
      }
      "trophy-1st": {
        uri: string
      }
      "trophy-2nd": {
        uri: string
      }
      "trophy-3rd": {
        uri: string
      }
      "trophy-4th": {
        uri: string
      }
      background: {
        uri: string
      }
      foreground: {
        uri: string
      }
    }
    links: {
      rel: string
      uri: string
    }[]
  }
}

export { Run, Runs, User, PersonalBests, Splits, Game }
