import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ThreeButtons from "../components/movieDetails/ThreeButtons";
import ActorsList from "../components/movieDetails/ActorsList";
import MovieImgs from "../components/movieDetails/MovieImgs";
import { fetchMovieDetails } from "../util/api-services";
import CategoryCont from "../components/UI/CategoryCont";
import YoutubePlayer from "react-native-youtube-iframe";
import { baseImageURL } from "../util/firebase-services";

const MovieDetailsScreen = ({ route }) => {
  //
  const [movieData, setMovieData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const movieId = route.params.movieId;

  useEffect(() => {
    async function getData() {
      // Fetching movie data ---------------------------------
      const fetchedMovieData = await fetchMovieDetails(movieId);
      setMovieData(fetchedMovieData);
      setIsLoading(false);
    }
    getData();
    // console.log(movieData);
  }, [movieId, setMovieData]);
  // Video player ----------------------------------------------------------------------------------------------------------
  const [videoOpened, setVideoOpened] = useState(false);
  function openCloseVideo() {
    setVideoOpened((currentValue) => !currentValue);
  }
  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      {videoOpened ? (
        <View style={styles.videoCont}>
          <YoutubePlayer
            height="100%"
            play={true}
            videoId={movieData.youtubeTrailerKey}
          />
        </View>
      ) : (
        <View style={styles.imgCont}>
          <Image
            style={styles.image}
            source={{ uri: baseImageURL + movieData.poster }}
            resizeMode="cover"
          />
        </View>
      )}
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
              <CategoryCont key={genre.id} categoryName={genre.name} />
            ))}
          </View>

          <ThreeButtons movieData={movieData} onClickTrailer={openCloseVideo} />

          <ActorsList actors={movieData.cast} />

          <Text style={styles.summary}>{movieData.overview}</Text>

          <MovieImgs movieData={movieData.images} />
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  videoCont: {
    height: "40%",
    backgroundColor: Colors.primary800,
    paddingTop: "20%",
    // alignItems: "center",
  },
  imgCont: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    backgroundColor: Colors.primary800,
  },
  image: {
    width: "70%",
    height: "90%",
    resizeMode: "center",
    borderRadius: 20,
  },
  container: { flex: 1, padding: 18 },
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
