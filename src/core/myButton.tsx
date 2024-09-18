import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type FooProps = {
  body: string;
  onSignInPress?: () => void;
};
export default function MyButton({ body, onSignInPress }: FooProps) {
  return (
    <View
      style={{ justifyContent: "center", paddingHorizontal: 18, paddingTop: 8 }}
    >
      <LinearGradient
        colors={["#FAA9F5", "#C4E9FD"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.button}
      >
        <TouchableOpacity onPress={onSignInPress}>
          <Text style={styles.text}>{body}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});
