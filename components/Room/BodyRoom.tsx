import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HyperBodyRoom() {
  // Un tableau d'éléments représentant les icônes et le texte associés
  const items = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap-reverse",
        justifyContent: "space-between",
        marginTop: 14,
      }}
    >
      {items.map((item) => (
        <View key={item} style={{ width: "25%", marginVertical: 6 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 40,
              paddingVertical: 6,
              paddingHorizontal: 6,
              shadowColor: "#FFF",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 5,
              elevation: 10,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 20,
            }}
          >
            <Ionicons name="lock-closed-outline" size={40} color="white" />
          </View>
          <Text style={{ color: "white", alignSelf: "center", marginTop: 4 }}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}
