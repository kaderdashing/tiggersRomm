import { View } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";

import * as SecureStore from "expo-secure-store";
import HomePage from "@/app/pages/HomePage";
import RoomPage from "@/app/pages/RoomPage";
import { RoomProvider, useRoom } from "../Context/RoomContext"; // Import your context
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
    <RoomProvider>
      <MainApp />
    </RoomProvider>
  );
}

function MainApp() {
  const { room } = useRoom();

  return <View>{room === "1" ? <HomePage /> : <RoomPage />}</View>;
}
