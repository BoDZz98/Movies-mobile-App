import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const data = [
  { name: "My Lists", icon: "list" },
  { name: "Favorites", icon: "heart-circle" },
  { name: "Wishlist", icon: "book-outline" },
  { name: "Comments", icon: "chatbox-ellipses-outline" },
];

const OverviewScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.outerCont}>
        <Pressable
          style={styles.container}
          // onPress={() => console.log("work")}
          android_ripple={{ color: Colors.primary800 }}
        >
          <Ionicons name="heart" color="white" size={40} />
          <View style={styles.textCont}>
            <Text style={styles.title}>OverviewScreen</Text>
            <Text style={styles.number}>Movies : 3</Text>
          </View>
        </Pressable>
      </View>
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
  outerCont: {
    overflow: "hidden",
    width: "70%",
    borderRadius: 12,
  },
  container: {
    flexDirection: "row",
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
