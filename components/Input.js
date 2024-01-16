import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/styles";

const Input = ({
  label,
  labelStyle,
  textInputConfig,
  customInputStyle,
  descErrorStyle,
  errorMessage,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        {...textInputConfig}
        style={[styles.input, customInputStyle, descErrorStyle]}
      />
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 13,
  },
  label: {
    color: "white",
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.gray500,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 10,
    position: "absolute",
    bottom: -2,
  },
});
