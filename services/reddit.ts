import { redditApi as http } from "./axios"

interface RedditInterface {
  getAllNews(params?: any): Promise<any>
  getOneNews(permalink: string): Promise<any>
}

class Reddit implements RedditInterface {
  private http = http

  async getAllNews(params?: any) {
    const response = await this.http.get("/new.json", {
      params: {
        ...params,
      },
    })
    return response.data
  }

  async getOneNews(permalink: string) {
    const removeSlash = permalink.endsWith("/")
      ? permalink.slice(0, -1)
      : permalink
    const response = await this.http.get(`${removeSlash}.json`)
    return response.data
  }
}

export const redditService = new Reddit()
