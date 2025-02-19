export default {
  expo: {
    name: "speedhub-client-expo",
    slug: "speedhub-client-expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.hoggy.speedhubclientexpo",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [process.env.GOOGLE_REDIRECT_URI_IOS],
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
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
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
          reservedClientId: process.env.GOOGLE_AUTH_CLIENT_ID_IOS,
          scopes: ["profile", "email"],
          webClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
          iosUrlScheme: `com.googleusercontent.apps.${process.env.GOOGLE_REDIRECT_URI_IOS}`,
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
