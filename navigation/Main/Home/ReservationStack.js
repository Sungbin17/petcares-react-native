import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Image, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import ReservationScreen from "../../../screens/Reservation/ReservationScreen";



const config = Platform.select({
    web: { headerMode: "screen" },
    default: {}
});

const ReservationStack = createStackNavigator(
    {
        ReservationScreen
    },
    config
);

ReservationStack.navigationOptions = ({ navigation }) => {
    let tabBarIcon = ({ focused }) =>
        focused ? (
            <AntDesign name="calendar" size={24} color="black" />
        ) : (
                <AntDesign name="calendar" size={24} color="black" />
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

ReservationStack.path = "";

export default ReservationStack;
