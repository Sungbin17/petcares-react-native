import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Image, Platform } from "react-native";
import MyPageScreen from "../../../screens/MyPage/MyPageScreen";
import StudentChangeProfileScreen from '../../../screens/MyPage/StudentChangeProfileScreen'
import StudentRegisterScreen1 from '../../../screens/Auth/Student/StudentRegisterScreen1'

import MentorRegisterScreen1 from '../../../screens/Auth/Mentor/MentorRegisterScreen1';
import MentorRegisterScreen2 from '../../../screens/Auth/Mentor/MentorRegisterScreen2';


const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const MyPageStack = createStackNavigator(
  {
    MyPageScreen,
    StudentChangeProfileScreen,
    StudentRegisterScreen1,
    MentorRegisterScreen1,
    MentorRegisterScreen2
  },
  config
);

MyPageStack.navigationOptions = ({ navigation }) => {
  let tabBarIcon = ({ focused }) =>
    focused ? (
      <Image
        style={{ width: 20, height: 23 }}
        source={require("../../../assets/images/icons/i_person_on.png")}
        size={26}
      />
    ) : (
      <Image
        style={{ width: 20, height: 23 }}
        source={require("../../../assets/images/icons/i_person_off.png")}
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

MyPageStack.path = "";

export default MyPageStack;
