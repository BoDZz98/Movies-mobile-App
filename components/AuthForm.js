import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { Colors } from "../constants/styles";
import FlatButton from "./UI/FlatButton";
import { useNavigation } from "@react-navigation/native";

const AuthForm = ({ signingUp }) => {
  // Validation --------------------------
  const [inputs, setInputs] = useState({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
  });
  function changeInputHandler(identifier, enteredValue) {
    setInputs((prevState) => {
      return {
        ...prevState,
        [identifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHanlder() {
    const nameIsValid = inputs.name.value.trim().length !== 0;
    const emailIsValid = inputs.email.value.includes("@");
    const passwordIsValid = inputs.password.value.trim().length > 6;
    const confirmPasswordIsValid =
      inputs.confirmPassword.value === inputs.password.value;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (signingUp && (!nameIsValid || !confirmPasswordIsValid))
    ) {
      console.log("false");
      setInputs((currentValues) => {
        return {
          name: {
            value: currentValues.name.value,
            isValid: nameIsValid,
          },
          email: {
            value: currentValues.email.value,
            isValid: emailIsValid,
          },
          password: {
            value: currentValues.password.value,
            isValid: passwordIsValid,
          },
          confirmPassword: {
            value: currentValues.confirmPassword.value,
            isValid: confirmPasswordIsValid,
          },
        };
      });
    } else {
      console.log("true");
    }
  }
  // Navigation ---------------------------------------
  const navigation = useNavigation();
  function changeModeHandler() {
    navigation.replace(signingUp ? "login" : "signup");
  }
  //-------------------------------------------------
  return (
    <View style={styles.container}>
      {signingUp && (
        <Input
          label="Name"
          textInputConfig={{
            onChangeText: changeInputHandler.bind(null, "name"),
          }}
        />
      )}
      <Input
        label="Email"
        textInputConfig={{
          onChangeText: changeInputHandler.bind(null, "email"),
        }}
      />
      <Input
        label="Password"
        textInputConfig={{
          secureTextEntry: true,
          onChangeText: changeInputHandler.bind(null, "password"),
        }}
      />
      {signingUp && (
        <Input
          label="Confirm Password"
          textInputConfig={{
            secureTextEntry: true,
            onChangeText: changeInputHandler.bind(null, "confirmPassword"),
          }}
        />
      )}
      <View style={styles.buttonCont}>
        <Button
          title={signingUp ? "SignUp" : "Login"}
          color={Colors.gray700}
          onPress={submitHanlder}
        />
      </View>
      <View style={styles.textCont}>
        <Text style={styles.text}>
          {signingUp ? "Already registered?" : "Don't have an account"}
        </Text>
        <FlatButton
          text={signingUp ? "Login" : "SignUp"}
          onPress={changeModeHandler}
        />
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCont: {
    marginVertical: 8,
    width: "90%",
    borderRadius: 10,
    overflow: "hidden",
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: "white",
    marginHorizontal: 4,
    fontSize: 13,
  },
});
