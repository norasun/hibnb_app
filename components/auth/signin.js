import React, { Component } from 'react';
// import { signin } from '../../helpers/authentication' //导入认证函数
import { signin } from '@norasun/hibnb-core'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Animated,
  Easing,
} from 'react-native'


class Signin extends Component {

    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    _buttonTouch = (event) => {
        if(event == 'touchstart'){
            this.setState({buttonBG: '#01D599'})
        }else if(event == 'touchend'){
            let yesorno = false;
            if(this.state.buttonLoad.visibility == false){
                yesorno = true
            }else{
                yesorno = false
            }
            this.setState({buttonBG: '#02E2A3', buttonLoad: {visibility: yesorno},defaultState: new Animated.Value(0),})
            this._postInput();

        }
    }

    _postInput = () => {
        signin(this.state.username, this.state.password, this.props)

    }

    constructor(props) {
      super(props);
      this.state ={
          username: '',
          password: '',
          buttonBG: '#02E2A3',
          buttonLoad: {
              visibility: false,
          },
          defaultState: new Animated.Value(0),
          loadtime: 1000*60*10
      }
    }
    componentDidMount(){



    }
    componentDidUpdate() {
        if(this.state.buttonLoad.visibility == true){
            Animated.timing(          // Uses easing functions
                this.state.defaultState,    // The value to drive
                {
                    toValue: 720*4,
                    duration: 2000*4,
                    easing: Easing.linear
                }            // Configuration
            ).start();
        }
    }

    render () {
        let styles = this.props.styles;
        let buttonContent = [];
        if(this.state.buttonLoad.visibility == false){
            buttonContent.push(
                <Text style={styles.greenBtnText} key={'signingreenbtn'}>
                    登录
                </Text>
            );
        }else{
            buttonContent.push(
                <Animated.View key={'signinloadingbtn'} style={

                    {transform: [
                        {rotate: this.state.defaultState.interpolate({
                            inputRange: [0, 360],
                            outputRange: ['0deg', '360deg']
                        })},
                    ]}
                }>
                    <Image source={require('../../img/loading.svg')} style={[{width:25,height: 25,tintColor: '#fff'}]} />
                </Animated.View>
            )
        }
        return (
                <View style={styles.form}>

                    <View>
                        <Text style={styles.inputName}>邮箱</Text>
                    </View>
                    <View style={styles.inputLine}>
                        <TextInput
                            ref={'1'}
                            style={styles.input}
                            keyboardType = {'email-address'}
                            autoCapitalize = {'none'}
                            onBlur={()=>{console.log('blur...');}}

                            // autoFocus = {true}
                            keyboardAppearance = {'dark'}
                            onChangeText={(text) => this.setState({username: text})}
                            onSubmitEditing={() => this.focusNextField('2')}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputName}>密码</Text>
                    </View>
                    <View style={styles.inputLine}>
                    <TextInput
                    ref={'2'}
                    style={styles.input}
                    keyboardAppearance = {'dark'}
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry ={true}

                    />
                    </View>
                    <View>
                        <View
                            style={[styles.greenBtn, {backgroundColor: this.state.buttonBG}]}
                            onTouchStart={this._buttonTouch.bind(this,'touchstart')}
                            onTouchEnd={this._buttonTouch.bind(this,'touchend')}
                            onTouchCancel={this._buttonTouch.bind(this,'touchend')}
                        >
                            {buttonContent}

                        </View>
                        <View style={styles.lostpassword}><Text style={styles.lostpasswordText}>忘记密码了?</Text></View>
                    </View>
                </View>

        )
    }
}

export default Signin;
