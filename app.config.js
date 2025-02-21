export default {
  expo: {
    name: "speedhub-client-expo",
    slug: "speedhub-client-expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "com.hoggy.videotekclientexpo",
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
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "com.hoggy.videotekclientexpo",
              host: "oauth2redirect",
              pathPrefix: "/google",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
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
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.725923225701-o7lln8hsuklrhofcrh4qh2752unhfhah",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
      GOOGLE_AUTH_CLIENT_ID_IOS: process.env.GOOGLE_AUTH_CLIENT_ID_IOS,
      GOOGLE_REDIRECT_URI_IOS: process.env.GOOGLE_REDIRECT_URI_IOS,
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
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
}
