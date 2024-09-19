import { Text } from "react-native";
import { useEffect, useState } from "react";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { AccessToken, LoginButton, Settings } from "react-native-fbsdk-next";
import * as SecureStore from "expo-secure-store";
import { useIsAuth } from "@/ProviderAuthContext";
import sendToken from "@/utils/sendToken";

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
  const onLoginFinished = async (error: any, data: object) => {
    try {
      const tokenData = await AccessToken.getCurrentAccessToken();
      console.log({ tokenData });
      if (tokenData?.accessToken) {
        const accessToken = tokenData.accessToken;

        setAccessToken(accessToken);
        setIsAuth(accessToken);

        await SecureStore.setItemAsync("token", accessToken);
        await sendToken("facebook");
      } else {
        setIsAuth(null);
      }
    } catch (error) {
      console.error("Error during login process:", error);
    }
  };

  const onLogoutFinished = async () => {
    console.log("Logged out");
    await SecureStore.deleteItemAsync("token");
  };

  return (
    <>
      <LoginButton
        onLogoutFinished={onLogoutFinished}
        onLoginFinished={onLoginFinished}
      />
      {isAuth && <Text>{JSON.stringify(isAuth, null, 2)}</Text>}
    </>
  );
}
