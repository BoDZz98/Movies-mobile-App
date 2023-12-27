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
import ProfilePageHeader from "./ProfilePageHeader";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { authActions } from "../../store/auth-slice";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { userActions } from "../../store/user-data-slice";
import SearchScreen from "../../screens/SearchScreen";

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
  onAuthStateChanged(FIREBASE_AUTH, async (user) => {
    if (!!user) {
      dispatch(authActions.login());

      const userRefDoc = doc(FIREBASE_DB, "users", user?.uid);
      const userSnapDoc = await getDoc(userRefDoc);
      // getting comments of this particular user-------------
      const comments = [];
      const userComments = query(
        collection(FIREBASE_DB, "comments"),
        where("userId", "==", user.uid)
      );
      const userCommentsSnapshot = await getDocs(userComments);
      userCommentsSnapshot.forEach((doc) => {
        // Each doc is a comment
        comments.push({ commentId: doc.id, ...doc.data() });
      });
      dispatch(
        userActions.setUser({
          userDoc: userSnapDoc.data(),
          userComments: comments,
        })
      );
    }
  });

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
          header: () => {
            return <ProfilePageHeader />;
          },
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
