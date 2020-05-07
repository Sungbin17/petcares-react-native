import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Image, Platform } from "react-native";
import NotificationScreen from "../../../screens/Notification/NotificationScreen";
import NotificationDetailScreen from "../../../screens/Notification/NotificationDetailScreen";


const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const NoticeStack = createStackNavigator(
  {
    NotificationScreen,
    NotificationDetailScreen
  },
  config
);

NoticeStack.navigationOptions = ({ navigation }) => {
  let tabBarIcon = ({ focused }) =>
    focused ? (
      <Image
        style={{ width: 20, height: 23 }}
        source={require("../../../assets/images/icons/i_alarm_on.png")}
        size={26}
      />
    ) : (
      <Image
        style={{ width: 20, height: 23 }}
        source={require("../../../assets/images/icons/i_alarm_off.png")}
        size={26}
      />
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
