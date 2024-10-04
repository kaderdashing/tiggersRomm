import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function LowerBody() {
  const comments = [
    {
      id: 1,
      name: "Alice",
      message: "This is a great example!",
    },
    {
      id: 2,
      name: "Bob",
      message: "I love the design.",
    },
    {
      id: 3,
      name: "Charlie",
      message: "Could use some improvements.",
    },
    {
      id: 4,
      name: "David",
      message: "Really interesting!",
    },
    {
      id: 5,
      name: "Eve",
      message: "Keep up the good work!",
    },
    {
      id: 6,
      name: "Frank",
      message: "Nice job!",
    },
  ];

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <ScrollView style={{ padding: 10 }}>
        {comments.map((comment) => (
          <View
            key={comment.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name="person-circle"
              size={40}
              color="white"
              style={{ marginRight: 10 }}
            />
            <View>
              <Text
                style={{ color: "white", fontWeight: "bold", marginBottom: 4 }}
              >
                {comment.name}
              </Text>
              <Text style={{ color: "white" }}>{comment.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
