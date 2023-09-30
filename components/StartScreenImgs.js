import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const IMGS = [
  require("../assets/imgs/avatar.jpeg"),
  require("../assets/imgs/war.jpg"),
];

const dum = ["1zzzzzzz", "sssssss2", "31111", "4ssss"];

const StartScreenImgs = () => {
  const movies = useSelector((state) => state.movies.popularMovies);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <FlatList
          data={movies}
          keyExtractor={(movieItem) => movieItem.id}
          renderItem={({ item, index }) => {
            if (index < 4 && index % 2 === 0) {
              return (
                <Image style={styles.leftImage} source={{ uri: item.cover }} />
              );
            }
          }}
        />
      </View>
      <View style={styles.rightContainer}>
        <FlatList
          data={movies}
          keyExtractor={(movieItem) => movieItem.id}
          renderItem={({ item, index }) => {
            if (index < 4 && index % 2 !== 0) {
              return (
                <Image style={styles.rightImage} source={{ uri: item.cover }} />
              );
            }
          }}
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
    width: "50%",
    marginTop: -30,
  },
  rightContainer: {
    width: "50%",
    marginBottom: -30,
  },
  leftImage: {
    margin: 16,
    backgroundColor: "white",
    height: 200,
    borderRadius: 16,
    transform: [{ rotate: "15deg" }],
  },
  rightImage: {
    margin: 16,
    height: 200,
    borderRadius: 16,
    transform: [{ rotate: "-15deg" }],
  },
});
