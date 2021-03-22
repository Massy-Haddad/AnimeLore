import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeAnimeScreen from "./HomeAnimeScreen";
import HomeMangaScreen from "./HomeMangaScreen";

import { COLORS } from "../assets/style/colors";

function HomeScreen({ navigation, route }) {

  const Tab = createMaterialTopTabNavigator();

  const globalScreenOptions = {
    tabStyle: { backgroundColor: "COLORS.primary" },
    tabTitleStyle: { color: COLORS.primary_text },
    tabTintColor: COLORS.primary_text,
    tabBarPosition: "bottom",
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.secondary_text,
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: COLORS.secondary,
        },
      }}
    >
      <Tab.Screen name="Anime" component={HomeAnimeScreen} />
      <Tab.Screen name="Manga" component={HomeMangaScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
