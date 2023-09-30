import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        tabBarStyle: { backgroundColor: Colors.gray500 },
        tabBarActiveTintColor: Colors.blue,
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={isAuth ? ProfileScreen : StartScreen}
        options={{
          headerShown: isAuth ? true : false,
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
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
