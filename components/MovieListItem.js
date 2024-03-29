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

const MovieListItem = ({ movie, width, height, showDetails }) => {
  const rootContSize = { width, height };
  const titleContPosition = { top: height / 1.5 };

  const navigation = useNavigation();
  // Because we pass to this component values with diff names --------------
  const moviePoster = movie.poster
    ? movie.poster
    : "http://image.tmdb.org/t/p/original" + movie.poster_path; // for similar games only
  const movieId = movie.id ? movie.id : movie.movieId;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("movieDetails", { movieId: movieId });
      }}
    >
      <View style={[styles.rootCont, rootContSize]}>
        {showDetails ? (
          <BlurredImage imageUri={moviePoster} size={rootContSize} />
        ) : (
          <Image style={styles.image} source={{ uri: moviePoster }} />
        )}
        <View style={[showDetails && styles.titleCont, titleContPosition]}>
          <Text style={styles.text}>{movie.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, { fontSize: 16 }]}>{movie.rating}</Text>
            <Ionicons name="star" color={Colors.accent500} size={20} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  rootCont: {
    margin: 10,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  titleCont: {
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    bottom: 0,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
