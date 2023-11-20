import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Ionicons } from "@expo/vector-icons";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import BottomTabPages from "./components/navigation/BottomTabPages";
import { useEffect, useState } from "react";
import AddCommentModal from "./components/movieDetails/AddCommentModal";
import GameCommentsScreen from "./screens/GameCommentsScreen";
import MyListsScreen from "./screens/MyListsScreen";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  addMovie,
  checkMovie,
  setUserId,
  userId,
} from "./util/firebase-services";
import { onAuthStateChanged } from "firebase/auth";
import { userActions } from "./store/user-data-slice";

const Stack = createNativeStackNavigator();

export default function App() {
  //
  const dispatch = useDispatch();

  // Game comments modal----------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  function closeModalHandler() {
    setIsModalVisible(false);
  }
  // Add movies to fav -------------------------------------------------------
  const [isFav, setIsFav] = useState(false);
  const [idMovie, setIdMovie] = useState();
  // i wanted the function helper to run only once
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUserId();
      dispatch(userActions.setUser(user));
    });
    helper(idMovie);
  }, [idMovie]);

  async function helper(movieId) {
    const isFav = await checkMovie(movieId, "fav");
    setIsFav(isFav);
  }
  async function addToFav(movieId) {
    addMovie(movieId, isFav, "favMovies");
    setIsFav((currentValue) => !currentValue);
  }
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
              options={({ route }) => {
                setIdMovie(route.params?.movieId);
                return {
                  presentation: "modal",
                  headerTransparent: true,
                  headerTitle: "",
                  headerRight: ({ tintColor }) => {
                    return (
                      <Ionicons
                        name={isFav ? "heart" : "heart-circle"}
                        color={tintColor}
                        size={40}
                        onPress={addToFav.bind(null, idMovie)}
                      />
                    );
                  },
                };
              }}
            />

            <Stack.Screen
              name="gameComments"
              component={GameCommentsScreen}
              options={{
                headerTitle: "",
                headerTransparent: true,
                headerRight: ({ tintColor }) => {
                  {
                    /* Modal logic is below */
                  }
                  return (
                    <Ionicons
                      name="add-circle"
                      color={tintColor}
                      size={50}
                      onPress={() => setIsModalVisible(true)}
                    />
                  );
                },
              }}
            />
            <Stack.Screen
              name="myLists"
              component={MyListsScreen}
              options={{
                headerTitle: "",
                headerTransparent: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <AddCommentModal
          isVisible={isModalVisible}
          onClose={closeModalHandler}
        />
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
