import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import ListGamesHeader from "../components/profilePage/ListGamesHeader";
import { Ionicons } from "@expo/vector-icons";
import MovieListItem from "../components/MovieListItem";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/styles";

const ListGames = ({ navigation, route }) => {
  const listMovies = route.params.listMovies;
  const listName = route.params.listName;
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ListGamesHeader listName={listName} />,
    });
  }, []);
  return (
    <LinearGradient
      style={{ flex: 1 ,alignItems:'center'}}
      colors={[Colors.primary800, Colors.gray500]}
    >
      <FlatList
        data={listMovies}
        numColumns={2}
        keyExtractor={(movie) => movie.movieId}
        renderItem={({ item }) => {
          return (
            <MovieListItem
              movie={item}
              width={Dimensions.get("window").width * 0.43}
              height={Dimensions.get("window").height * 0.3}
            />
          );
        }}
      ></FlatList>
    </LinearGradient>
  );
};

export default ListGames;

const styles = StyleSheet.create({});
