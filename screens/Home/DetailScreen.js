import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";

import GoBackButton from "../../components/GoBackButton";
import StarComponent from "../../components/StarComponent";
import { teacher, loading } from "../../redux/actions";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SkypeIndicator } from "react-native-indicators";
import Colors from "../../constants/Colors";
import { Image as ImageElement, Card, ListItem, Button, Icon } from "react-native-elements";
import Carousel from "react-native-looped-carousel";
import firebaseSvc from "../../settings/FirebaseSvc";

const tabBarItemArray = ["멘토 상세", "케어프로그램 소개", "리뷰  "];
const { width, height } = Dimensions.get("window");

class DetailScreen extends React.Component {
  static navigationOptions = {
    headerLeft: <GoBackButton />,
    headerTitle: "끝까지 책임지고 같이 고민하고 달려가는 고스카이톡",
    headerTitleStyle: {
      fontSize: 15,
      color: "rgba(0, 0, 0, 0.6)"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedTabItem: "멘토 상세",
      teacher: "",
      size: { width, height: 220 },
      page: 1,
      userFeedback: [
        {
          name: '덕정 고등학교 18 김XX',
          subtitle: '모든 교육 인프라가 서울에만 초집중 되어있어서 저 같은 경기도 주민은 각종 사교육을 이용하는데 애로사항이 많았어요. 그런데 명문대 출신의 과외 선생님한테 1:1일로 매일 케어를 받으니까 너무 좋았습니다! 비록 뵙지는 않았지만 매일 저에게 동기부여를 주시고 모르는 문제도 척척 알려주셔서 너무 좋았습니다. 제 기나긴 수험생활에 정말 도움이 많이 되어주셨어요!'
        },
        {
          name: '덕정 고등학교 19 여XX',
          subtitle: '과외를 받으려고 하면 비용 문제도 무시할 수 없는 거 같습니다. 한달에 적게는 40, 많게는 80정도 들어가는 과외 비용이 정말 부담스러웠는데 고스카이톡에서는 한달에 10만원 정도의 가격으로 매일 저를 케어해주시니...! 정말 감사할 따름이에요! 부모님도 좋아하시고, 무엇보다도 매일 같이 저의 공부를 케어해주는 멘토가 있다는 게 심리적으로 정말 위안이 됩니다!'
        },
        {
          name: '의정부고등학교 19 장XX',
          subtitle: '고스카이톡의 장점을 꼽자면 아무래도 멘토 선생님과의 유대감이 제일 큰 거 같아요! 매일 멘토님의 격려와 응원 속에서 공부하고 있으니 정말 정신적으로 많이 의지가 됐어요. 가끔 멘토님한테 징징거리고 힘들다고 해서 죄송하기도 하지만ㅜㅜ ㅎㅎ 사실 수험생활이 정말 긴 터널처럼 느껴질 때가 많은데, 멘토님이 항상 즐거운 캠퍼스 생활, 그리고 고등학교 시절을 되돌아 볼 때 그때 더 효율적이게 공부하지 못한 아쉬움 등등 많은 이야기를 해주셔서 저에겐 정말 흥미로운 이야기였고, 또 동기부여도 많이 된 거 같아요! 저에게 많은 도움을 주신 김선생님 정말 감사드립니다!!'
        },
      ]
    };
  }

  async componentDidMount() {
    this.props.loadingInitialize();
    try {
      let teacher = await this.props.getTeacherDetail(this.props.teacher.profile_id);
      this.setState({ teacher });
    } catch (e) { }
    this.props.loadingComplete();
  }

  renderDescription() {
    try {
      return (
        <View style={{ padding: 16 }}>
          <Text
            style={{
              marginBottom: 2,
              fontSize: 12,
              color: "rgb(255, 152, 37)"
            }}
          >
            최고의 멘토
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 14 }}>
            {this.state.teacher.lecture_title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <StarComponent stars={parseInt(this.state.teacher.review_info.review_avg)} size={16} />
            <Text style={{ marginLeft: 5 }}>({this.state.teacher.review_info.review_cnt})</Text>
          </View>
        </View>
      );
    } catch (e) {
      return null;
    }
  }

  _selectTabItem(item) {
    this.setState({ selectedTabItem: item });
  }

  renderTabBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center"
        }}
      >
        {tabBarItemArray.map((item, key) => (
          <TouchableOpacity
            onPress={() => this._selectTabItem(item)}
            key={key}
            style={{ width: "32%" }}
          >
            <View
              style={
                this.state.selectedTabItem === item
                  ? styles.selectedTabBarItemContainer
                  : styles.tabBarItemContainer
              }
            >
              <Text
                style={
                  this.state.selectedTabItem === item
                    ? styles.selectedTabBarText
                    : styles.tabBarText
                }
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  renderMentorProfile() {
    return (
      <View style={styles.mentorProfileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              this.state.teacher.profile_image
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          {this.state.teacher.name} 멘토
        </Text>
        <View style={{ width: 220, marginLeft: "auto", marginRight: "auto" }}>
          <Text style={{ textAlign: "center", lineHeight: 17 }}>
            {this.state.teacher.univ} {this.state.teacher.major}
          </Text>
        </View>
      </View>
    );
  }

  renderMentorProfileDetail2() {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          멘토의 자기소개 및 경험
        </Text>
        <Text style={{ marginTop: 12 }}>
          {this.state.teacher.teacher_info2}
        </Text>
      </View>
    );
  }

  renderMentorProfileDetail1() {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          과외경험이나 가르쳐본 경험
        </Text>
        <Text style={{ marginTop: 12 }}>
          {this.state.teacher.teacher_info1}
        </Text>
      </View>
    );
  }

  renderMentorProfileDetail3() {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>수업대상</Text>
        <Text style={{ marginTop: 12 }}>
          {this.state.teacher.teacher_info3}
        </Text>
      </View>
    );
  }

  renderMentorCareProgram() {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          케어 프로그램 소개
        </Text>
        {/* <Text style={{ marginTop: 12 }}>
          1개월 케어: 1개월 케어 소개입니다.{"\n"}
          3개월 케어: 3개월 케어 소개입니다.{"\n"}
          6개월 케어: 6개월 케어 소개입니다.{"\n"}
        </Text> */}
        <Card
          title='스카이톡의 특징!'
        >
          <Text style={{ marginBottom: 10, fontSize: 14, lineHeight: 25 }}>
            1. 초명문대 선생님의 밀착케어! 1:1케어에도 불구하고 저렴한 과외 비용!{'\n'}
            2. 지방에서 받기 쉽지 않은 서울의 교육 인프라를 그대로!{'\n'}
            3. 효율적인 공부법을 알려주고 동기부여를 주는 게 고스카이톡의 가장 큰 특징!{'\n'}

          </Text>
          <Text style={{ marginBottom: 10, fontSize: 14, lineHeight: 25 }}>
          고스카이톡의 1:1 밀착케어 서비스는 공부하기 싫은 학생도 공부하고 싶게 만들어 줍니다. 실제 명문대 대학생의 자신만의 공부 노하우 및 캠퍼스 생활 공유를 통해 학습 동기부여를 주며, 학생이 어려워 하는 문제도 해설해주며 과외 효과를 낼 수 있습니다.
            또한, 월~금 매일 멘토와의 채팅을 통해 유대감을 형성하며, 온라인 채팅으로 과외 서비스를 제공합니다. 멘토는 학생의 상황과 수준에 맞춰 학습계획을 같이 짜고, 목표를 정해 함께 도달하도록 도와줍니다.
            </Text>
        </Card>
        <Card
          title='이런 학생에게 좋아요!'
        >
          <Text style={{ marginBottom: 10, fontSize: 14, lineHeight: 25 }}>
            - 누군가 옆에서 억지로라도 공부를 도와줬으면 하는 분{'\n'}
            - 모르는 문제가 많은데 물어볼데가 없는 분{'\n'}
            - 스스로 하는 학습에 어려움을 느끼는 분{'\n'}
          </Text>
        </Card>
        <Card
          title='어떤 도움이 될까요?'
        >
          <Text style={{ marginBottom: 10, fontSize: 14, lineHeight: 25 }}>
          고스카이톡는 학생 개개인의 상황 및 성적에 따라 맞춤형 학습방향 및 계획을 제시합니다. 또한 멘토는 그 목표에 함께 달성하기 위해 매일 학습 진도를 체크해주며 효율적인 학습법 또한 제시합니다. 어렵게 느껴지는 과목 또는 문제는 멘토님에게 언제나 물어볼 수 있습니다.
            *멘토로서의 자질이 있나요?
            고스카이톡의 멘토는 과외 경험이 풍부하고, 자기만의 공부법을 가지고 있는 명문대 출신의 멘토로만 구성되어 있습니다. 멘토와 학생의 차이점은 공부 경험이 조금 더 많고, 그 경험을 통해 좋은 결과를 얻었다는 점입니다. 스카이톡은 그 '경험'의 전수에 촛점을 맞추어 학생들에게 최고의 학습 원동력이 되려고 노력합니다.
          </Text>
        </Card>
        <Card title={'실제 학생 후기'} >
          {
            this.state.userFeedback.map((u, i) => {
              return (
                <ListItem
                  key={i}
                  roundAvatar
                  title={u.name}
                  // avatar={{ uri: u.avatar_url }}
                  subtitle={u.subtitle}
                />
              );
            })
          }
        </Card>
      </View>
    );
  }

  renderTabContent() {
    const { selectedTabItem } = this.state;
    if (selectedTabItem === "멘토 상세") {
      return (
        <View>
          {this.renderMentorProfile()}
          {this.renderMentorProfileDetail1()}
          {this.renderMentorProfileDetail2()}
          {this.renderMentorProfileDetail3()}
          {this.renderMentorCareProgram()}
        </View>
      );
    } else if (selectedTabItem === "케어프로그램 소개") {
      return (
        this.renderMentorCareProgram()
      )
    }
  }

  _sendMessage = () => {
    let chatRoomInfoData = {
      teacher: {
        id: this.props.teacher.user_id,
      },
      student: {
        id: this.props.auth.user.pk
      }
    }


    // 대화하기 로직
    // TODO 먼저 기존에 학생과 멘토가 채팅방이 있는 지 확인하는 로직 필요

    // 오직 학생만 대화 신청할 수 있게 해야 함
    let user = this.props.auth.user
    if (user.user_type === '멘토') {
      alert('학생회원만 신청 가능합니다.')
      return;
    }

    // 채팅방 정보를 만든다.
    firebaseSvc.createChatRoomInfo(chatRoomInfoData)

    // 상담신청을 요청한다.
    firebaseSvc.sendText({
      text: '상담을 요청했습니다.',
      user: { _id: this.props.auth.user.pk }
    });

    this.props.setChatUser(chatRoomInfoData)

    this.props.navigation.navigate("ChatDetailScreen")
  }

  _navigateApplication = () => {
    let teacher_user_id = this.props.teacher.user_id;
    this.props.navigation.navigate("ApplicationScreen1", {
      teacher_user_id
    })
  }

  renderBottomButton() {
    return (
      <View
        style={{
          marginBottom: 200,
          marginTop: 40,
          flexDirection: "row",
          marginLeft: 16,
          marginRight: 16
        }}
      >
        <TouchableOpacity onPress={this._navigateApplication} style={{ width: "60%" }}>
          <View style={styles.registerButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              케어신청하기
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._sendMessage} style={{ width: "35%", marginLeft: 10 }}>
          <View style={styles.talkButton}>
            <Text style={{ color: "rgba(0, 0, 0, 0.6)", fontWeight: "bold" }}>
              대화하기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  ImageComponent(item, id) {
    return (
      <View key={id} style={[this.state.size]}>
        <ImageElement
          style={{ width, height: 220 }}
          source={{
            uri: item.url
          }}
        ></ImageElement>
      </View>
    );
  }

  renderCarousel() {
    try {
      return (
        <Carousel
          // bulletsContainerStyle={{ marginBottom:  }}
          style={this.state.size}
          isLooped={false}
          autoplay={false}
          pageInfo={false}
          bullets={true}
          onAnimateNextPage={p => {
            {
              if (this.state.page !== p) {
                this.setState({ page: p });
              }
            }
          }}
        >
          {this.state.teacher.cover_images.map((item, id) =>
            this.ImageComponent(item, id)
          )}
        </Carousel>
      );
    } catch (e) {
      return null;
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, paddingRight: 24 }}>
        {this.props.loading.loaded ? (
          <ScrollView style={{ backgroundColor: "white" }}>
            {this.renderCarousel()}
            {this.renderDescription()}
            {this.renderTabBar()}
            {this.renderTabContent()}
            {this.renderBottomButton()}
          </ScrollView>
        ) : (
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <SkypeIndicator color={Colors.yellow} />
            </View>
          )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  weCareIntro: {
    backgroundColor: "rgb(253, 250, 244)",
    padding: 20
  },
  introTitleText: {
    fontWeight: "bold",
    fontSize: 16
  },
  introContentText: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 11,
    lineHeight: 15
  },
  tabBarText: {
    color: "rgb(176, 182, 185)",
    textAlign: "center"
  },
  tabBarItemContainer: {
    borderBottomWidth: 0.3,
    borderBottomColor: "grey",
    padding: 12,
    marginLeft: 5
  },
  selectedTabBarText: {
    color: "rgb(255, 152, 37)",
    textAlign: "center"
  },
  selectedTabBarItemContainer: {
    borderBottomWidth: 0.3,
    borderBottomColor: "rgb(255, 152, 37)",
    padding: 12,
    marginLeft: 5
  },
  mentorProfileContainer: {
    width: "100%",
    height: 280,
    borderBottomWidth: 0.3,
    borderColor: "rgb(244, 250, 253)",
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  registerButton: {
    backgroundColor: "rgb(255, 152, 37)",
    padding: 16,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  talkButton: {
    backgroundColor: "rgb(238, 238, 238)",
    padding: 16,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center"
  }
});

// export default DetailScreen;

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loading: state.loading,
    teacher: state.teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTeacherList: () => {
      return dispatch(teacher.getTeacherList());
    },
    getTeacherDetail: id => {
      return dispatch(teacher.getTeacherDetail(id));
    },
    loadingComplete: type => {
      return dispatch(loading.loadingComplete(type));
    },
    loadingInitialize: type => {
      return dispatch(loading.loadingInitialize(type));
    },
    setChatUser: (chat_user) => {
      return dispatch(teacher.setChatUser(chat_user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(DetailScreen));
