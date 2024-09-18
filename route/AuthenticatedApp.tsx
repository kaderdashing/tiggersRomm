import { View, Text, Button, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import { useIsAuth } from "@/ProviderAuthContext";
import sendToken from "@/utils/sendToken";
import MyInputText from "@/src/core/myInputText";
import * as SecureStore from "expo-secure-store";

export default function AuthenticatedApp() {
  const { signout, userInfo } = useAuth();
  const { isAuth, setIsAuth } = useIsAuth();
  const [kader, setKader] = useState<any>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await sendToken();
        // setKader(response);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
      // setKader(token);
    };

    fetchToken();
  }, []);
  // const token = await SecureStore.getItemAsync("token");

  return (
    <View>
      <Text>AuthenticatedApp with {userInfo}</Text>
      <Button title="Logout" onPress={signout} />
      {/* {kader && <Text>{JSON.stringify(kader, null, 2)}</Text>} */}
    </View>
  );
}
