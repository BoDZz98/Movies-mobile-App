import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const data = [
  { name: "My Lists", icon: "list" },
  { name: "Favorites", icon: "heart-circle" },
  { name: "Wishlist", icon: "book-outline" },
  { name: "Comments", icon: "chatbox-ellipses-outline" },
];

const OverviewScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <Pressable
        style={styles.container}
        onPress={() => navigation.navigate("wishlist")}
        android_ripple={{ color: Colors.primary800 }}
      >
        <Ionicons name="heart" color="white" size={40} />
        <View style={styles.textCont}>
          <Text style={styles.title}>OverviewScreen</Text>
          <Text style={styles.number}>Movies : 3</Text>
        </View>
        <Ionicons name="arrow-forward-outline" color="white" size={30} />
      </Pressable>
    </View>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary800,
    flexDirection: "column",
    paddingVertical: 24,
    alignItems: "center",
  },

  container: {
    width: "75%",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 6,
    backgroundColor: "#ccc",
  },
  textCont: { flexDirection: "column" },
  title: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  number: { fontSize: 14 },
});
