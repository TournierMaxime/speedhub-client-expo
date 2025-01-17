import { speedRunDotComApi as http } from "./axios"

interface GameInterface {
  getGames(): Promise<any>
  getGame(id: string | string[]): Promise<any>
}

interface RunInterface {
  getRuns(): Promise<any>
  getRun(id: string | string[]): Promise<any>
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
