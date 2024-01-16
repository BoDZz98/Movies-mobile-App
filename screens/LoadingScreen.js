import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";

const LoadingScreen = () => {
  return (
    <>
      <View style={styles.imgCont}>
        <View style={styles.image} />
      </View>
      <LinearGradient
        style={styles.container}
        colors={[Colors.primary800, Colors.gray500]}
      >
        <View style={styles.title} />
        <View style={[styles.title, { height: "10%", width: "80%" }]} />
        <View style={[styles.title, { height: "10%", width: "60%" }]} />
        {/* <ScrollView showsVerticalScrollIndicator={false}>
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

          <SimilarMovies movies={movieData.similarMovies} />
        </ScrollView> */}
      </LinearGradient>
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  imgCont: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    backgroundColor: Colors.primary800,
  },
  image: {
    width: "70%",
    height: "90%",
    borderRadius: 20,
    backgroundColor: "#2b2b2a",
    opacity: 0.7,
  },
  container: { flex: 1, padding: 18 },
  title: {
    height: "30%",
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#2b2b2a",
    marginVertical: 10,
    opacity: 0.9,
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
