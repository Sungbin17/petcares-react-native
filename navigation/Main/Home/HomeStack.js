import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { AntDesign } from '@expo/vector-icons';

import HomeScreen from "../../../screens/Home/HomeScreen";
import DetailScreen from "../../../screens/Home/DetailScreen";
import ApplicationScreen1 from "../../../screens/Home/ApplicationScreen1";
import ApplicationScreen2 from "../../../screens/Home/ApplicationScreen2";
import MentorPayScreen1 from "../../../screens/Home/MentorPayScreen1";
import MentorPayScreen2 from "../../../screens/Home/MentorPayScreen2";
import MentorPayScreen3 from "../../../screens/Home/MentorPayScreen3";


import { Image, Platform } from "react-native";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    HomeScreen,
    DetailScreen,
    ApplicationScreen1,
    ApplicationScreen2,
    MentorPayScreen1,
    MentorPayScreen2,
    MentorPayScreen3
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

  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (
    routeName === "ProfileScreen" ||
    routeName === "SuggestPriceScreen" ||
    routeName === "DescriptionScreen" ||
    routeName === "QuestDetailScreen" ||
    routeName === "SelectStarScreen" ||
    routeName === "ReportScreen" ||
    routeName === "ActivityImageListScreen"
  ) {
    tabBarVisible = false;
  }

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
