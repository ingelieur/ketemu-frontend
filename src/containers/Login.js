//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux'

import { signIn } from '../actions/userAction'

// create a component
class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

const mapStateToProps = (state) => {
    console.log('ini state saat login', state)
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginData: (data) => {
            dispatch(signIn(data))
        }
    }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Login);
