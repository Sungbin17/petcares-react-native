import React from "react";
import { StyleSheet, ScrollView, Text, SafeAreaView, View, TextInput } from "react-native";
import TextInputStyle from '../../constants/TextInputStyle';
import NextButton from '../../components/NextButton'

class ApplicationScreen1 extends React.Component {

    static navigationOptions = {
        headerTitle: "신청서 작성"
    };
    constructor(props) {
        super(props);
        this.state = {
            form1: '',
            form2: ''
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1, padding: 24 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        멘토 선생님이 검토한 후 수업방향을 정할 중요한 정보입니다!{'\n'}
                        사실대로 자세하게 작성해주세요 :)
                    </Text>

                    <View style={{ marginTop: 20 }}>
                        <Text>
                            1. 자신을 간략하게 소개해보세요. (평소 성격, 공부 방식 등)
                        </Text>
                        <TextInput
                            value={this.state.form1}
                            onChangeText={form1 => this.setState({ form1 })}
                            multiline={true}
                            style={TextInputStyle.multiline} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text>
                            2. 현재 학업 성적을 구체적으로 알려주세요{'\n'} (예: 내신 1.2, 전국모의고사 2.3등급)
                        </Text>
                        <TextInput
                            value={this.state.form2}
                            onChangeText={form2 => this.setState({ form2 })}
                            multiline={true}
                            style={TextInputStyle.multiline} />
                    </View>
                    <NextButton onPress={() => this.props.navigation.navigate("ApplicationScreen2", {
                        teacher_user_id: this.props.navigation.getParam("teacher_user_id", ""),
                        form1: this.state.form1,
                        form2: this.state.form2
                    })} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});

export default ApplicationScreen1;
