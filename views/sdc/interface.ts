interface Run {
  data: {
    id: string
    game: {
      data: {
        id: string
        names: {
          international: string
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
      data: { names: { international: string } }[]
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
      history: [number]
      name: string
      reduced: boolean
      skipped: boolean
    }[]
  }
}

export { Run, Runs, User, PersonalBests, Splits }
