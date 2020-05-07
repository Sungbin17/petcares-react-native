import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";

class GoBackButton extends React.Component {
  static navigationOptions = {
    // header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <Image
          style={{ width: 10, height: 20, marginLeft: 15 }}
          source={require("../assets/images/icons/i_arrow_left.png")}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});

export default withNavigation(GoBackButton);
