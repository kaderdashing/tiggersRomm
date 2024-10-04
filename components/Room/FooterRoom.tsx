import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function FooterRoom() {
  const inputRef = useRef<TextInput>(null); // Spécifiez le type pour la référence

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focalisez le TextInput lorsque l'icône est cliquée
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "94%",
        alignSelf: "center",
      }}
    >
      <Text style={{ color: "white" }}>FooterRoom</Text>
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
          flexDirection: "row",
          marginHorizontal: 20,
          width: "19%",
        }}
      >
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color="white"
          style={{ marginRight: 2 }}
          onPress={handleIconClick} // Ajoutez un gestionnaire de clic ici
        />

        <TextInput
          ref={inputRef} // Associez la référence au TextInput
          style={{ flex: 1 }}
          placeholder="Hi ..."
          placeholderTextColor="white"
        />
      </View>
    </View>
  );
}
