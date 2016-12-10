import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'

import Signin from './signin.js';
import Signup from './signup.js';

const styles = StyleSheet.create({
    signin: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logoContainer: {
        paddingBottom: 10,
        alignItems: 'center',
    },
    inputLine: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    inputName: {
        color: '#999',
    },
    input: {
        height: 40,
        flex: 1,
        fontSize: 16,
    },
    greenBtn: {
        backgroundColor: '#02E2A3',
        height: 46,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    greenBtnText:{
        color: '#fff',
        fontSize: 18
    },
    signup: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    signupBtn: {
        borderRadius: 4,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        width: 80,
        alignItems: 'center',
        marginTop: 60,
    },
    signupBtnTxt: {
        color: '#666',
        fontSize: 14,
    },
    form: {
        padding: 30,
        backgroundColor: '#fff'
    },
    toggle: {
        borderBottomWidth: 0,
        borderColor: '#ccc',
        flexDirection: 'row'
    },
    toggleLink: {
        flex: 1,
        borderBottomWidth: 0,
        borderColor: '#bbb',
        paddingTop: 20,
        paddingBottom: 12,
        alignItems: 'center'
    },
    toggleActive: {
        borderBottomWidth: 3,
        borderColor: '#02E2A3',
    },
    toggleText: {
        color: '#777',
        fontSize: 16
    },
    header: {
        backgroundColor: '#F1FDFA',
        paddingTop: 40,
    },
    lostpassword: {
        paddingTop: 40,
        alignItems: 'center',
    },
    lostpasswordText: {
        color: '#888',
        fontSize: 14,
    },
    sayContainer: {
        borderRadius: 4,
        backgroundColor: '#eee',
        alignItems: 'center',
        padding: 8,
        marginBottom: 20,
    },
    sayText: {

        color: '#888',

    }
})

class Auth extends Component {

    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    _buttonTouch = (event) => {
        if(event == 'touchstart'){
            this.setState({buttonBG: '#01D599'})
        }else if(event == 'touchend'){
            this.setState({buttonBG: '#02E2A3'})
            this._postInput();

        }
    }

    _toggleView = (viewName) => {
        this.setState({viewstate: viewName});
    }

    constructor(props) {
      super(props);
      this.state ={
          viewstate: this.props.viewstate,
          username: '',
          password: '',
          buttonBG: '#02E2A3',
      }
    }

    render () {

        let showWhat = [];
        let signinActiveStyle = {};
        let signupActiveStyle = {};

        switch (this.state.viewstate) {
            case 'signin':
                showWhat.push(<Signin key={'signinview'} styles={styles} dispatch={this.props.dispatch} />)
                signinActiveStyle = styles.toggleActive;
                break;
            case 'signup':
                showWhat.push(<Signup key={'signupview'} styles={styles} dispatch={this.props.dispatch} />)
                signupActiveStyle = styles.toggleActive;
                break;
            default:
                showWhat.push(<Signup key={'signupview'} styles={styles} />)
                signupActiveStyle = styles.toggleActive;
                break;
        }


        return (
            <ScrollView
                style={styles.signin}
                keyboardDismissMode={'on-drag'}
                scrollEnabled={false}
            >
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../img/logo.svg')} />
                        </View>

                        <View style={styles.toggle}>
                            <TouchableWithoutFeedback onPress={this._toggleView.bind(this, 'signin')}>
                                <View style={[styles.toggleLink, signinActiveStyle]}>
                                    <Text style={styles.toggleText}>登录</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this._toggleView.bind(this, 'signup')}>
                                <View style={[styles.toggleLink, signupActiveStyle]} onPress={this._toggleView.bind(this, 'signup')}>
                                    <Text style={styles.toggleText}>注册</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    {showWhat}

                </KeyboardAvoidingView>

            </ScrollView>
        )
    }
}

export default Auth;
