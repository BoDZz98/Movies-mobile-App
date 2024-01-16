import React from "react";
import ModalCard from "../UI/ModalCard";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import MyButton from "../UI/MyButton";
import { useNavigation } from "@react-navigation/native";

const ErrorModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  return (
    <ModalCard
      isVisible={isVisible}
      onClose={onClose}
      modalStyle={styles.modalStyle}
    >
      <Text style={styles.title}>OPPS</Text>
      <Text style={styles.message}>You must Login first</Text>
      <View style={styles.buttonsCont}>
        <MyButton
          onPress={onClose}
          text="Cancel"
          style={styles.cancelButton}
          textStyle={styles.buttonText}
        />
        <MyButton
          onPress={() => navigation.navigate("login")}
          text="Login"
          style={styles.loginButton}
          textStyle={styles.buttonText}
        />
      </View>
    </ModalCard>
  );
};

export default ErrorModal;
const styles = StyleSheet.create({
  modalStyle: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.3,
  },
  message: { fontSize: 20, marginTop: "15%" },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
  },
  buttonsCont: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    width: "100%",
    height: "40%",
    // marginTop: 10,
  },
  loginButton: {
    backgroundColor: Colors.blue,
    width: "50%",
    borderRadius: 0,
    borderBottomRightRadius: 50,
    // marginTop: "8%",
  },
  cancelButton: {
    backgroundColor: "red",
    width: "50%",
    borderRadius: 0,
    borderBottomLeftRadius: 50,
    // marginTop: "8%",
  },
  buttonText: {
    fontSize: 20,
    // fontWeight: "bold",
  },
});
