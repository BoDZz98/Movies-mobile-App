import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/styles";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import StartScreen from "../../screens/StartScreen";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { authActions } from "../../store/auth-slice";
import { onAuthStateChanged } from "firebase/auth";

import { userActions } from "../../store/user-data-slice";
import SearchScreen from "../../screens/SearchScreen";
import { getUserData, getUserListsLength } from "../../util/firebase-services";
import { setUserProfilePicture, uploadImage } from "../../storage-services";
import { ref } from "firebase/storage";

const Tab = createBottomTabNavigator();
//we created our own animated button instead of tabBarIcon-------------------------------
function TabButton({ props, activeIcon, inActiveIcon }) {
  const { onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 1, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      });
    }
  }, [focused]);

  // console.log(props);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animatable.View style={styles.container} ref={viewRef} duration={1000}>
        <Ionicons
          name={focused ? activeIcon : inActiveIcon}
          color={focused ? Colors.blue : "white"}
          size={30}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
}
//---------------------------------------------------------------------------------------
const BottomTabPages = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
  // setting the data of this user , same as in login page -----------------------------------------------------

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      // setUserProfilePicture();
      console.log("in bottomTabPages");
      if (!!user) {
        dispatch(authActions.login());
        try {
          const { userData, comments, profilePicture } = await getUserData(
            user
          );
          const userListsLength = await getUserListsLength();
          // set data of the user in react redux-------------------------------------------------------------------
          dispatch(
            userActions.setUser({
              userDoc: userData,
              userComments: comments,
              userListsLength,
              profilePicture,
            })
          );
        } catch (error) {
          console.log("error in bottom tab pages : ", error);
        }
      }
    });
  }, []);

  return (
    // Notice the diffrence in screenOptions syntex , we wrote an array function the return an object containing our normal options ,
    // we did it this way to naviigate to a new page when clicked on the add button
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          // tabBarLabel: "Home",
          /* tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ), */
          tabBarButton: (props) => (
            <TabButton
              props={props}
              activeIcon="home"
              inActiveIcon="home-outline"
            />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarButton: (props) => (
            <TabButton
              props={props}
              activeIcon="search"
              inActiveIcon="search-outline"
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={isAuth ? ProfileScreen : StartScreen}
        options={{
          headerShown: isAuth ? true : false,
          title: "Profile",

          tabBarButton: (props) => (
            <TabButton
              props={props}
              activeIcon="person-circle"
              inActiveIcon="person-circle-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tabBarStyle: {
    backgroundColor: Colors.gray500,
    height: 60,
    position: "absolute",
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
});
