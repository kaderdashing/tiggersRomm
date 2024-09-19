import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import useAuth from "@/hook/useAuth";
import { responsiveHeight } from "react-native-responsive-dimensions";
import {
  AntDesign,
  Feather,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

export default function Footer() {
  const { signout, userInfo } = useAuth();

  return (
    <View style={styles.top}>
      <Ionicons name="person-outline" size={24} color="black" />
      <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
      <Feather name="plus-square" size={24} color="black" />
      <AntDesign name="home" size={24} color="black" />
      <TouchableOpacity onPress={signout}>
        <SimpleLineIcons name="logout" size={24} color="red" />
      </TouchableOpacity>
      {/* <Button title="Logout" onPress={signout} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    width: "95%",
    flexDirection: "row",
    paddingHorizontal: responsiveHeight(3),
    backgroundColor: "#f0f0f0", // Blanc cassé

    paddingVertical: responsiveHeight(1),
    borderRadius: 20, // Coins arrondis
    shadowColor: "#000", // Couleur de l'ombre
    shadowOffset: { width: 0, height: 10 }, // Décalage de l'ombre
    shadowOpacity: 0.25, // Opacité de l'ombre
    shadowRadius: 10, // Rayon de l'ombre
    elevation: 10, // Pour l'ombre sur Android
    marginBottom: responsiveHeight(1),
  },
});
