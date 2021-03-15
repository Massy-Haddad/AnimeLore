import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import HomeAnimeScreen from "./app/screens/HomeAnimeScreen";
import AnimeDetail from "./app/screens/AnimeDetail";

import { COLORS } from "./app/assets/style/colors";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

enableScreens();
const Stack = createSharedElementStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTitleStyle: { color: COLORS.primary_text },
  headerTintColor: COLORS.primary_text,
};

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="Home"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          /*
          options={({ navigation, route }) => ({
            headerTitleStyle: { alignSelf: "center" },
            title: "TOP",
          })}
          */
        />

        <Stack.Screen name="HomeAnime" component={HomeAnimeScreen} />

        <Stack.Screen
          name="AnimeDetail"
          component={AnimeDetail}
          options={({ navigation, route }) => ({
            headerShown: false,
            headerBackTitleVisible: false,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
          /*
          sharedElementsConfig={(route) => {
            const { item } = route.params;
            return [
              {
                title: `item.${item.id}.bg`,
              },
              {
                title: `item.${item.id}.title`,
              },
              {
                image: `item.${item.id}.image`,
                animation: "move",
                resize: "clip",
                align: "center-top",
              },
              {
                bg: `general.bg`,
              },
            ];
          }}
          */
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
