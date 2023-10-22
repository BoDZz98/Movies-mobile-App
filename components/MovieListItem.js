import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BlurredImage from "./BlurredImage";

const MovieListItem = ({ movie, width, height }) => {
  const rootContSize = { width: width, height: height };
  // top: height - numY, left: width - numX
  const titleContPosition = { top: 250, left: 10 };
  const ratingContPosition = { top: 250, right: 10 };
  const isPopular = width === 200;

  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("movieDetails", { movieId: movie.id });
      }}
    >
      <View style={[styles.rootCont, rootContSize]}>
        {isPopular ? (
          <BlurredImage imageUri={movie.cover} size={rootContSize} />
        ) : (
          <Image style={styles.image} source={{ uri: movie.cover }} />
        )}
        <View style={[isPopular && styles.titleCont, titleContPosition]}>
          <Text style={styles.text}>{movie.title}</Text>
        </View>
        <View style={[isPopular && styles.ratingCont, ratingContPosition]}>
          <Text style={[styles.text, { fontSize: 16 }]}>{movie.rating}</Text>
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
  titleCont: {
    width: "75%",
    position: "absolute",
    flexDirection: "row",
    // backgroundColor: Colors.blue,
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
    fontSize: 20,
  },
});
