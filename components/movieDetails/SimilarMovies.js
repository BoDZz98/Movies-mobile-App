import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import MovieListItem from "../MovieListItem";

function renderMovieItem(itemData) {
  //   console.log(item);
  return (
    <MovieListItem
      movie={itemData.item}
      width={Dimensions.get("window").width * 0.4}
      height={Dimensions.get("window").height * 0.3}
    />
  );
}
const SimilarMovies = ({ movies }) => {
  return (
    <View
      style={{
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
      }}
    >
      <Text style={styles.title}>Similar Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(movie) => movie.id}
        horizontal
        renderItem={({ item }) => (
          <MovieListItem
            movie={item}
            width={Dimensions.get("window").width * 0.4}
            height={Dimensions.get("window").height * 0.3}
          />
        )}
      />
    </View>
  );
};

export default SimilarMovies;
const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", color: "white" },
});
