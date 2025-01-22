interface Lives {
  data: {
    horaroId: string
    scheduleId: string | null
    name: string
    link: string
    slug: string
    isLive: boolean
    createdAt: string
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
      hidden_columns: [string]
      link: string
      columns: [string]
      items: {
        length: string
        length_t: number
        scheduled: string
        scheduled_t: number
        data: [string]
      }[]
      links: {
        rel: string
        uri: string
      }[]
    } | null
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
        columns: [string]
        link: string
      }
      ticker: {
        previous: {
          length: string
          length_t: number
          scheduled: string
          scheduled_t: number
          data: [string]
        }
        current: {
          length: string
          length_t: number
          scheduled: string
          scheduled_t: number
          data: [string]
        }
        next: {
          length: string
          length_t: number
          scheduled: string
          scheduled_t: number
          data: [string]
        }
      }
      links: {
        rel: string
        uri: string
      }[]
    } | null
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
      hidden_columns: [string]
      link: string
      columns: [string]
      items: {
        length: string
        length_t: number
        scheduled: string
        scheduled_t: number
        data: [string]
      }[]
      links: {
        rel: string
        uri: string
      }[]
    } | null
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
        columns: [string]
        link: string
      }
      ticker: {
        previous: {
          length: string
          length_t: number
          scheduled: string
          scheduled_t: number
          data: [string]
        }
        current: {
          length: string
          length_t: number
          scheduled: string
          scheduled_t: number
          data: [string]
        }
        next: {
          length: string
          length_t: number
          scheduled: string
          scheduled_t: number
          data: [string]
        }
      }
      links: {
        rel: string
        uri: string
      }[]
    } | null
  }[]
}

export { Lives, Upcomings }
