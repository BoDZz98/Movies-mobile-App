import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavMoviesScreen from "./FavMoviesScreen";
import { NavigationContainer } from "@react-navigation/native";
import OverviewScreen from "./OverviewScreen";

const Tab = createMaterialTopTabNavigator();
export const MyTabs = () => {
  return (
    <Tab.Navigator
      style={{ marginTop: "50%" }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 11, color: "white" },
        tabBarItemStyle: {},
        tabBarStyle: { backgroundColor: null, marginHorizontal: 26 },
        tabBarActiveTintColor: "red",
        tabBarPressColor: "grey",
      }}
    >
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Lists" component={FavMoviesScreen} />
      {/* <Tab.Screen name="Comments" component={FavMoviesScreen} /> */}
      <Tab.Screen name="fav" component={FavMoviesScreen} />
      <Tab.Screen name="wishlist" component={FavMoviesScreen} />
    </Tab.Navigator>
  );
};
const ProfileScreen = ({ navigation }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  // console.log("isAuth", isAuth);
  return (
    <View style={styles.root}>
      <View style={styles.contentCont}>
        <MyTabs />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
     backgroundColor: Colors.primary800,

  },
  contentCont: {
    flex: 0.9,

  },
});
