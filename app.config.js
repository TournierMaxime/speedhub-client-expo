import app from "./package.json"

export default {
  expo: {
    name: "SpeedHub",
    slug: "speedhub-client-expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "com.hoggy.speedhubclientexpo",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.hoggy.speedhubclientexpo",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [
              "com.googleusercontent.apps.725923225701-o7lln8hsuklrhofcrh4qh2752unhfhah",
            ],
          },
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.hoggy.speedhubclientexpo",
      allowCleartextTraffic: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    assetBundlePatterns: ["**/*"],
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            permissions: [
              "android.permission.INTERNET",
              "android.permission.ACCESS_NETWORK_STATE",
            ],
            allowCleartextTraffic: true,
          },
        },
      ],
      "expo-video",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      TWITCH_TOKEN: process.env.TWITCH_TOKEN,
      TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
      appAuthRedirectScheme: "com.hoggy.speedhubclientexpo",
      router: {
        origin: false,
      },
      eas: {
        projectId: "0e664686-7e65-4e34-a038-5bac954dbde2",
      },
    },
    owner: "hoggy",
    updates: {
      url: "https://u.expo.dev/0e664686-7e65-4e34-a038-5bac954dbde2",
      requestHeaders: {
        "expo-runtime-version": app.version,
        "expo-channel-name": "preview",
        "expo-platform": "android",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
}
