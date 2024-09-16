import EditScreenInfo from "@/components/EditScreenInfo";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [error, setError] = useState<Error | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        "42880877051-q4i6tfllkl3hdq0dou88i361r4mstctf.apps.googleusercontent.com",
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Unknown error occurred"));
      console.error(e);
    }
  };

  const logout = () => {
    setUserInfo(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <View>
        <Text>{error ? error.message : null}</Text>
        {userInfo && <Text>{JSON.stringify(userInfo.data.user)}</Text>}
        {userInfo ? (
          <Button title="Logout" onPress={logout} />
        ) : (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={signin}
          />
        )}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
