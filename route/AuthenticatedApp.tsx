import { View, Text, Button, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import { useIsAuth } from "@/ProviderAuthContext";
import sendToken from "@/utils/sendToken";
import MyInputText from "@/src/core/myInputText";
import * as SecureStore from "expo-secure-store";
import Header from "@/components/Home/Header";
import HomePage from "@/app/pages/HomePage";

// import FacebookLogin1 from "@/src/core/FacebookLogin1";
// import auth from '@react-native-firebase/auth';
export default function AuthenticatedApp() {
  const { signout, userInfo } = useAuth();
  const [currentToken, setCurrentToken] = useState<any>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          setCurrentToken(token);
        } else {
          console.log("Token not found");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <View>
      <HomePage />
    </View>
  );
}
