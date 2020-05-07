import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";

class NextButton extends React.Component {
    static navigationOptions = {
        // header: null
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {this.props.text ? this.props.text : '다음'}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 60,
        borderRadius: 20,
        backgroundColor: "rgb(255, 152, 37)",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 300
    }
});

export default withNavigation(NextButton);
