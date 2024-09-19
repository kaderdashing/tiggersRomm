import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  AntDesign,
  EvilIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
export default function Header() {
  const { height, width } = Dimensions.get("window");
  return (
    <View>
      <View style={styles.top}>
        <EvilIcons name="search" size={30} color="black" />
        <AntDesign name="home" size={24} color="black" />
        <Ionicons name="notifications-outline" size={24} color="black" />
        <Text>Folloxing</Text>
        <Text>Popular</Text>
        <Text>Discover</Text>
      </View>
      <View style={{ paddingVertical: responsiveHeight(1) }}>
        <Image source={require("./Bild/header1.png")} />
      </View>
      <View style={styles.classique}>
        <Image source={require("./Bild/1.png")} />
        <Image source={require("./Bild/2.png")} />
        <Image source={require("./Bild/3.png")} />
        <Image source={require("./Bild/4.png")} />
      </View>
      <View style={styles.classique}>
        <Image
          style={{ marginTop: responsiveHeight(8) }}
          source={require("./Bild/bronze.png")}
        />
        <Image
          style={{ marginTop: responsiveHeight(-2) }}
          source={require("./Bild/or.png")}
        />
        <Image
          style={{ marginTop: responsiveHeight(5) }}
          source={require("./Bild/argent.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    // position: "absolute",
    top: 0,
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: responsiveHeight(3),
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingTop: responsiveHeight(5), // 5% de la hauteur de l'écran
  },
  classique: {
    paddingVertical: responsiveHeight(1),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(1),
  },
});
