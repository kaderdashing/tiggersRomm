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
      permissions: ["INTERNET"],
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
