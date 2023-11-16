import React from "react";
import ModalCard from "../UI/ModalCard";
import { Dimensions, StyleSheet, Text } from "react-native";
import Input from "../Input";
import Stars from "react-native-stars";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import MyButton from "../UI/MyButton";
import { Colors } from "../../constants/styles";

const AddCommentModal = ({ isVisible, onClose }) => {
  const [start, setStars] = useState();
  // Validation----------------------------------------------------
  const [input, setInput] = useState({
    value: "",
    isValid: true,
  });
  function changeInputHandler(enteredValue) {
    setInput({ value: enteredValue, isValid: true });
  }
  function submitHanlder() {
    const descIsValid = input.value.length !== 0;
    setInput((currentValues) => {
      return { ...currentValues, isValid: descIsValid };
    });
    if (descIsValid) {
      // do sth
      console.log(input);
      // close the modal and reset the value
      setInput({ value: "", isValid: true });
      onClose();
    }
  }
  const error = input.isValid ? "" : "please write a comment";
  return (
    <ModalCard isVisible={isVisible} onClose={onClose}>
      <Text style={styles.title}>ADD Comment</Text>
      <Input
        textInputConfig={{
          multiline: true,
          value: input.value,
          onChangeText: changeInputHandler,
        }}
        label="Description"
        labelStyle={styles.label}
        customInputStyle={styles.descInput}
      />
      <Text style={styles.errorText}>{error}</Text>
      <Stars
        default={1}
        update={(val) => {
          setStars(val);
        }}
        spacing={4}
        count={5}
        fullStar={<Ionicons name="star" color="yellow" size={25} />}
        emptyStar={<Ionicons name="star-outline" color="yellow" size={25} />}
      />
      <MyButton
        onPress={submitHanlder}
        text="Add"
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </ModalCard>
  );
};

export default AddCommentModal;
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
  },
  descInput: {
    backgroundColor: "white",
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 20,
    color: "black",
    textAlignVertical: "top",
  },
  label: {
    color: "black",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.blue,
    width: "100%",
    height: "25%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginTop: "8%",
  },
  buttonText: {
    fontSize: 30,
    // fontWeight: "bold",
  },
});
