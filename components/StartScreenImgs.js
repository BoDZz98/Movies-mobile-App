import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const IMGS = [
  require("../assets/imgs/avatar.jpeg"),
  require("../assets/imgs/war.jpg"),
];

const dum = ["1zzzzzzz", "sssssss2", "31111", "4ssss"];

const StartScreenImgs = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        {/* <Image
          style={styles.leftImage}
          resizeMode="stretch"
          source={require("../assets/imgs/avatar.jpeg")}
        />
        <Image
          style={styles.leftImage}
          source={require("../assets/imgs/war.jpg")}
        /> */}
        <FlatList
          data={dum}
          keyExtractor={(image) => image}
          renderItem={({ item, index }) => (
            <Text style={{ color: "white" }}>{item}</Text>
          )}
        />
      </View>
      <View style={styles.rightContainer}>
        <Image
          style={styles.rightImage}
          resizeMode="stretch"
          source={require("../assets/imgs/avatar.jpeg")}
        />
      </View>
    </View>
  );
};

export default StartScreenImgs;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: "67%",
  },
  leftContainer: {
    justifyContent: "flex-start",
    width: "50%",
    gap: 30,
  },
  rightContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    gap: 30,
    marginBottom: -30,
  },
  leftImage: {
    width: "100%",
    height: "50%",
    borderRadius: 16,
    transform: [{ rotate: "15deg" }],
  },
  rightImage: {
    width: "100%",
    height: "50%",
    borderRadius: 16,
    transform: [{ rotate: "-15deg" }],
  },
});
