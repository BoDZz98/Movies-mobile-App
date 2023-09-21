import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MovieListItem = ({ movie, width, height, numX, numY }) => {
  const rootContSize = { width: width, height: height };
  const categoryContPosition = { top: height - numY, left: width - numX };
  const ratingContPosition = { top: height - numY, right: width - numX };

  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("movieDetails");
      }}
    >
      <View style={[styles.rootCont, rootContSize]}>
        <Image style={styles.image} source={movie.photo} />
        <View style={[styles.categoryCont, categoryContPosition]}>
          <Text style={styles.text}>{movie.category}</Text>
        </View>
        <View style={[styles.ratingCont, ratingContPosition]}>
          <Text style={styles.text}>{movie.rating}</Text>
          <Ionicons name="star" color={Colors.accent500} size={20} />
        </View>
      </View>
    </Pressable>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  rootCont: {
    margin: 10,
    /* height: 300,
    width: 200, */
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  categoryCont: {
    position: "absolute",
    /* top: 250,
    left: 10, */
    flexDirection: "row",
    backgroundColor: Colors.blue,
    padding: 4,
    borderRadius: 10,
  },
  ratingCont: {
    position: "absolute",
    top: 250,
    right: 10,
    flexDirection: "row",
    backgroundColor: Colors.blue,
    padding: 4,
    borderRadius: 10,
  },

  text: {
    color: "white",
    fontWeight: "bold",
  },
});
