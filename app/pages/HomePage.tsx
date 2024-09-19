import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/Home/Header";
import Body from "@/components/Home/Body";
import Footer from "@/components/Home/Footer";
import useAuth from "@/hook/useAuth";

export default function HomePage() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />
        <Body />
        <Footer />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
