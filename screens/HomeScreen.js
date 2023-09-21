import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import MovieListItem from "../components/MovieListItem";
import FlatButton from "../components/UI/FlatButton";

const DATA = [
  {
    id: "m1",
    name: "Openhiemmer",
    category: "fantasy",
    rating: 9,
    photo: require("../assets/imgs/open.jpg"),
  },
  {
    id: "m2",
    name: "world war z",
    category: "zombies",
    rating: 7,
    photo: require("../assets/imgs/war.jpg"),
  },
  {
    id: "m3",
    name: "Avatar",
    category: "fiction",
    rating: 8.5,
    photo: require("../assets/imgs/avatar.jpeg"),
  },
];

const renderMoviesHandler = (width, height, numX, numY, itemData) => (
  <MovieListItem
    movie={itemData.item}
    width={width}
    height={height}
    numX={numX}
    numY={numY}
  />
);

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>Popular</Text>
        <FlatButton text="View All" />
      </View>
      <View style={styles.poularMoviesCont}>
        <FlatList
          data={DATA}
          horizontal
          snapToInterval={150}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={renderMoviesHandler.bind(null, 200, 300, 190, 50)}
          keyExtractor={(movieItem) => movieItem.id}
        />
      </View>
      <View style={styles.newMoviesCont}>
        <View style={styles.titleCont}>
          <Text style={styles.title}>New</Text>
          <FlatButton text="View All" />
        </View>
        <FlatList
          data={DATA}
          numColumns={2}
          snapToInterval={250}
          decelerationRate={"fast"}
          renderItem={renderMoviesHandler.bind(null, 150, 250, 0, 0)} //145,40
          keyExtractor={(movieItem) => movieItem.id}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  titleCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  poularMoviesCont: {
    flex: 0.5,
    paddingVertical: 12,
    // backgroundColor: Colors.gray500,
  },
  newMoviesCont: {
    flex: 0.5,
    paddingVertical: 12,
    // backgroundColor: Colors.accent500,
  },
});
