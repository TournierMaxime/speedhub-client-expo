interface Schedule {
  schedule: {
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
    items: {
      length: string
      length_t: number
      scheduled: string
      scheduled_t: number
      data: string[]
    }[]
    links: {
      rel: string
      uri: string
    }[]
  }
}

interface Ticker {
  ticker: {
    schedule: {
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
    ticker: {
      previous: {
        length: string
        length_t: number
        scheduled: string
        scheduled_t: number
        data: string[]
      }
      current: {
        length: string
        length_t: number
        scheduled: string
        scheduled_t: number
        data: string[]
      }
      next: {
        length: string
        length_t: number
        scheduled: string
        scheduled_t: number
        data: string[]
      }
    }
    links: {
      rel: string
      uri: string
    }[]
  }
}

export { Schedule, Ticker }
