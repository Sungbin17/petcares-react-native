import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Image, Platform } from "react-native";
import MyPageScreen from "../../../screens/MyPage/MyPageScreen";

import { MaterialIcons } from '@expo/vector-icons';


const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const MyPageStack = createStackNavigator(
  {
    MyPageScreen,
  },
  config
);

MyPageStack.navigationOptions = ({ navigation }) => {
  let tabBarIcon = ({ focused }) =>
    focused ? (
      <MaterialIcons name="person-outline" size={24} color="black" />
    ) : (
        <MaterialIcons name="person-outline" size={24} color="black" />
      );

  let tabBarLabel = null;

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (
    routeName === "ChatDetail" ||
    routeName === "SelectLocationScreen" ||
    routeName === "ShowLocationScreen"
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel,
    tabBarIcon
  };
};

MyPageStack.path = "";

export default MyPageStack;
