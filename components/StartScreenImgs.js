import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

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
                <Image style={styles.leftImage} source={{ uri: item.poster }} />
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
                <Image style={styles.rightImage} source={{ uri: item.poster }} />
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
    height: "60%",
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
