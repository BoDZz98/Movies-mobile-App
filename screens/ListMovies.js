import React, { useLayoutEffect } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import MovieListItem from "../components/MovieListItem";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/styles";
import ListMoviesHeader from "../components/profilePage/ListMoviesHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const ListMovies = ({ navigation, route }) => {
  const listMovies = route.params.listMovies;
  const listName = route.params.listName;
  // const inHome = route.params.inHome;
  const title = route.params.title;
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        if (title) {
          return (
            <View style={styles.header}>
              <TouchableOpacity>
                <Ionicons
                  name="arrow-back"
                  onPress={() => navigation.goBack()}
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <Text style={styles.title}>{title}</Text>
            </View>
          );
        } else {
          return <ListMoviesHeader listName={listName} />;
        }
      },
    });
  }, []);
  return (
    <LinearGradient
      style={{ flex: 1, alignItems: "center" }}
      colors={[Colors.primary800, Colors.gray500]}
    >
      <FlatList
        data={listMovies}
        numColumns={2}
        keyExtractor={(movie) => movie.movieId} //id
        renderItem={({ item }) => {
          // console.log(item);
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

export default ListMovies;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: Colors.primary800,
    columnGap: 20,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal:20,
    width:'90%'
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    // width: "48%",
  },
});
