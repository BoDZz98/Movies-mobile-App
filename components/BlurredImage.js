import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const BlurredImage = ({ imageUri, size }) => {
  return (
    <ImageBackground source={{ uri: imageUri }} style={size}>
      <View style={styles.blurWrap}>
        <ImageBackground
          source={{ uri: imageUri }}
          blurRadius={10}
          style={[styles.blurImageStyle, size]}
        ></ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default BlurredImage;

const styles = StyleSheet.create({
  blurWrap: {
    height: "30%", //Here we need to specify the height of blurred part
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
  },

  blurImageStyle: {
    position: "absolute",
    bottom: 0,
  },
});
