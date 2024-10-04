import { View, Text, Button, TouchableOpacity, Image } from "react-native";
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
            borderRadius: 8,
            paddingVertical: 2,
            paddingHorizontal: 10,
            shadowColor: "#FFF", // Ombre plus foncée
            shadowOffset: { width: 0, height: 2 }, // Positionnement de l'ombre
            shadowOpacity: 0.8, // Transparence de l'ombre
            shadowRadius: 5, // Rayon de l'ombre
            elevation: 10, // Ombre sur Android
            backgroundColor: "#333", // Assure une couleur de fond pour l'ombre
            flexDirection: "row",
            alignItems: "center", //
            justifyContent: "space-between",
            width: "45%",
          }}
        >
          <FontAwesome
            name="user"
            size={18}
            color="white"
            style={{ alignSelf: "center" }}
          />

          <View>
            <Text style={{ color: "white" }}>stella white</Text>

            <View
              style={{
                flexDirection: "row",
                // marginTop: 4,
              }}
            >
              <Ionicons
                name="flame"
                size={12}
                color="white"
                style={{ alignSelf: "center" }}
              />
              <Text style={{ color: "white", marginLeft: 4 }}>1263</Text>
            </View>
          </View>

          <FontAwesome
            name="calendar"
            size={18}
            color="white"
            style={{ alignSelf: "center" }}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 8,
            paddingVertical: 2,
            paddingHorizontal: 10,
            shadowColor: "#FFF", // Ombre plus foncée
            shadowOffset: { width: 0, height: 2 }, // Positionnement de l'ombre
            shadowOpacity: 0.8, // Transparence de l'ombre
            shadowRadius: 5, // Rayon de l'ombre
            elevation: 10, // Ombre sur Android
            backgroundColor: "#333", // Assure une couleur de fond pour l'ombre
            flexDirection: "row",
            alignItems: "center", //
            justifyContent: "space-between",
          }}
        >
          <FontAwesome
            name="user"
            size={18}
            color="white"
            style={{ alignSelf: "center" }}
          />
          <Text style={{ color: "white", marginLeft: 7 }}>25</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/all.png")}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/MenuPoint.png")}
            style={{ alignSelf: "center" }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setRoom("1");
          }}
          style={{ alignSelf: "center" }}
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
