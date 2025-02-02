import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import HeadersRoom from "@/components/Room/HeadersRoom";
import FooterRoom from "@/components/Room/FooterRoom";
import HyperBodyRoom from "@/components/Room/BodyRoom";
import LowerBody from "@/components/Room/LowerBody";
import RTCW from "@/components/Room/RTCW";
import AlternativeTest from "@/components/Room/AlternativeTest";
import WebRtcChat from "@/components/Room/Alternative2";
import Yazid from "@/components/Room/Yazid1";
import KaderRtc from "@/components/Room/KaderRtc";

const { width, height } = Dimensions.get("window");

const RoomPage = () => {
  return (
    <ScrollView>
      <View style={{ paddingTop: 30 }}>
        <ImageBackground
          source={require("../../assets/images/backroom.png")}
          style={{ width, height }}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <HeadersRoom />
            {/* <RTCW /> */}
            {/* <AlternativeTest /> */}
            {/* <WebRtcChat /> */}
            {/* <Yazid /> */}
            <KaderRtc />
            <HyperBodyRoom />
            <LowerBody />
            <FooterRoom />
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default RoomPage;
