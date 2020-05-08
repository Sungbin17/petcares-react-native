import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import LoginButton from '../../components/loginButton';

class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: (
        <View>
            <Text style={{ alignItems: 'center', color: 'black', }}>
                펫 돌보미
            </Text>
        </View>
    ),
    headerLeft: (
        <Image
            style={{marginLeft: 20, width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../images/logo.jpg')} />
    ),
    headerRight: (
        <LoginButton
            style={{paddingRight: 30}}
            buttonColor={'#fdeaab'}
            title={'login'}
            onPress={()=> alert('로그인창으로 넘어가야하는데,,,')} />
    ),
    headerTitleStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerStyle: {
        flexDirection: 'row',
        backgroundColor: '#fdeaab',
    }
  };
  componentDidMount() {
  }

  _pushLogin(){
    this.props.navigator.push({
      screen: 'yuddomack.login', // unique ID registered with Navigation.registerScreen
      title: 'LOGIN', // navigation bar title of the pushed screen (optional)
      passProps: {}, // Object that will be passed as props to the pushed screen (optional)
    });
  }

  render() {
    return (
        <View>
            <View style={styles.slide}>
                <Text style={{ padding: 20, align: 'center' }}>
                    반갑습니다!
                </Text>
            </View>
            <View style={styles.container}>
                <Text>
                미용, 호텔, 병원
                </Text>
            </View>
            <View style={styles.footer}>
                <Text style={{color: '#a0855b'}}>
                Back To Top
                </Text>
                <Text></Text>
                <Text style={{color: '#a0855b'}}>
                Language                 privacy                  Terms
                </Text>
                <Text></Text>
                <Text style={{fontSize: 20}}>
                © Copyright 2019, All Rights Reserved
                </Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  slide: {
    backgroundColor: '#8f8f8f',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: '#fdeaab',
    padding: 5,
    alignItems: 'center'
  },
});

export default HomeScreen;
