import React from "react";
import {  StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";

const SignupScreen = () => {
  return (
    <AuthContentCard>
      <AuthForm signingUp={true} style={styles.formCont} />
    </AuthContentCard>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  formCont: {
    height: "60%",
  },
});
