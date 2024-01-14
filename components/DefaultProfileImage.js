import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const DefaultProfileImage = () => {
  return (
    <Image
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/movies-imdp.appspot.com/o/defaultPP.png?alt=media&token=b2846ee3-12ba-47c6-864b-1e015dfbe41a",
      }}
      style={styles.profileImg}
    />
  );
};

export default DefaultProfileImage;

const styles = StyleSheet.create({
  profileImg: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 100,
  },
});
