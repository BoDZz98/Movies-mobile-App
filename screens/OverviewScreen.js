import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const data = [
  {
    name: "My Lists",
    subName: "lists",
    icon: "list",
    pageName: "myLists",
  },
  {
    name: "Comments",
    subName: "Comments",
    icon: "chatbox-ellipses-outline",
    pageName: "Comments",
  },
  {
    name: "Favorites",
    subName: "Movies",
    icon: "heart-circle",
    pageName: "fav",
  },
  {
    name: "Wishlist",
    subName: "Movies",
    icon: "book-outline",
    pageName: "wishlist",
  },
];

const OverviewScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
      {data.map((item) => {
        return (
          <Pressable
            style={styles.container}
            onPress={() =>
              navigation.navigate(item.pageName, { type: item.name })
            }
            android_ripple={{ color: Colors.primary800 }}
            key={item.name}
          >
            <Ionicons name={item.icon} color="white" size={40} />
            <View style={styles.textCont}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.number}>{item.subName} : 3</Text>
            </View>
            <Ionicons name="arrow-forward-outline" color="white" size={30} />
          </Pressable>
        );
      })}
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
    marginVertical: 8,
    backgroundColor: "#ccc",
  },
  textCont: {
    width: "50%",
    flexDirection: "column",
  },
  title: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  number: { fontSize: 14 },
});
