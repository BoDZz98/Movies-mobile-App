import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
  if (list === "Favorites" && favMoviesData.length === 0) {
    return (
      <View style={{ backgroundColor: Colors.primary800, flex: 1 }}>
        <Text style={styles.msg}>No Favorite Movies </Text>
      </View>
    );
  }
  if (list !== "Favorites" && whislistMoviesData.length === 0) {
    return (
      <View style={{ backgroundColor: Colors.primary800, flex: 1 }}>
        <Text style={styles.msg}>No Wishlist Movies </Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* {favMoviesData.length === 0 && <Text style={styles.msg}>No Movies </Text>}
      {whislistMoviesData.length === 0 && (
        <Text style={styles.msg}>No Movies </Text>
      )} */}

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
  msg: {
    color: "white",
    alignSelf: "center",
    marginTop: "40%",
    fontSize: 30,
    fontWeight: "bold",
  },
});
