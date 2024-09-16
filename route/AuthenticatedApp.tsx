import { View, Text, Button } from "react-native";
import React from "react";
import useAuth from "@/hook/useAuth";
import { useIsAuth } from "@/ProviderAuthContext";

export default function AuthenticatedApp() {
  const { signout, userInfo } = useAuth();
  const { isAuth, setIsAuth } = useIsAuth();
  return (
    <View>
      <Text>AuthenticatedApp with {userInfo}</Text>
      <Button title="Logout" onPress={signout} />
      <Text>value of kader :{isAuth}</Text>
    </View>
  );
}
