import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Ionicons } from "@expo/vector-icons";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import BottomTabPages from "./components/navigation/BottomTabPages";
import { useState } from "react";
import AddCommentModal from "./components/movieDetails/AddCommentModal";
import GameCommentsScreen from "./screens/GameCommentsScreen";
import FavButton from "./components/FavButton";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ListGames from "./screens/ListGames";
const Stack = createNativeStackNavigator();

export default function App() {
  // Game comments modal-----------------------------------------------------------------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movieData, setMovieData] = useState();
  function closeModalHandler() {
    setIsModalVisible(false);
  }
  // Setting the user -----------------------------------------------------------------------------------
  //  const dispatch = useDispatch();

  onAuthStateChanged(FIREBASE_AUTH, async (user) => {
    if (user) {
      // dispatch(authActions.login());
    }
  });
  return (
    <>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
                  options={{
                    headerShown: false,
                  }}
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
                    return {
                      presentation: "modal",
                      headerTransparent: true,
                      headerTitle: "",
                      headerRight: ({ tintColor }) => {
                        return <FavButton movieId={route.params?.movieId} />;
                      },
                    };
                  }}
                />

                <Stack.Screen
                  name="gameComments"
                  component={GameCommentsScreen}
                  options={({ route }) => {
                    return {
                      headerTitle: "",
                      headerTransparent: true,
                      headerRight: ({ tintColor }) => {
                        //  Modal logic is below
                        return (
                          <Ionicons
                            name="add-circle"
                            color={tintColor}
                            size={40}
                            onPress={() => {
                              setIsModalVisible(true);
                              setMovieData({
                                poster: route.params.moviePoster,
                                title: route.params.movieName,
                              });
                            }}
                          />
                        );
                      },
                    };
                  }}
                />
                <Stack.Screen
                  name="listGames"
                  component={ListGames}
                  options={{
                    headerTitle: "wow",
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <AddCommentModal
              isVisible={isModalVisible}
              onClose={closeModalHandler}
              movieData={isModalVisible ? movieData : ""}
            />
          </Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
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

// This can be used to overwrite an existing doc by specifying the id parm ,
// if the id parm is found in the firebase it will update this doc ,else it will create a  new doc with this specified id
/* const docRef = await setDoc(doc(FIREBASE_DB, "comments", "wwww2"), {
  userId,
  movieId: "anyyyy",
  commentDesc: commentData.desc,
  rating: commentData.rating,
}); */

// Create a new doc with a random ID
/* const docRef = await addDoc(collection(FIREBASE_DB, "comments"), {
  userId,
  movieId: "anyyyy",
  commentDesc: commentData.desc,
  rating: commentData.rating,
}); */
