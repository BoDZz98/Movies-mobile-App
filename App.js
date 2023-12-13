import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Ionicons } from "@expo/vector-icons";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BottomTabPages from "./components/navigation/BottomTabPages";
import { useState } from "react";
import AddCommentModal from "./components/movieDetails/AddCommentModal";
import GameCommentsScreen from "./screens/GameCommentsScreen";
import MyListsScreen from "./screens/MyListsScreen";
import FavButton from "./components/FavButton";

const Stack = createNativeStackNavigator();

export default function App() {
  // Game comments modal----------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  function closeModalHandler() {
    setIsModalVisible(false);
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
