import { useEffect, useState } from "react"
import * as WebBrowser from "expo-web-browser"
import {
  makeRedirectUri,
  useAuthRequest,
  exchangeCodeAsync,
} from "expo-auth-session"

WebBrowser.maybeCompleteAuthSession()

const discovery = {
  authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
  tokenEndpoint: "https://id.twitch.tv/oauth2/token",
  revocationEndpoint: "https://id.twitch.tv/oauth2/revoke",
}

const useHandleAuthTwitch = () => {
  const [token, setToken] = useState("")

  // 🔹 Config Twitch OAuth
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "hbv8yfi0oiat2f0tmg9nhc6inkatzh",
      redirectUri: makeRedirectUri({
        scheme: "com.hoggy.speedhubclientexpo",
      }),
      scopes: ["user:read:email", "analytics:read:games"],
      responseType: "code",
    },
    discovery
  )

  useEffect(() => {
    if (response?.type === "success" && response.params?.code) {
      const { code } = response.params
      console.log("🔹 Code reçu :", code)

      // Échanger le code contre un token
      exchangeCodeForToken(code)
    }
  }, [response])

  // 🔹 Fonction pour échanger le code contre un token
  const exchangeCodeForToken = async (code: any) => {
    try {
      const tokenResponse = await exchangeCodeAsync(
        {
          clientId: "hbv8yfi0oiat2f0tmg9nhc6inkatzh",
          clientSecret: "1p3h9l9uxjx3urecg37cdb90s16ab9",
          code,
          redirectUri: makeRedirectUri({
            scheme: "com.hoggy.speedhubclientexpo",
          }),
          extraParams: {
            grant_type: "authorization_code",
          },
        },
        discovery
      )

      console.log("✅ Token reçu :", tokenResponse)
      setToken(tokenResponse.accessToken)
    } catch (error) {
      console.error("❌ Erreur d'échange de token :", error)
    }
  }

  return {
    token,
    loginWithTwitch: () => {
      promptAsync()
    },
  }
}

export default useHandleAuthTwitch
