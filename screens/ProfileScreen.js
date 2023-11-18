import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/styles";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OverviewScreen from "./OverviewScreen";
import Fav_WishlistScreen from "./Fav_WishlistScreen";
import AllCommentsScreen from "./AllCommentsScreen";

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
      <Tab.Screen
        name="Comments"
        component={AllCommentsScreen}
        options={{ tabBarLabelStyle: { fontSize: 10, color: "white" } }}
      />
      {/* <Tab.Screen name="Comments" component={FavMoviesScreen} /> */}
      <Tab.Screen name="fav" component={Fav_WishlistScreen} />
      <Tab.Screen name="wishlist" component={Fav_WishlistScreen} />
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
