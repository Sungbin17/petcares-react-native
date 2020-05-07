import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { chat, auth, teacher } from '../redux/actions';
import { connect } from 'react-redux';
import firebaseSvc from '../settings/FirebaseSvc';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatUser: {
        name: ''
      },
      last_message: ''
    };
  }

  async componentDidMount() {
    let chatUser = this.props.user;
    let user = this.props.auth.user;
    if (user.user_type == '학생') {
      chatUser = chatUser.teacher.id
    } else {
      chatUser = chatUser.student.id
    }
    chatUser = await this.props.getUserInfo(chatUser);
    if (chatUser !== undefined) {
      this.setState({ chatUser })
    }
    firebaseSvc.setLastMessageChatRoomId(this.props.user.room_id);
    firebaseSvc.getLastMessage(last_message => {
      this.setState({ last_message: last_message.text });
    });
  }

  _navigateChatDetail = () => {
    let room_id = this.props.user.room_id;
    firebaseSvc.setChatRoomId(room_id)
    firebaseSvc.setChatRoomInfoId(this.props.user.key);
    let chat_user = {
      student: this.props.user.student,
      teacher: this.props.user.teacher
    }
    this.props.setChatUser(chat_user)
    this.props.navigation.navigate('ChatDetailScreen')
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this._navigateChatDetail}
        style={styles.chatContainer}
        key={this.props.id}
      >
        {
          this.state.chatUser.profile_image !== null && this.state.chatUser.profile_image !== '' ?
            <Image
              style={styles.profileImage}
              source={{ uri: this.state.chatUser.profile_image }}
            /> :
            <Image
              style={styles.profileImage}
              source={require('../assets/images/no_profile.png')}
            />
        }
        <View style={{ paddingLeft: 20, paddingTop: 10 }}>
          <Text style={styles.userName}>{this.state.chatUser.name}</Text>
          <Text style={{ color: "grey", paddingTop: 20 }}>
            {this.state.last_message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    padding: 20,
    borderBottomWidth: 0.3,
    borderColor: "grey",
    flexDirection: "row"
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    teacher: state.teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: (id) => {
      return dispatch(auth.getUserInfo(id));
    },
    setChatUser: (chat_user) => {
      return dispatch(teacher.setChatUser(chat_user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Message));
