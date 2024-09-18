import { View, TextInput } from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons"; // Example: using Ionicons for the icon

type FooProps = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  iconName?: any; // Optional icon name
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable";
};

export default function MyInputText({
  value,
  placeholder,
  onChangeText,
  secureTextEntry = false,
  iconName,
  keyboardType = "default",
}: FooProps) {
  return (
    <View
      style={{
        // justifyContent: "center",
        paddingHorizontal: 18,
        paddingTop: 5,
      }}
    >
      <View style={{ position: "relative", width: "100%" }}>
        {iconName && (
          <Feather
            name={iconName}
            size={24}
            color="gray"
            style={{
              position: "absolute",
              left: 15,
              top: "50%",
              transform: [{ translateY: -12 }],
              zIndex: 1,
            }}
          />
        )}
        <TextInput
          autoCapitalize="none"
          style={{
            padding: 15,
            paddingLeft: iconName ? 45 : 15, // Add space if the icon is present
            width: "100%",
            backgroundColor: "#ECECEC",
            borderRadius: 13,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          keyboardType={keyboardType}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}
