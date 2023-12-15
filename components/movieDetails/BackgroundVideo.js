import React from "react";
import { StyleSheet, View } from "react-native";
import Video from "react-native-video";

const BackgroundVideo = () => {
  function onBuffer(data) {
    // console.log(data);
  }
  function videoError(data) {
    // console.log(data);
  }
  return (
    <View style={{ flex: 1 }}>
      <Video
        ref={(ref) => {
          this.player = ref;
        }}
        // source={require("../../assets/vid.mp4")} // Can be a URL or a local file.
        onBuffer={onBuffer} // Callback when remote video is buffering
        onError={videoError} // Callback when video cannot be loaded
        resizeMode="contain"
        style={styles.backgroundVideo}
      />
    </View>
  );
};

export default BackgroundVideo;

const styles = StyleSheet.create({
  backgroundVideo: {
    // flex: 0.2,
    height: "30%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
