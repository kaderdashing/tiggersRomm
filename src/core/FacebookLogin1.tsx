import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { AccessToken, Settings, LoginManager } from "react-native-fbsdk-next";
import * as SecureStore from "expo-secure-store";
import sendToken from "@/utils/sendToken";
import { useIsAuth } from "@/Context/ProviderAuthContext";

export default function FacebookLogin1() {
  const { isAuth, setIsAuth } = useIsAuth();
  const [accessToken, setAccessToken] = useState<any>(null);

  useEffect(() => {
    requestTracking();
  }, []);

  const requestTracking = async () => {
    const { status } = await requestTrackingPermissionsAsync();
    Settings.initializeSDK();

    if (status === "granted") {
      await Settings.setAdvertiserTrackingEnabled(true);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        // "email",
      ]);
      console.log({ result });
      if (result.isCancelled) {
        console.log("Login cancelled");
        setIsAuth(null);
        return;
      }

      const tokenData = await AccessToken.getCurrentAccessToken();
      console.log({ tokenData });

      if (tokenData?.accessToken) {
        const accessToken = tokenData.accessToken;
        setAccessToken(accessToken);
        setIsAuth(accessToken);

        await SecureStore.setItemAsync("token", accessToken);
        await SecureStore.setItemAsync("authWith", "facebook");
        await sendToken("facebook");
      }
    } catch (error) {
      console.error("Error during login process:", error);
    }
  };

  return (
    <TouchableOpacity
      style={{
        borderRadius: 70,
        overflow: "hidden",
        width: 230,
        height: 50,
        alignSelf: "center",
        backgroundColor: "#1877F2",
        position: "relative",
        justifyContent: "center",
      }}
      onPress={handleFacebookLogin}
    >
      <Image
        source={require("../../assets/images/facebook.png")}
        style={{
          position: "absolute",
          left: 15,
          width: 26,
          height: 26,
          top: 10,
        }}
      />
      <Text
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          top: "50%",
          transform: [{ translateY: -12 }],
          fontSize: 18,
          color: "white",
        }}
      >
        Facebook
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 225,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
});

// <View style={styles.buttonContainer}>
//   <LoginButton
//     onLoginFinished={onLoginFinished}
//     style={{
//       height: "100%",
//       width: "100%", // Ensure the button takes the full width
//       justifyContent: "center", // Centers content vertically
//       alignItems: "center", // Centers content horizontally
//       display: "flex", // Use flexbox layout
//     }}
//   />
// </View>
