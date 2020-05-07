import React from "react";
import { StyleSheet, ScrollView, Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import NextButton from '../../components/NextButton';


class MentorPayScreen3 extends React.Component {

    static navigationOptions = {
        header: null
    };

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


    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

                <View style={{ width: '90%', height: '60%', backgroundColor: '#E0E0E0', borderRadius: 20, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                            멘토에게 신청이 완료되었습니다.
                    </Text>
                        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}>
                            멘토가 곧 연락을 드릴 예정입니다. {'\n'}
                            학습 시작일: {this.formatDate(this.props.navigation.getParam('selectedDate', ''))}
                        </Text>
                        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}>
                            마이페이지 - 현재 진행중인 멘토링{'\n'}에서 멘토 확인 가능
                    </Text>
                    </View>
                    <TouchableOpacity style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgb(255, 152, 37)", borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>확인</Text>
                    </TouchableOpacity>
                </View>


            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});

export default MentorPayScreen3;
