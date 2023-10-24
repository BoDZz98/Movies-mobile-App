import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Colors } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import FavMoviesScreen from "./screens/FavMoviesScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BottomTabPages from "./components/navigation/BottomTabPages";
import CommentsScreen from "./screens/CommentsScreen";

const Stack = createNativeStackNavigator();

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
              name="comments"
              component={CommentsScreen}
              options={{
                headerTitle: "",

                headerTransparent: true,
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
