import { twitchApi as http } from "./axios"
import { TWITCH_TOKEN, TWITCH_CLIENT_ID } from "@/constants/Utils"
import { GetStream } from "@/types/twitch"

class Twitch {
  private http = http

  async getStream(userLogin: string): Promise<GetStream | undefined> {
    try {
      const response = await this.http.get(`/streams`, {
        headers: {
          Authorization: `Bearer ${TWITCH_TOKEN}`,
          "Client-Id": TWITCH_CLIENT_ID,
        },
        params: {
          user_login: userLogin,
          type: "live",
        },
      })

      return response.data
    } catch (error: any) {
      console.error(
        "Erreur lors de l'appel Twitch API:",
        error.response?.data || error.message
      )
    }
  }
}

export const twitchApiService = new Twitch()
