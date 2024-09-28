import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useRoom } from "@/Context/RoomContext";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HeadersRoom() {
  const { setRoom } = useRoom();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 20,
            paddingVertical: 4,
            paddingHorizontal: 6,
            shadowColor: "white",
            elevation: 10,
            flexDirection: "row",
            // width: "25%",
          }}
        >
          <FontAwesome name="power-off" size={24} color="white" />
          {/* Icône de profil (user icon de FontAwesome) */}
          <FontAwesome name="user" size={24} color="white" />

          {/* Icône de 3 points (more icon de MaterialIcons) */}
          <MaterialIcons name="more-horiz" size={24} color="white" />

          {/* Icône de chevrons vers le haut et vers le bas (Ionicons) */}
          <Ionicons name="chevron-up" size={24} color="white" />
          <Ionicons name="chevron-down" size={24} color="white" />

          {/* Icône de flamme (flame icon d'Ionicons) */}
          <Ionicons name="flame" size={24} color="orange" />

          {/* Icône d'agenda ou cahier (calendar icon de FontAwesome) */}
          <FontAwesome name="calendar" size={24} color="white" />
          <Ionicons name="swap-vertical" size={24} color="white" />
        </View>
        <Text
          style={{
            color: "white",
          }}
        >
          HeadersRoom
        </Text>
        <TouchableOpacity
          onPress={() => {
            setRoom("1");
          }}
        >
          <FontAwesome name="power-off" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 20,
            paddingVertical: 4,
            paddingHorizontal: 6,
            shadowColor: "white",
            elevation: 10,
            flexDirection: "row",
            width: "25%",
          }}
        >
          <FontAwesome name="trophy" size={24} color="gold" />
          <Text
            style={{
              color: "white",
              paddingHorizontal: 10,
              marginTop: 2,
              //   left: 1,
            }}
          >
            583K
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 20,
            paddingVertical: 4,
            paddingHorizontal: 6,
            shadowColor: "white",
            elevation: 10,
            width: "70%",
          }}
        >
          <Text
            style={{
              color: "white",
              //   alignSelf: "center",
              marginLeft: 10,
            }}
          >
            09.07.2024 Tiger808
          </Text>
        </View>
      </View>
    </View>
  );
}
