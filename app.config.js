export default {
  expo: {
    name: "StickerSmash",
    slug: "StickerSmash",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    jsEngine: "jsc",

    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tiggers.roomapp",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.tiggers.approom",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      permissions: ["INTERNET", "ACCESS_NETWORK_STATE"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "@react-native-google-signin/google-signin",
      "expo-router",
      "expo-secure-store",
      [
        "react-native-fbsdk-next",
        {
          appID: "1082815616797627",
          clientToken: "732520da82a179d16d7f0992572351d4",
          displayName: "tiggers auth native",
          scheme: "fb1082815616797627",
          advertiserIDCollectionEnabled: false,
          autoLogAppEventsEnabled: false,
          isAutoInitEnabled: true,
        },
      ],
      "expo-tracking-transparency",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "e6ee6e2d-c059-45ac-8a93-526303dd6d7c",
      },
    },
  },
};
