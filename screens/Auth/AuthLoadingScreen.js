import React from "react";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { auth } from "../../redux/actions";
import { SkypeIndicator } from "react-native-indicators";
import Colors from "../../constants/Colors";

class AuthLoadingScreen extends React.Component {
  async componentDidMount() {

    let token = await AsyncStorage.getItem("userToken", "");
    if (token !== null) {
      let user = await this.props.getUserByToken(token);
    }
    this.props.navigation.navigate("AppNavigator");
  }

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <SkypeIndicator color={Colors.yellow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserByToken: (token) => {
      return dispatch(auth.getUserByToken(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(AuthLoadingScreen));
