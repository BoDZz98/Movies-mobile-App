import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const MovieImgs = ({ movieData }) => {
  return (
    <FlatList
      horizontal
      snapToInterval={150}
      decelerationRate={"fast"}
      showsHorizontalScrollIndicator={false}
      data={movieData}
      keyExtractor={(movieItem) => movieItem.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            <Image style={styles.image} source={item.photo} resizeMode="stretch"/>
          </View>
        );
      }}
    />
  );
};

export default MovieImgs;

const styles = StyleSheet.create({
  container: { paddingRight: 16 },
  image: {
    height:150,
    width: 250,
    borderRadius: 20,
  },
});
