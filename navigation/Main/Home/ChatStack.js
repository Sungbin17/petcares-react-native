import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Image, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


import ChatListSceen from "../../../screens/Chat/ChatListScreen";
// import ChatDetailScreen from "../../../screens/Chat/ChatDetailScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const ChatStack = createStackNavigator(
  {
    ChatListSceen,
    // ChatDetailScreen
  },
  config
);

ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarIcon = ({ focused }) =>
    focused ? (
<MaterialIcons name="chat-bubble-outline" size={24} color="black" />    ) : (
<MaterialIcons name="chat-bubble-outline" size={24} color="black" />      );

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

ChatStack.path = "";

export default ChatStack;
