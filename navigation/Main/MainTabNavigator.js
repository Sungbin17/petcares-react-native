import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeStack from "./Home/HomeStack";
import ReservationStack from "./Home/ReservationStack";
import ChatStack from "./Home/ChatStack";
import NoticeStack from "./Home/NoticeStack";
import MyPageStack from "./Home/MyPageStack";

const MainTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    ReservationStack,
    ChatStack,
    NoticeStack,
    MyPageStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // width: '100%',
        // height: 56,
        // backgroundColor: '#383d3d',
        // borderWidth: 0,
      }
    }
  }
);

MainTabNavigator.path = "";

export default MainTabNavigator;
