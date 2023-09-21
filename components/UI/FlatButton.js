import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

const FlatButton = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress} android_ripple={{ color: "#ccc" }}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  text: {
    color: "#ccc",
    textDecorationLine: "underline",
  },
});
