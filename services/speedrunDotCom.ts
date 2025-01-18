import { speedRunDotComApi as http } from "./axios"
import { splitIOApi } from "./axios"

interface GameInterface {
  getGames(): Promise<any>
  getGame(id: string | string[]): Promise<any>
}

interface RunInterface {
  getRuns(): Promise<any>
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

  async getRuns() {
    const response = await this.http.get("/runs", {
      params: {
        direction: "desc",
        status: "verified",
        orderby: "verify-date",
        embed: "players,category,game",
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

  async getGames() {
    const response = await this.http.get("/games")
    return response.data
  }

  async getGame(id: string | string[]) {
    const response = await this.http.get(`/games/${id}`)
    return response.data
  }
}

export const speedRunDotComGameService = new Games()
export const speedRunDotComRunService = new Runs()
export const splitIOService = new Split()
export const userService = new Users()
