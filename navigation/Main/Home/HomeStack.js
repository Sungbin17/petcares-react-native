import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { AntDesign } from '@expo/vector-icons';

import HomeScreen from "../../../screens/Home/HomeScreen";


import { Image, Platform } from "react-native";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },
  config
);

HomeStack.navigationOptions = ({ navigation }) => {
  const tabBarIcon = ({ focused }) =>
    focused ? (
      <AntDesign name="home" size={24} color="black" />
    ) : (
        <AntDesign name="home" size={24} color="black" />
      );

  let tabBarVisible = true;

  // const routeName = navigation.state.routes[navigation.state.index].routeName;

  const tabBarOnPress = () => {
    navigation.navigate("HomeScreen");
  };

  return {
    tabBarVisible,
    tabBarIcon,
    tabBarOnPress
  };
};

HomeStack.path = "";

export default HomeStack;
