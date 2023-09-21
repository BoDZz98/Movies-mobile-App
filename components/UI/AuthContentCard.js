import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/styles";

const AuthContentCard = ({ children ,style}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageCont}>
        <Image
          style={styles.image}
          source={require("../../assets/imgs/logo2.png")}
        />
      </View>
      <View style={[styles.formCont,style]}>{children}</View>
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
  imageCont: {
    width: 200,
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  formCont: {
    width: "80%",
    height: "60%",
  },
});
