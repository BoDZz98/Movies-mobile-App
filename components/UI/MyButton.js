import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const MyButton = ({ text, children, style, textStyle, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={styles.pressableCont}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        {children}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default MyButton;
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: "white",
    justifyContent: "center",
    overflow: "hidden",
  },
  pressableCont: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
