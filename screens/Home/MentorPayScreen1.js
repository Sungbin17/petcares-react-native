import React from "react";
import { StyleSheet, ScrollView, Text, SafeAreaView, View, TextInput, TouchableOpacity } from "react-native";
import TextInputStyle from '../../constants/TextInputStyle';
import NextButton from '../../components/NextButton';
import DateTimePicker from '@react-native-community/datetimepicker';


class MentorPayScreen1 extends React.Component {

    static navigationOptions = {
        headerTitle: "멘토링 신청"
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedDiscountPrice: '결제하기',
            showDatePicker: false,
            selectedDate: new Date(),
            selectedMentorTermId: '',
            mentorTermArray: [
                {
                    title: '1개월 멘토링',
                    price: '245,000',
                    discountPrice: '111,000원',
                    discountRate: '55%',
                    discountGap: '-135,000',
                    id: 1
                },
                {
                    title: '3개월 멘토링',
                    price: '735,000',
                    discountPrice: '264,000원',
                    discountRate: '64%',
                    discountGap: '-471,000',
                    id: 2
                },
                {
                    title: '6개월 멘토링',
                    price: '1,470,000',
                    discountPrice: '462,000원',
                    discountRate: '68%',
                    discountGap: '-1,008,000',
                    id: 3
                }
            ],
            selectedMentorTerm: ''
        };
    }

    componentDidMount() {

    }

    _selectMentorTerm(item) {
        this.setState({
            selectedDiscountPrice: item.discountPrice + " 결제하기",
            selectedMentorTermId: item.id,
            selectedMentorTerm: item
        })

    }


    renderMentorTermCard(item, id) {
        return (
            <TouchableOpacity
                onPress={() => this._selectMentorTerm(item)}
                style={this.state.selectedMentorTermId === item.id ? styles.selectedCard : styles.card}>
                <View style={{ marginTop: 5 }}>
                    <Text>{item.title}</Text>
                </View>
                <View style={{ marginLeft: 'auto', marginTop: -10 }}>
                    <Text style={styles.priceText}>{item.price}</Text>
                    <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.discountPrice}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({ selectedDate: currentDate })
        // setShow(Platform.OS === 'ios');
        // setDate(currentDate);
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

    _handleNext = () => {
        const { selectedMentorTerm, selectedDate } = this.state;

        if (selectedMentorTerm === '') {
            return;
        }

        let form = this.props.navigation.getParam("form", "");

        form = {
            ...form,
            selectedMentorTerm,
            selectedDate
        }

        console.log(form)

        this.props.navigation.navigate('MentorPayScreen2', {
            form
        })

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1, padding: 24 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        멘토링 기간 선택
                    </Text>

                    {
                        this.state.mentorTermArray.map((item, id) =>
                            this.renderMentorTermCard(item, id)
                        )
                    }

                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>
                        첫 수업 날짜 선택
                    </Text>

                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })} style={styles.card}>
                        <View style={{ marginTop: 5 }}>
                            <Text>
                                {this.formatDate(this.state.selectedDate)} 시작
                                {/* {this.state.selectedDate.toDateString()} */}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <NextButton
                        onPress={this._handleNext}
                        text={this.state.selectedDiscountPrice} />


                </ScrollView>
                {this.state.showDatePicker && (

                    <View>
                        <View style={{ width: '100%', height: 30, backgroundColor: "rgb(255, 152, 37)", }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}
                                style={{ marginLeft: 'auto', marginRight: 20, marginTop: 5 }}>
                                <Text style={{ fontSize: 20, color: 'white' }}>완료</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            locale="ko-KO"
                            value={this.state.selectedDate}
                            mode={'date'}
                            display="calendar"
                            onChange={this.onChangeDate}
                        />
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    selectedCard: {
        height: 80,
        borderRadius: 20,
        borderWidth: 0.3,
        borderColor: "rgb(255, 152, 37)",
        flexDirection: 'row',
        padding: 25,
        marginTop: 20,
        backgroundColor: "rgb(255, 152, 37)",
    },
    card: {
        height: 80,
        borderRadius: 20,
        borderWidth: 0.3,
        borderColor: 'grey',
        flexDirection: 'row',
        padding: 25,
        marginTop: 20
    },
    priceText: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: 'red'
    }
});

export default MentorPayScreen1;
