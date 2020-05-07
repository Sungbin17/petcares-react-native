import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Image, Platform } from "react-native";
import ChatListSceen from "../../../screens/Chat/ChatListScreen";
import ChatDetailScreen from "../../../screens/Chat/ChatDetailScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const ChatStack = createStackNavigator(
  {
    ChatListSceen,
    ChatDetailScreen
  },
  config
);

ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarIcon = ({ focused }) =>
    focused ? (
      <Image
        style={{ width: 25, height: 21 }}
        source={require("../../../assets/images/icons/i_chat_on.png")}
        size={26}
      />
    ) : (
      <Image
        style={{ width: 25, height: 21 }}
        source={require("../../../assets/images/icons/i_chat_off.png")}
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

ChatStack.path = "";

export default ChatStack;
