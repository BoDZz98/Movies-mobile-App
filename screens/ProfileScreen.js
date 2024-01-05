import React, { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OverviewScreen from "./OverviewScreen";
import Fav_WishlistScreen from "./Fav_WishlistScreen";
import AllCommentsScreen from "./AllCommentsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProfilePageHeader from "../components/navigation/ProfilePageHeader";
import MyBottomSheet from "../components/profilePage/MyBottomSheet";
import { useSelector } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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
      <Tab.Screen
        name="fav"
        component={Fav_WishlistScreen}
        initialParams={{ list: "Favorites" }}
      />
      <Tab.Screen
        name="wishlist"
        component={Fav_WishlistScreen}
        initialParams={{ list: "Wishlist" }}
      />
    </Tab.Navigator>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  //  Editing UserData ---------------------------------------------------------
  const ref = useRef(null);
  const bottomSheetOpened = ref.current?.snapPoints?.length > 0;
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        !bottomSheetOpened && (
          <ProfilePageHeader
            openBottomSheetHandler={() => {
              ref.current?.present();
            }}
            bottomSheetOpened={bottomSheetShown}
          />
        ),
    });
  }, [bottomSheetShown]);
  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.contentCont}>
        <MyTabs />

        <MyBottomSheet
          closeBottomSheetHandler={() => {
            ref.current?.close();
            /*  setBottomSheetShown(false); */
          }}
          sheetRef={ref}
        />
      </View>
    </GestureHandlerRootView>
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
