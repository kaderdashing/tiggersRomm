import { View, Image, StyleSheet } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const images = [
  require("./Bild/body1.png"),
  require("./Bild/body2.png"),
  require("./Bild/body3.png"),
  require("./Bild/body4.png"),
  require("./Bild/body5.png"),
  require("./Bild/body6.png"),
  require("./Bild/body7.png"),
  require("./Bild/body8.png"),
];

export default function Body() {
  return (
    <View style={styles.top}>
      {images.map((item, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image style={styles.image} source={item} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    flexWrap: "wrap", // Pour que les images passent à la ligne suivante
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
  imageContainer: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(45), // Deux images par ligne
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: responsiveHeight(20),
    borderRadius: 10,
  },
});
