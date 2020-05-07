import React from "react";
import { StyleSheet, ScrollView, Text, SafeAreaView, View, TextInput, TouchableOpacity } from "react-native";
import NextButton from '../../components/NextButton';
import { CheckBox } from 'react-native-elements';
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { auth } from "../../redux/actions";


class MentorPayScreen2 extends React.Component {

    static navigationOptions = {
        headerTitle: "멘토링 구매"
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedMentorTerm: '',
            selectedDate: '',
            endDate: '',
            checked: false,
            checked2: false,
            form: ""
        };
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    componentDidMount() {
        let form = this.props.navigation.getParam("form", "")
        let selectedMentorTerm = form.selectedMentorTerm;
        let selectedDate = form.selectedDate;
        let endDate = new Date(selectedDate)
        if (selectedMentorTerm.id === 1) {
            endDate = endDate.setMonth(endDate.getMonth() + 1)
        } else if (selectedMentorTerm.id === 2) {
            endDate = endDate.setMonth(endDate.getMonth() + 3)
        } else if (selectedMentorTerm.id === 3) {
            endDate = endDate.setMonth(endDate.getMonth() + 6)
        }
        this.setState({ selectedMentorTerm, selectedDate, endDate, form })
    }

    // Object {
    //     "form1": "ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㅁ",
    //     "form2": "ㄴㅇㄹㅁㄴㅇㄹㅁㄴ",
    //     "form3": "",
    //     "form4": "",
    //     "selectedDate": 2020-05-03T06:32:00.883Z,
    //     "selectedMentorTerm": Object {
    //       "discountGap": "-1,008,000",
    //       "discountPrice": "462,000원",
    //       "discountRate": "68%",
    //       "id": 3,
    //       "price": "1,470,000",
    //       "title": "6개월 멘토링",
    //     },
    //     "teacher_user_id": 13,
    //   }

    _handleNext = async () => {
        let form = this.state.form;
        let applicationForm = {
            form1: form.form1,
            form2: form.form2,
            form3: form.form3,
            form4: form.form4,
            teacher: form.teacher_user_id,
            student: this.props.auth.user.id,
            start: this.formatDate(this.state.selectedDate),
            end: this.formatDate(this.state.endDate),
            mentor_term: form.selectedMentorTerm.id,
            status: '미결제'
        }
        console.log(applicationForm);
        let application = await this.props.create_application(applicationForm, this.props.auth.token);
        console.log(application)
        // this.props.navigation.navigate("MentorPayScreen3", {
        //     selectedDate: this.state.selectedDate
        // })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1, padding: 24 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        멘토링 기간 선택
                    </Text>
                    <TouchableOpacity style={styles.selectedCard}>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>상품명</Text>
                            <Text style={{ marginTop: 15 }}>멘토링 기간</Text>
                        </View>
                        <View style={{ marginLeft: 'auto' }}>
                            <Text style={{ fontWeight: 'bold' }}>{this.state.selectedMentorTerm.title}</Text>
                            <Text style={{ marginTop: 15 }}>
                                {this.formatDate(this.state.selectedDate)} ~ {this.formatDate(this.state.endDate)}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>
                                {this.state.selectedMentorTerm.title}
                            </Text>
                            <Text style={{ marginLeft: 'auto', color: 'red' }}>
                                {this.state.selectedMentorTerm.discountRate}할인  {this.state.selectedMentorTerm.discountGap}원
                            </Text>
                        </View>
                        <View style={{ height: 1, borderWidth: 0.3, borderColor: 'grey', marginTop: 10, marginBottom: 10 }}></View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>
                                총 결제 금액
                            </Text>
                            <Text style={{ marginLeft: 'auto', color: 'blue' }}>
                                {this.state.selectedMentorTerm.discountPrice}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, marginBottom: 20 }}>
                        결제 수단
                    </Text>

                    <CheckBox
                        containerStyle={{ backgroundColor: 'white' }}
                        title='신용/체크 카드'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked}
                        onPress={() => this.setState({
                            checked: !this.state.checked
                        })}
                    />

                    <View>
                        <CheckBox
                            containerStyle={{ backgroundColor: 'white' }}
                            title='주문 내역 및 결제 정보를 확인하였으며, 개인정보수집 및 이용약관에 동의합니다. '
                            checked={this.state.checked2}
                            onPress={() => this.setState({
                                checked2: !this.state.checked2
                            })}
                        />
                    </View>

                    <NextButton
                        onPress={this._handleNext}
                        text={this.state.selectedMentorTerm.discountPrice + " 결제하기"} />



                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    selectedCard: {
        height: 100,
        borderRadius: 20,
        borderWidth: 0.3,
        borderColor: "rgb(255, 152, 37)",
        flexDirection: 'row',
        padding: 25,
        marginTop: 20,
        backgroundColor: "rgb(255, 152, 37)",
    },
    card: {
        height: 100,
        borderRadius: 20,
        borderWidth: 0.3,
        borderColor: 'grey',
        // flexDirection: 'row',
        padding: 25,
        marginTop: 20
    },
});

// export default MentorPayScreen2;


const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        create_application: (applicationForm, token) => {
            return dispatch(auth.create_application(applicationForm, token));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withNavigation(MentorPayScreen2));

