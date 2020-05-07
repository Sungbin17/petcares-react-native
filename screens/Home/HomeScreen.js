import React from "react";
import { StyleSheet, View, Text } from "react-native";

class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: "펫돌보미"
};

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          여기다 이렇게 
          내가 이거 코드 올려주면 작업해서 코드 합치면 될듯
        </Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 24, backgroundColor: 'white'
  }
});

export default HomeScreen;
