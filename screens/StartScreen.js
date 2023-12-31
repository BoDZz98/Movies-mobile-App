import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MyButton from "../components/UI/MyButton";
import { Ionicons } from "@expo/vector-icons";
import FlatButton from "../components/UI/FlatButton";
import StartScreenImgs from "../components/StartScreenImgs";

const StartScreen = ({ navigation }) => {
  function navHandler(page) {
    // console.log(page);
    navigation.navigate(page);
  }
  return (
    <LinearGradient
      style={styles.root}
      colors={[Colors.primary800, Colors.gray500]}
    >
      <Text style={styles.title}>
        Explore
        <Text style={styles.subTitle}> Rate and Watch more </Text>
        movies!
      </Text>

      <StartScreenImgs />

      <View style={{ alignItems: "center" }}>
        <View style={styles.innerButtonsCont}>
          <Image
            style={styles.iconImage}
            resizeMode="cover"
            source={require("../assets/imgs/logo2.png")}
          />
          <Text style={styles.appName}>Moveeto</Text>
          <MyButton
            style={styles.myButton}
            textStyle={{ color: "black" }}
            onPress={navHandler.bind(null, "signup")}
          >
            <View style={styles.buttonView}>
              <Text>Get Started</Text>
              <Ionicons name="md-arrow-forward" size={20} />
            </View>
          </MyButton>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white" }}>Already Have an account? </Text>
          <FlatButton
            text="Login"
            textStyle={{ fontWeight: "bold" }}
            onPress={navHandler.bind(null, "login")}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 24,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    padding: 24,
  },
  subTitle: {
    fontWeight: "normal",
    fontSize: 27,
  },
  innerButtonsCont: {
    width: "100%",
    // backgroundColor: "red",
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconImage: {
    width: "20%",
    height: "150%",
    borderRadius: 3000,
  },
  appName: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  myButton: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "50%",
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 6,
  },
});
