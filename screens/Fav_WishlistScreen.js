import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FavMovieItem from "../components/FavMovieItem";
import { Colors } from "../constants/styles";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const DATA = [
  {
    id: "m1",
    name: "Openhiemmer",
    category: ["fantasy", "zombies"],
    rating: 9,
    photo: require("../assets/imgs/open.jpg"),
  },
  {
    id: "m2",
    name: "world war z",
    category: ["fantasy", "zombies"],
    rating: 7,
    photo: require("../assets/imgs/war.jpg"),
  },
  {
    id: "m3",
    name: "Avatar",
    category: ["fantasy", "zombies"],
    rating: 8.5,
    photo: require("../assets/imgs/avatar.jpeg"),
  },
];

function renderMovieList(movieData) {
  return <FavMovieItem movieData={movieData.item} />;
}

const Fav_WishlistScreen = ({ route }) => {
  const list = route.params?.list;
  const userData = useSelector((state) => state.user.userData);
  const favMoviesData = userData.favMovies;
  const whislistMoviesData = userData.wishlistMovies;

  return (
    <View style={styles.root}>
      <View style={styles.innerCont}>
        <FlatList
          data={list === "Favorites" ? favMoviesData : whislistMoviesData}
          keyExtractor={(movieItem) => movieItem.id}
          renderItem={renderMovieList}
        />
      </View>
    </View>
  );
};

export default Fav_WishlistScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary800,
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  innerCont: { flex: 0.9 },
});
