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
      }
    }[]
  }
}

interface Reddit {
  data: {
    data: {
      children: {
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
        }
      }[]
    }
  }[]
}

export { Reddits, Reddit }
