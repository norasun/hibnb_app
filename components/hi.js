import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Animated,
} from 'react-native'

import Auth from './auth/auth.js';

const styles = StyleSheet.create({
    hi: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignItems: 'center',
    },
    slogan: {
        padding: 20,
        paddingTop: 0,
        backgroundColor: '#fff',
        alignItems: "center"
    },
    sloganTitle: {
        fontSize: 28,
        color: '#333'
    },
    slogandescription: {
        fontSize: 14,
        marginTop: 10,
        color: '#999',
    },
    btnContainer: {
        padding: 30,
    },
    greenBtn: {
        backgroundColor: '#02E2A3',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 20,
    },
    greenBtnText:{
        color: '#fff',
        fontSize: 18
    },
    grayBtn: {
        backgroundColor: '#eee',
    },
    grayBtnText: {
        color: '#888'
    },
    line: {
        height: 2,
        backgroundColor: '#666',
        width: 50,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 50,
    }
})

class Hi extends Component {

    _buttonTouch = (event, viewstate) => {
        if(event == 'touchstart'){
            this.setState({buttonBG: '#01D599'})
        }else if(event == 'touchend'){
            this.setState({showModal: true, buttonBG: '#02E2A3', viewstate: viewstate})
        }
    }

    _closeModal = () => {
        this.setState({showModal: false})
    }

    constructor(props) {
      super(props);
      this.state ={
          showModal: false,
          viewstate: 'signup',
          username: '',
          password: '',
          buttonBG: '#02E2A3',
          grayButtonBG: '#eee',
          logoAnimated: new Animated.Value(0.5),
      }
    }

    componentDidMount(){
        Animated.spring(          // Uses easing functions
            this.state.logoAnimated,    // The value to drive
            {
                toValue: 1,
                duration: 200,
                tension: 6,
                friction: 4,
            }            // Configuration
        ).start();
    }

    render () {

        return (
            <View
                style={styles.hi}
            >
                <Animated.View style={[styles.logoContainer,

                    {transform: [
                        {scale: this.state.logoAnimated},
                    ]}

                ]}
                >
                    <Image source={require('../img/logo.svg')} />
                </Animated.View>
                <View style={styles.line}></View>
                <View style={styles.slogan}>
                    <Text style={styles.sloganTitle}>
                        加入聪明房东的行列
                    </Text>
                    <Text style={styles.slogandescription}>
                        通过Hibnb便捷智能的房东管理工具，
                        让大部分棘手的工作自动化！
                    </Text>
                </View>
                <View style={styles.btnContainer}>
                    <View
                        style={[styles.greenBtn, {backgroundColor: this.state.buttonBG}]}
                        onTouchStart={this._buttonTouch.bind(this,'touchstart', 'signup')}
                        onTouchEnd={this._buttonTouch.bind(this,'touchend', 'signup')}
                        onTouchCancel={this._buttonTouch.bind(this,'touchend', 'signup')}
                    >
                        <Text style={styles.greenBtnText}>
                            马上注册
                        </Text>
                    </View>
                    <View
                        style={[styles.greenBtn, styles.grayBtn, {backgroundColor: this.state.grayButtonBG}]}
                        onTouchStart={this._buttonTouch.bind(this,'touchstart', 'signin')}
                        onTouchEnd={this._buttonTouch.bind(this,'touchend', 'signin')}
                        onTouchCancel={this._buttonTouch.bind(this,'touchend', 'signin')}
                    >
                        <Text style={[styles.greenBtnText, styles.grayBtnText]}>
                            登录
                        </Text>
                    </View>
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}

                >
                    <TouchableWithoutFeedback onPress={this._closeModal.bind(this)}>
                        <View style={{position: 'absolute', top: 30, left: 30,zIndex: 3,}} >
                            <Image source={require('../img/close.svg')} style={{width:20,height:20}} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Auth viewstate={this.state.viewstate} dispatch={this.props.dispatch} />
        </Modal>
            </View>
        )
    }
}

export default Hi;
