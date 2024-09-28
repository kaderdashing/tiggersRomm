import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import AuthenticatedApp from "@/route/AuthenticatedApp";
import UnauthenticatedApp from "@/route/UnauthenticatedApp";
import * as SecureStore from "expo-secure-store";
import { useIsAuth } from "@/Context/ProviderAuthContext";

export default function RoutageDynamique() {
  const { isSignedIn, userInfo } = useAuth();
  const { isAuth } = useIsAuth();
  return (
    <View style={styles.container}>
      <React.Suspense fallback={<ActivityIndicator />}>
        {isAuth ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
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
