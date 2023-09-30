import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ThreeButtons from "../components/movieDetails/ThreeButtons";
import ActorsList from "../components/movieDetails/ActorsList";
import MovieImgs from "../components/movieDetails/MovieImgs";
import { fetchMovieDetails } from "../util/api-services";
import CategoryCont from "../components/UI/CategoryCont";
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

const MovieDetailsScreen = ({ route }) => {
  //
  const [movieData, setMovieData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const movieId = route.params.movieId;
  // console.log(movieId);
  useEffect(() => {
    async function getData() {
      const fetchedMovieData = await fetchMovieDetails(movieId);
      setMovieData(fetchedMovieData);
      setIsLoading(false);
    }
    getData();
    // console.log(movieData);
  }, [movieId, setMovieData]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <>
      <Image
        style={styles.image}
        source={require("../assets/imgs/avatar2.jpg")}
        resizeMode="cover"
      />
      <LinearGradient
        style={styles.container}
        colors={[Colors.primary800, Colors.gray500]}
      >
        <ScrollView>
          <Text style={styles.title}>{movieData.title}</Text>
          <View style={styles.detailsCont}>
            <Text style={styles.detailsText}>
              {movieData.vote_average}
              <Ionicons name="star" color={Colors.accent500} size={15} />
            </Text>
            <Text style={styles.detailsText}>{movieData.runtime}</Text>
            <Text style={styles.detailsText}>{movieData.release_date}</Text>
          </View>
          <View style={styles.detailsCont}>
            {movieData.genres.map((genre) => (
              <CategoryCont categoryName={genre.name} />
            ))}
          </View>

          <ThreeButtons />

          <ActorsList />

          <Text style={styles.summary}>{movieData.overview}</Text>

          <MovieImgs movieData={movieData.images} />
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  image: {
    // flex: 0.2,
    height: "30%",
    width: "100%",
    resizeMode: "center",
  },
  container: {
    flex: 1,
    // height:'100%',
    padding: 18,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  detailsCont: {
    flexDirection: "row",
    marginVertical: 8,
  },
  detailsText: {
    color: "#cccc",
    fontSize: 15,
    marginHorizontal: 8,
  },

  summary: { color: "#cccc", marginVertical: 20 },
});
