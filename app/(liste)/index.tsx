import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function index() {
  const { isSignedIn, userInfo, error, loading, signin, signout } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  // useEffect(() => {
  //   const getToken = async () => {
  //     const storedToken = await SecureStore.getItemAsync("token");
  //     setToken(storedToken);
  //   };

  //   getToken();
  // }, []);

  // <Redirect href="/(auth)/" />;
  return (
    <View style={styles.container}>
      <Text>Liste - Index</Text>
      <Text>Welcome, you are signed in!</Text>

      {isSignedIn ? (
        <>
          <Text>je suis signé</Text>
        </>
      ) : (
        <>
          <Text>je suis pas signé</Text>
        </>
      )}
      <Text>hahahah</Text>
      {userInfo && (
        <>
          <Text>{userInfo}</Text>
        </>
      )}
      <Button title="Logout" onPress={signout} />
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
