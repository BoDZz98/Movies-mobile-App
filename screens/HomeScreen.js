import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import MovieListItem from "../components/MovieListItem";
import FlatButton from "../components/UI/FlatButton";
import { fetchNewMovies, fetchPopularMovies } from "../util/api-services";
import { useDispatch, useSelector } from "react-redux";
import { moviesAction } from "../store/set-movies-slice";

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
  //fetching the data from Api
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const newMovies = useSelector((state) => state.movies.newMovies);
  // console.log(popularMovies);
  useEffect(() => {
    async function getData() {
      const fetchedPopularMovies = await fetchPopularMovies();
      const fetchedNewMovies = await fetchNewMovies();
      dispatch(moviesAction.setPopularMovies(fetchedPopularMovies));
      dispatch(moviesAction.setNewMovies(fetchedNewMovies));
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>Popular</Text>
        <FlatButton text="View All" />
      </View>
      <View style={styles.poularMoviesCont}>
        <FlatList
          data={popularMovies}
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
          data={newMovies}
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
