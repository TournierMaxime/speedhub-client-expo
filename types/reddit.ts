interface Reddits {
  data: {
    children: {
      data: {
        id: string
        permalink: string
        author_fullname: string
        title: string
        media_embed: {
          content: string
          width: number
          scrolling: boolean
          height: number
        }
        created: number
        url_overridden_by_dest: string
        url: string
        domain: string
        link_flair_text: string
      }
    }[]
  }
}

interface Reddit {
  kind: string
  data: {
    after: string | null
    before: string | null
    children: {
      kind: string
      data: {
        title: string
        name: string
        author_fullname: string
        link_flair_text: string
        created: number
        url_overridden_by_dest: string
        id: string
        author: string
        url: string
        selftext: string
      }
    }[]
    dist: number | null
    geo_filter: string
    modhash: string
  }
}

export { Reddits, Reddit }
