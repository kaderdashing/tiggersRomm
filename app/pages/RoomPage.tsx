import { View, ImageBackground, Dimensions } from "react-native";
import React from "react";
import { useRoom } from "@/Context/RoomContext";
import HeadersRoom from "@/components/Room/HeadersRoom";
import BodyRoom from "@/components/Room/BodyRoom";
import FooterRoom from "@/components/Room/FooterRoom";

const { width, height } = Dimensions.get("window");

export default function RoomPage() {
  const { setRoom } = useRoom();

  return (
    <View style={{ paddingTop: 30 }}>
      <ImageBackground
        source={require("../../assets/images/backroom.png")}
        style={{ width, height }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <HeadersRoom />
          <BodyRoom />
          <FooterRoom />
        </View>
      </ImageBackground>
    </View>
  );
}

// ../../assets/images/backroom.png
