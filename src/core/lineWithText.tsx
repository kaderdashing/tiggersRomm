import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function LineWithText() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flex: 1,
  },
  text: {
    marginHorizontal: 10,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
