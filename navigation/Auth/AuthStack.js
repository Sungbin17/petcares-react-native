import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import LoginScreen from "../../screens/Auth/LoginScreen";


const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const AuthStack = createStackNavigator(
  {
    LoginScreen,
  },
  config
);

export default AuthStack;
