import React from "react";
import ModalCard from "../UI/ModalCard";
import { Dimensions, StyleSheet, Text } from "react-native";
import Input from "../Input";

const AddCommentModal = ({ isVisible, onClose }) => {
  return (
    <ModalCard isVisible={isVisible} onClose={onClose}>
      <Text style={styles.title}>ADD Comment</Text>
      <Input
        textInputConfig={{ multiline: true }}
        label="Description"
        customInputStyle={styles.descInput}
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
});
