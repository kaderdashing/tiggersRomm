import { View, Text, StatusBar } from "react-native";
import React from "react";
import useAuth from "@/hook/useAuth";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useIsAuth } from "@/ProviderAuthContext";

export default function UnauthenticatedApp() {
  const { isSignedIn, userInfo, error, loading, signin, signout } = useAuth();
  const { isAuth, setIsAuth } = useIsAuth();

  return (
    <View>
      <Text>UnauthenticatedApp</Text>
      <Text>index auth</Text>
      {error && <Text>{error.message}</Text>}
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signin}
      />
      {userInfo && <Text>{userInfo}</Text>}
      <Text>value of kader :{isAuth}</Text>
    </View>
  );
}
