import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/styles";

const AuthContentCard = ({ children, style }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/imgs/logo2.png")}
      />
      <View style={[styles.formCont, style]}>{children}</View>
    </View>
  );
};

export default AuthContentCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    borderRadius: 1000,
  },
  formCont: {
    width: "80%",
    height: "60%",
  },
});
