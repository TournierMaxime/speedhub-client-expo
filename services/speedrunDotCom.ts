import { speedRunDotComApi as http } from "./axios"
import { speedRunDotComApiV2 } from "./axios"
import { splitIOApi } from "./axios"

interface GameInterface {
  getGames(params: { name: string | string[] }): Promise<any>
  getGame(id: string | string[]): Promise<any>
  getLeaderBoard(
    id: string | string[],
    categoryId: string | string[],
    queryParams?: Record<string, string>
  ): Promise<any>
}

interface RunInterface {
  getRuns(limit?: number): Promise<any>
  getRun(id: string | string[]): Promise<any>
}

interface SplitInterface {
  getSplit(id: string | string[]): Promise<any>
}

interface UserInterface {
  getUsers(params: { name: string | string[] }): Promise<any>
  getUser(id: string | string[]): Promise<any>
  getPersonalBests(id: string | string[]): Promise<any>
}

interface ProfileInterface {
  getProfile(xApiKey: string): Promise<any>
}

class Users implements UserInterface {
  private http = http

  async getUsers(params: { name: string | string[] }) {
    const response = await this.http.get("/users", {
      params: {
        name: params.name,
      },
    })
    return response.data
  }

  async getUser(id: string | string[]) {
    const response = await this.http.get(`/users/${id}`)
    return response.data
  }

  async getPersonalBests(id: string | string[]) {
    const response = await this.http.get(`/users/${id}/personal-bests`, {
      params: {
        embed: "game,category,platform",
      },
    })
    return response.data
  }
}

class Split implements SplitInterface {
  private http = splitIOApi

  async getSplit(id: string | string[]) {
    const response = await this.http.get(`/runs/${id}`)
    return response.data
  }
}

class Runs implements RunInterface {
  private http = http

  async getRuns(limit?: number) {
    const response = await this.http.get("/runs", {
      params: {
        direction: "desc",
        status: "verified",
        orderby: "verify-date",
        embed: "players,category,game",
        max: limit ? limit : 20,
      },
    })
    return response.data
  }

  async getRun(id: string | string[]) {
    const response = await this.http.get(`/runs/${id}`, {
      params: {
        embed: "players,game,category,platform",
      },
    })
    return response.data
  }
}

class Games implements GameInterface {
  private http = http

  async getGames(params: { name: string | string[] }) {
    const response = await this.http.get("/games", {
      params: {
        name: params.name,
      },
    })
    return response.data
  }

  async getGame(id: string | string[]) {
    const response = await this.http.get(`/games/${id}`, {
      params: {
        embed:
          "genres,platforms,engines,developers,publishers,gametypes,regions,categories.variables,moderators",
      },
    })
    return response.data
  }

  async getLeaderBoard(
    id: string,
    categoryId: string,
    queryParams?: Record<string, string>
  ) {
    const response = await this.http.get(
      `/leaderboards/${id}/category/${categoryId}`,
      {
        params: {
          embed: "players",
          top: "3",
          ...queryParams,
        },
      }
    )
    return response.data
  }
}

class Profile implements ProfileInterface {
  private http = http

  async getProfile(xApiKey: string) {
    const response = await this.http.get("/profile", {
      headers: {
        "X-API-Key": xApiKey,
      },
    })
    return response.data
  }
}

class Article {
  private http = speedRunDotComApiV2

  async getArticleList(limit?: number) {
    const response = await this.http.get("/GetArticleList", {
      params: { limit },
    })
    return response.data
  }
  async getArticle(id: string) {
    const response = await this.http.get("GetArticle", {
      params: {
        id,
      },
    })
    return response.data
  }
}

class Auth {
  private http = speedRunDotComApiV2

  async putAuthLogin(data: {
    name: string | undefined
    password: string | undefined
    token?: string
    _api?: string
  }): Promise<{
    loggedIn: boolean
    tokenChallengeSent?: boolean
  }> {
    try {
      const response = await this.http.post("/PutAuthLogin", data)
      return response.data
    } catch (error: any) {
      console.log("putAuthLogin", error.response.data.error)
      return { loggedIn: false, tokenChallengeSent: false }
    }
  }

  async putAuthLogout(): Promise<{
    error?: string
    loggedIn?: boolean
  }> {
    try {
      const response = await this.http.post("/PutAuthLogout", {
        _api: "",
      })
      return response.data
    } catch (error: any) {
      console.log("putAuthLogout", error.response.data.error)
      return { error: error.message }
    }
  }
}

export const gameService = new Games()
export const runService = new Runs()
export const splitIOService = new Split()
export const userService = new Users()
export const profileService = new Profile()
export const articleService = new Article()
export const authService = new Auth()
