import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/styles";
import MovieListItem from "../components/MovieListItem";
import FlatButton from "../components/UI/FlatButton";
import {
  fetchNewMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../util/api-services";
import { useDispatch, useSelector } from "react-redux";
import { moviesAction } from "../store/set-movies-slice";

const renderMoviesHandler = (width, height, itemData) => (
  <MovieListItem movie={itemData.item} width={width} height={height} />
);

const HomeScreen = ({ navigation }) => {
  //fetching the data from Api
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const newMovies = useSelector((state) => state.movies.newMovies);
  // console.log(popularMovies);
  useEffect(() => {
    async function getData() {
      const fetchedPopularMovies = await fetchPopularMovies();
      const fetchedNewMovies = await fetchNewMovies();
      const fetchedTopRatedMovies = await fetchTopRatedMovies();
      dispatch(moviesAction.setPopularMovies(fetchedPopularMovies));
      dispatch(moviesAction.setNewMovies(fetchedNewMovies));
      dispatch(moviesAction.setTopRatedMovies(fetchedTopRatedMovies));
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>Popular</Text>
        <FlatButton
          text="View All"
          onPress={() =>
            navigation.navigate("ListMovies", {
              listMovies: popularMovies,
              title: "Popular Movies",
            })
          }
        />
      </View>
      <View style={styles.poularMoviesCont}>
        <FlatList
          data={popularMovies}
          horizontal
          snapToInterval={Dimensions.get("window").width * 0.55}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(movieItem) => movieItem.movieId}
          renderItem={({ item }) => {
            // console.log(item);
            return (
              <MovieListItem
                movie={item}
                width={Dimensions.get("window").width * 0.55}
                height={Dimensions.get("window").height * 0.4}
                showDetails
              />
            );
          }}
        />
      </View>
      <View style={styles.newMoviesCont}>
        <View style={styles.titleCont}>
          <Text style={styles.title}>New</Text>
          <FlatButton
            text="View All"
            onPress={() =>
              navigation.navigate("ListMovies", {
                listMovies: newMovies,
                title: "New Movies",
              })
            }
          />
        </View>
        <FlatList
          data={newMovies}
          numColumns={2}
          snapToInterval={Dimensions.get("window").height * 0.32}
          decelerationRate={"fast"}
          // I wrote any bec a have 2 flatlists which may render the same content giving a warning regarding duplicate keys
          keyExtractor={(movieItem) => `${movieItem.movieId} any`}
          renderItem={({ item }) => (
            <MovieListItem
              movie={item}
              width={Dimensions.get("window").width * 0.4}
              height={Dimensions.get("window").height * 0.3}
            />
          )}
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
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  poularMoviesCont: {
    flex: 0.5,
    paddingVertical: 12,
  },
  newMoviesCont: {
    flex: 0.5,
    paddingVertical: 12,
  },
});
