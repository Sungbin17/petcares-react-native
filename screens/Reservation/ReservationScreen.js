import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

class ReservationScreen extends React.Component {

    static navigationOptions = {
        headerTitle: "예약하기"
    };

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>

                <View>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
                            미용
                        </Text>
                        <Image
                            style={{ width: '100%', height: 200, borderRadius: 40 }}
                            source={{ uri: "https://post-phinf.pstatic.net/MjAxOTA4MDJfMjg5/MDAxNTY0NzU2MTM2NTgz.J9-tuboDLVgTteKOnmeKaOV3eKxZy4gIoKDrmGVnCaog.-Q23blVwkCbWaffmO0GYBsAADfevxBssbDWrYi91BOMg.JPEG/GettyImages-1026276944.jpg?type=w1200" }} />
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 24, backgroundColor: 'white'
    }
});

export default ReservationScreen;
