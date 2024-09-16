import useAuth from "@/hook/useAuth";
import { Redirect, Tabs, useRouter } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { isSignedIn, loading } = useAuth();

  // if (!isSignedIn) {
  //   return <Redirect href="/(auth)/" />;
  // }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Liste",
        }}
      />
      <Tabs.Screen
        name="room"
        options={{
          title: "room",
        }}
      />
    </Tabs>
  );
}
