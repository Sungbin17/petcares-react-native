import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {withNavigation} from 'react-navigation';


class StarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let coloredStar = <Image style={{width: this.props.size, height: this.props.size}}
                                 source={require('../assets/images/icons/i_star_colored.png')}/>;

        let unColoredStar = <Image style={{width: this.props.size, height: this.props.size}}
                                   source={require('../assets/images/icons/i_star_uncolored.png')}/>;


        let coloredStars = [];

        let unColoredStars = [];

        for (let i = 0; i < this.props.stars; i++) {
            coloredStars.push(coloredStar);
        }

        for (let i = 0; i < (5 - this.props.stars); i++) {
            unColoredStars.push(unColoredStar);
        }

        return (
            <View style={styles.container}>
                {coloredStars}
                {unColoredStars}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default withNavigation(StarComponent);
