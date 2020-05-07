import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthLoadingScreen from "../screens/Auth/AuthLoadingScreen";
import AppNavigator from './AppNavigator'
// import BottomTabNavigator from './BottomTabNavigator';

const InitialNavigator = createSwitchNavigator({
  AuthLoadingScreen,
  AppNavigator
  // BottomTabNavigator
});

export default createAppContainer(InitialNavigator);
