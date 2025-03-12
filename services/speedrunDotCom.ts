import { speedRunDotComApi as http } from "./axios"
import { speedRunDotComApiV2 } from "./axios"
import { splitIOApi } from "./axios"
import {
  GetRun,
  GetLatestLeaderboard,
  GetGuideList,
  GetGameSummary,
  GetGameData,
  GetResourceList,
  GetUserSummary,
  GetUserLeaderboard,
} from "@/types/sdc"

interface GameInterface {
  getGames(params: { name: string | string[] }): Promise<any>
  getGame(id: string | string[]): Promise<any>
  getLeaderBoard(
    id: string | string[],
    categoryId: string | string[],
    queryParams?: Record<string, string>
  ): Promise<any>
  getGuides(id: string | string[]): Promise<GetGuideList>
  getGameSummary(id: string | string[]): Promise<GetGameSummary>
  getGameData(id: string | string[]): Promise<GetGameData>
  getResourceList(id: string | string[]): Promise<GetResourceList>
}

interface RunInterface {
  getRuns(limit?: number): Promise<any>
  getRun(id: string | string[]): Promise<any>
  getLatestLeaderboard(limit?: number): Promise<GetLatestLeaderboard>
  getRunV2(runId: string | string[]): Promise<GetRun>
}

interface SplitInterface {
  getSplit(id: string | string[]): Promise<any>
}

interface UserInterface {
  getUsers(params: { name: string | string[] }): Promise<any>
  getUser(id: string | string[]): Promise<any>
  getPersonalBests(id: string | string[]): Promise<any>
  getUserSummary(url: string | string[]): Promise<GetUserSummary>
  getUserLeaderboard(userId: string | string[]): Promise<GetUserLeaderboard>
}

interface ProfileInterface {
  getProfile(xApiKey: string): Promise<any>
}

class Users implements UserInterface {
  private http = http
  private speedRunDotComApiV2 = speedRunDotComApiV2

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

  async getUserSummary(url: string | string[]) {
    const response = await this.speedRunDotComApiV2.get("/GetUserSummary", {
      params: {
        url,
      },
    })
    return response.data
  }

  async getUserLeaderboard(userId: string | string[]) {
    const response = await this.speedRunDotComApiV2.get("/GetUserLeaderboard", {
      params: {
        userId,
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
  private speedRunDotComApiV2 = speedRunDotComApiV2

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

  async getRunV2(runId: string | string[]) {
    const response = await this.speedRunDotComApiV2.get("/GetRun", {
      params: {
        runId,
      },
    })
    return response.data
  }

  async getLatestLeaderboard(limit?: number) {
    const response = await this.speedRunDotComApiV2.get(
      "/GetLatestLeaderboard",
      {
        params: {
          limit,
        },
      }
    )
    return response.data
  }
}

class Games implements GameInterface {
  private http = http
  private speedRunDotComApiV2 = speedRunDotComApiV2

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

  async getGuides(gameId: string | string[]) {
    const response = await this.speedRunDotComApiV2.get("/GetGuideList", {
      params: {
        gameId,
      },
    })
    return response.data
  }

  async getGameSummary(gameId: string | string[]) {
    const response = await this.speedRunDotComApiV2.get("/GetGameSummary", {
      params: {
        gameId,
      },
    })
    return response.data
  }

  async getGameData(gameId: string | string[]) {
    const response = await this.speedRunDotComApiV2.get("/GetGameData", {
      params: {
        gameId,
      },
    })
    return response.data
  }

  async getResourceList(gameId: string | string[]) {
    const response = await this.speedRunDotComApiV2.get("/GetResourceList", {
      params: {
        gameId,
      },
    })
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

class Search {
  private http = speedRunDotComApiV2

  async GetSearch(query: string) {
    try {
      const response = await this.http.get("/GetSearch", {
        params: {
          query,
          includeGames: true,
          includeUsers: true,
          favorExactMatches: false,
          includeNews: false,
          includePages: false,
          includeSeries: false,
          includeChallenges: false,
          limit: 50,
        },
      })
      return response.data
    } catch (error: any) {
      console.log("GetSearch", error.message)
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
export const searchService = new Search()
