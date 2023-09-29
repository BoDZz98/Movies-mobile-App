import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FavMovieItem from "../components/FavMovieItem";
import { Colors } from "../constants/styles";

const DATA = [
  {
    id: "m1",
    name: "Openhiemmer",
    category: ["fantasy",'zombies'],
    rating: 9,
    photo: require("../assets/imgs/open.jpg"),
  },
  {
    id: "m2",
    name: "world war z",
    category: ["fantasy",'zombies'],
    rating: 7,
    photo: require("../assets/imgs/war.jpg"),
  },
  {
    id: "m3",
    name: "Avatar",
    category: ["fantasy",'zombies'],
    rating: 8.5,
    photo: require("../assets/imgs/avatar.jpeg"),
  },
];

function renderMovieList(movieData) {
  return <FavMovieItem movie={movieData.item} />;
}

const FavMoviesScreen = () => {
  return (
    <View style={styles.root}>
      <FlatList
        data={DATA}
        keyExtractor={(movieItem) => movieItem.id}
        renderItem={renderMovieList}
      />
    </View>
  );
};

export default FavMoviesScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary800,
    padding:24,
  },
});
