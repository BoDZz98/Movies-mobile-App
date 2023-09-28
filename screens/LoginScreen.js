import React from "react";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  function loginHandler(email, password) {
    // console.log(email, password);
    dispatch(authActions.login());
    navigation.navigate("all");
  }
  return (
    <AuthContentCard>
      <AuthForm onPress={loginHandler} />
    </AuthContentCard>
  );
};

export default LoginScreen;
