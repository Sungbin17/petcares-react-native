import React from "react";
import { StyleSheet, ScrollView, Text, SafeAreaView, View, TextInput } from "react-native";
import TextInputStyle from '../../constants/TextInputStyle';
import NextButton from '../../components/NextButton'

class ApplicationScreen2 extends React.Component {

    static navigationOptions = {
        headerTitle: "신청서 작성"
    };
    constructor(props) {
        super(props);
        this.state = {
            form3: '',
            form4: ''
        };
    }


    _handleNext = () => {
        let form1 = this.props.navigation.getParam('form1', '');
        let form2 = this.props.navigation.getParam('form2', '');
        let teacher_user_id = this.props.navigation.getParam('teacher_user_id', "")
        const {form3, form4} = this.state;
        form = {
            form1, form2, form3, form4, teacher_user_id
        }
        this.props.navigation.navigate("MentorPayScreen1",{
            form
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1, padding: 24 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text>
                            3.	멘토가 어떤 도움을 주었으면 하나요? ( 매일 공부 자극, 원하는 문제풀이, 정신적 지주 등)                        </Text>
                        <TextInput
                            value={this.state.form3}
                            onChangeText={form3 => this.setState({ form3 })}
                            multiline={true}
                            style={TextInputStyle.multiline} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text>
                            4.	월-금 자신이 어떤 패턴으로 생활하고 학습하는지 알려주세요.
                        </Text>
                        <TextInput
                            value={this.state.form4}
                            onChangeText={form4 => this.setState({ form4 })}
                            multiline={true}
                            style={TextInputStyle.multiline} />
                    </View>
                    <NextButton onPress={this._handleNext} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});

export default ApplicationScreen2;
