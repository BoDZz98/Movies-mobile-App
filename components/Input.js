import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/styles";

const Input = ({
  label,
  labelStyle,
  textInputConfig,
  customInputStyle,
  descErrorStyle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        {...textInputConfig} 
        style={[styles.input, customInputStyle, descErrorStyle]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
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
});
