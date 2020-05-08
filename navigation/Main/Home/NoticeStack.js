import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Image, Platform } from "react-native";
import NotificationScreen from "../../../screens/Notification/NotificationScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const NoticeStack = createStackNavigator(
  {
    NotificationScreen,
    // NotificationDetailScreen
  },
  config
);

NoticeStack.navigationOptions = ({ navigation }) => {
  let tabBarIcon = ({ focused }) =>
    focused ? (
      <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
    ) : (
        <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
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

NoticeStack.path = "";

export default NoticeStack;
