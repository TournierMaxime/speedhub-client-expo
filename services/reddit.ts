import { redditApi as http } from "./axios"

interface RedditInterface {
  getAllNews(): Promise<any>
  getOneNews(permalink: string): Promise<any>
}

class Reddit implements RedditInterface {
  private http = http

  async getAllNews() {
    const response = await this.http.get("/r/speedrun/new.json")
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
