import {
  View,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRoom } from "@/Context/RoomContext";

const images = [
  { id: 1, nom: "Image 1", source: require("./Bild/body1.png") },
  { id: 2, nom: "Image 2", source: require("./Bild/body2.png") },
  { id: 3, nom: "Image 3", source: require("./Bild/body3.png") },
  { id: 4, nom: "Image 4", source: require("./Bild/body4.png") },
  { id: 5, nom: "Image 5", source: require("./Bild/body5.png") },
  { id: 6, nom: "Image 6", source: require("./Bild/body6.png") },
  { id: 7, nom: "Image 7", source: require("./Bild/body7.png") },
  { id: 8, nom: "Image 8", source: require("./Bild/body8.png") },
];

export default function Body() {
  const { setRoom } = useRoom();

  const handleClick = (id: number) => {
    console.log(`Image with ID ${id} clicked`);
    setRoom("0");
  };

  return (
    <View style={styles.top}>
      {images.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.imageContainer}
          onPress={() => handleClick(item.id)}
        >
          <Image style={styles.image} source={item.source} />
          <Text>{item.nom}</Text>
        </TouchableOpacity>
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
