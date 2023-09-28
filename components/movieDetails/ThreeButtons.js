import React from "react";
import { StyleSheet, View } from "react-native";
import MyButton from "../UI/MyButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const ThreeButtons = () => {
  return (
    <View style={styles.buttonsCont}>
      <MyButton text="Watch Trailer" style={styles.trailerButton}>
        <Ionicons
          name="play"
          color="white"
          size={15}
          style={{ marginHorizontal: 4 }}
        />
      </MyButton>
      <MyButton style={styles.buttonCont}>
        <Ionicons name="download-outline" color="white" size={20} />
      </MyButton>
      <MyButton style={styles.buttonCont}>
        <Ionicons name="share-social" color="white" size={20} />
      </MyButton>
    </View>
  );
};

export default ThreeButtons;

const styles = StyleSheet.create({
  buttonsCont: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  trailerButton: {
    backgroundColor: Colors.green,
    width: "50%",
  },
  buttonCont: {
    width: "18%",
    borderWidth: 2,
  },
});
