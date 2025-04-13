import { speedHubApi as http } from "./axios"

interface AuthServiceInterface {
  register(data: any): Promise<any>
  login(data: any): Promise<any>
  logout(): Promise<void>
  confirmEmail(userId: string, data: any): Promise<any>
  verifyAppleToken(data: any): Promise<any>
  forgetPasswordMobile(data: any): Promise<any>
  checkForgetPasswordCodeMobile(data: any): Promise<any>
  resetPasswordMobile(data: any): Promise<any>
}

interface UserServiceInterface {
  searchUsers(
    filters: any,
    pagination: { page: number; size: number }
  ): Promise<any>
  getOneUser(userId: string): Promise<any>
  updateUser(userId: string, data: any, file?: string): Promise<any>
  deleteUser(userId: string): Promise<any>
}

interface HoraroServiceInterface {
  getLives(params?: any): Promise<any>
  getLive(horaroId: string | string[]): Promise<any>
  getUpcomings(params?: any): Promise<any>
  getUpcoming(horaroId: string | string[]): Promise<any>
  getMarathons(params?: any): Promise<any>
}

interface FavoriteUserServiceInterface {
  searchFavorites(userId: string): Promise<any>
  createFavorite(data: {
    userId: string
    type: string
    data: any
  }): Promise<any>
  deleteFavorite(
    userId: string,
    data: { id: string; type: string }
  ): Promise<any>
}

class HoraroService implements HoraroServiceInterface {
  private http = http

  async getLives(params?: any) {
    const response = await this.http.post(
      "/horaro/lives",
      {},
      {
        params: {
          ...params,
        },
      }
    )
    return response.data
  }

  async getLive(marathonId: string | string[]) {
    const response = await this.http.get(`/horaro/lives/${marathonId}`)
    return response.data
  }

  async getUpcomings(params?: any) {
    const response = await this.http.post(
      "/horaro/upcoming",
      {},
      {
        params: {
          ...params,
        },
      }
    )
    return response.data
  }

  async getUpcoming(marathonId: string | string[]) {
    const response = await this.http.get(`/horaro/upcoming/${marathonId}`)
    return response.data
  }

  async getMarathons(params?: any) {
    const response = await this.http.post(
      `/marathons`,
      {},
      {
        params: {
          ...params,
        },
      }
    )
    return response.data
  }
}

class AuthService implements AuthServiceInterface {
  private http = http

  async createDevice(authAccessTokenId: string | string[], data: any) {
    const response = await this.http.post(
      `/auth/access-token/${authAccessTokenId}`,
      data
    )
    return response.data
  }

  async getSession(userId: string | string[]) {
    const response = await this.http.get(`/auth/session/${userId}`)
    return response.data
  }

  async verifyToken(refreshToken?: any) {
    const response = await this.http.post("/auth/verify-token", {
      refreshToken,
    })
    return response.data
  }

  async register(data: any) {
    const response = await this.http.post("/auth/register", data)
    return response.data
  }

  async login(data: any) {
    const response = await this.http.post("/auth/login", data)
    return response.data
  }

  async logout() {
    await this.http.post("/auth/logout", {}, { withCredentials: true })
  }

  async confirmEmail(userId: string | string[], data: any) {
    const response = await this.http.post(`/auth/verify/${userId}`, data)
    return response.data
  }

  async verifyAppleToken(data: any) {
    const response = await this.http.post(`/auth/verify-apple-token`, data)
    return response.data
  }

  async forgetPasswordMobile(data: any) {
    const response = await this.http.post(`/auth/forget-password-mobile`, data)
    return response.data
  }

  async checkForgetPasswordCodeMobile(data: any) {
    const response = await this.http.post(
      `/auth/check-forget-password-code-mobile`,
      data
    )
    return response.data
  }

  async resetPasswordMobile(data: any) {
    const response = await this.http.post(`/auth/reset-password-mobile`, data)
    return response.data
  }
}

class UserService implements UserServiceInterface {
  private http = http
  private defaultOptions = { withCredentials: true }

  async searchUsers(filters: any, pagination: { page: number; size: number }) {
    const response = await this.http.post(
      "/users/search",
      {},
      {
        params: { ...filters, ...pagination },
      }
    )
    return response.data
  }

  async getOneUser(userId: string) {
    const response = await this.http.get(
      `/users/${userId}`,
      this.defaultOptions
    )
    return response.data
  }

  async updateUser(userId: string, data: any, file?: string) {
    let headers: any

    if (file) {
      headers = { "Content-Type": "multipart/form-data" }
    } else {
      headers = { "Content-Type": "application/json" }
    }

    const response = await this.http.put(`/users/${userId}`, data, {
      ...this.defaultOptions,
      headers,
    })

    return response.data
  }

  async deleteUser(userId: string) {
    const response = await this.http.delete(
      `/users/${userId}`,
      this.defaultOptions
    )
    return response.data
  }

  async getOneAccessToken(
    userId: string,
    token: string
  ): Promise<{
    authAccessTokenId: string
    userId: string
    token: string
    deviceName: string | null
    ipAddress: string | null
    userAgent: string | null
    lastUsedAt: string
    expiresIn: string
    isExpired: boolean
    revoked: boolean
    updatedAt: string
    createdAt: string
  }> {
    const response = await this.http.get(
      `/auth/user/${userId}/access-token/${token}`,
      this.defaultOptions
    )
    return response.data
  }

  async createNotification(userId: string, data: any) {
    const response = await this.http.post(
      `/notifications/users/${userId}`,
      data,
      this.defaultOptions
    )
    return response.data
  }

  async deleteNotification(notificationId: string, userId: string) {
    const response = await this.http.delete(
      `/notifications/${notificationId}/users/${userId}`,
      this.defaultOptions
    )
    return response.data
  }
}

class FavoriteUserService implements FavoriteUserServiceInterface {
  private http = http
  private defaultOptions = { withCredentials: true }

  async searchFavorites(userId: string) {
    const response = await this.http.post(
      `/favorites/search/${userId}`,
      {},
      {
        ...this.defaultOptions,
      }
    )
    return response.data
  }

  async createFavorite(data: { userId: string; type: string; data: any }) {
    const response = await this.http.post("/favorites/", data, {
      ...this.defaultOptions,
    })

    return response.data
  }

  async deleteFavorite(
    userId: string,
    data: { id?: string; type: string; url?: string }
  ) {
    const response = await this.http.post(`/favorites/${userId}`, data, {
      ...this.defaultOptions,
    })
    return response.data
  }
}

class SDCService {
  private http = http

  async getUser(url: string | string[], userId: string | string[]) {
    const response = await this.http.get(`/sdc/user/${url}/${userId}`)
    return response.data
  }

  async getGame(gameId: string | string[]) {
    const response = await this.http.get(`/sdc/game/${gameId}`)
    return response.data
  }
}

export const authService = new AuthService()
export const userService = new UserService()
export const horaroService = new HoraroService()
export const favoriteUserService = new FavoriteUserService()
export const sdcService = new SDCService()
