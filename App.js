import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import petcaresApp from "./redux/reducers";
import * as Font from "expo-font";

console.disableYellowBox = true;
let store = createStore(petcaresApp, applyMiddleware(thunk));

import InitialNavigator from "./navigation/InitialNavigator";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      AppleSDGothicNeoM: require("./assets/fonts/AppleSDGothicNeoM.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <InitialNavigator />
          </View>
        </Provider>
      );
    } else {
      return(
        <View></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
