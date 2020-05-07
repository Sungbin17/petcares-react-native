import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./Main/MainTabNavigator";
import AuthStack from './Auth/AuthStack';


export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      AuthStack
    },
    {
      initialRouteName: "Main"
    }
  )
);
