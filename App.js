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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabPages() {
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
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
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
                return <Ionicons name="heart-circle" color={tintColor} size={40} />;
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
