import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

const ActorsList = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/imgs/war.jpg")}
        resizeMode="stretch"
      />
      <View style={styles.namesCont}>
        <Text style={styles.realName}>Real Name</Text>
        <Text style={styles.movieName}>Move Name</Text>
      </View>
    </View>
  );
};

export default ActorsList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    width: "60%",
    borderRadius: 20,
    backgroundColor: Colors.gray700,
    overflow: "hidden",
  },
  image: {
    width: "35%",
    height: "100%",
  },
  namesCont: {
    paddingVertical: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  realName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  movieName: {
    color: "#ccc",
    fontSize: 15,
  },
});
