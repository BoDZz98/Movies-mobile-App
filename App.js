import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import { Colors } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import FavMoviesScreen from "./screens/FavMoviesScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { authActions } from "./store/auth-slice";
import StartScreen from "./screens/StartScreen";
import * as Animatable from "react-native-animatable";
import { useEffect, useRef } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//---------------------------------------------------------
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
    <TouchableOpacity style={styles.any} onPress={onPress} activeOpacity={1}>
      <Animatable.View style={styles.any} ref={viewRef} duration={1000}>
        <Ionicons
          name={focused ? activeIcon : inActiveIcon}
          color={focused ? Colors.blue : "white"}
          size={30}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
}
//-------------------------------------------------------------------------------
function BottomTabPages() {
  // Logout-----------------------------
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  function logoutHandler() {
    dispatch(authActions.logout());
  }

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
          headerRight: ({ tintColor }) => {
            return (
              <Ionicons
                name={isAuth ? "log-out" : ""}
                color={tintColor}
                size={40}
                onPress={logoutHandler}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="all"
              component={BottomTabPages}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="movieDetails"
              component={MovieDetailsScreen}
              options={{
                presentation: "modal",
                headerTransparent: true,
                headerTitle: "",
                headerRight: ({ tintColor }) => {
                  return (
                    <Ionicons name="heart-circle" color={tintColor} size={40} />
                  );
                },
              }}
            />
            <Stack.Screen
              name="fav"
              component={FavMoviesScreen}
              options={{
                title: "Favorite Movies",
                headerStyle: { backgroundColor: Colors.gray500 },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  any: {
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

/* const DATA = [
  {
    id: "m1",
    name: "Openhiemmer",
    category: "fantasy",
    rating: 9,
    photo: require("../assets/imgs/open.jpg"),
  },
  {
    id: "m2",
    name: "world war z",
    category: "zombies",
    rating: 7,
    photo: require("../assets/imgs/war.jpg"),
  },
  {
    id: "m3",
    name: "Avatar",
    category: "fiction",
    rating: 8.5,
    photo: require("../assets/imgs/avatar.jpeg"),
  },
]; */
