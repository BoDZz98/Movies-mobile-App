import React from "react";
import { Provider } from "react-redux";
import App from "./App";

const AppWraper = () => {
  <Provider store={store}>
    <App />
  </Provider>;
};

export default AppWraper;
