import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type HeaderNavigationProps = {
  paddingTop: number;
  pageTitle: string;
};

export default function HeaderNavigation({
  paddingTop,
  pageTitle,
}: HeaderNavigationProps) {
  const router = useRouter();

  return (
    <View style={[styles.headerContainer, { paddingTop }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>{pageTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    // paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 10,
    position: "relative",
  },
  backButton: {
    left: 0,
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 28,
    color: "black",
    textAlign: "center",
    flex: 1,
    marginLeft: -15,
  },
});
