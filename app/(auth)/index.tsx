import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useAuth from "@/hook/useAuth";
import { Redirect } from "expo-router";
// import { Redirect } from "expo-router";

export default function TabOneScreen() {
  const { isSignedIn, userInfo, error, loading, signin, signout } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  // if (isSignedIn) {
  //   return <Redirect href="/(liste)/" />;
  // }

  return (
    <View style={styles.container}>
      <Text>index auth</Text>
      {error && <Text>{error.message}</Text>}
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signin}
      />
      <StatusBar style="auto" />
      {userInfo && <Text>{userInfo}</Text>}
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
