import { View, Text, Button, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import { useIsAuth } from "@/ProviderAuthContext";
import sendToken from "@/utils/sendToken";
import MyInputText from "@/src/core/myInputText";
import * as SecureStore from "expo-secure-store";

// import FacebookLogin1 from "@/src/core/FacebookLogin1";
// import auth from '@react-native-firebase/auth';
export default function AuthenticatedApp() {
  const { signout, userInfo } = useAuth();
  const [kader, setKader] = useState<any>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          setKader(token);
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
      <View style={{ padding: 30 }}>
        <Button title="Logout" onPress={signout} />
      </View>
      {kader && <Text>{JSON.stringify(kader, null, 2)} </Text>}
    </View>
  );
}
