import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Animated,
  Easing,
} from 'react-native'


class Lostpassword extends Component {

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
            // this._postInput();

        }
    }

    _postInput = () => {

        let email = this.state.email;

        if(this.state.username != '' && this.state.password != ''){

            fetch('https://hibnbme.auth0.com/oauth/ro', {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                     client_id: 'F6vsBKBDRRksDI87x19RoDgDC2Wj18qY',
                     email: email,
                     connection: 'Username-Password-Authentication',
                     grant_type: 'password',
                     scope: 'openid'
                 })
             }).then((response) => {
                 console.log(response.status);
                 if(response.status == 200){

                     console.log(response.json());
                     this.props.receiveSigninState(true);
                 }

             }).catch((error) => {
                 console.error(error);
             });
        }
    }

    constructor(props) {
      super(props);
      this.state ={
          email: '',
          buttonBG: '#02E2A3',
          buttonLoad: {
              visibility: false,
          },
          defaultState: new Animated.Value(0),
          
      }
    }
    componentDidMount(){



    }
    componentDidUpdate() {

    }

    render () {
        let styles = this.props.styles;
        let buttonContent = [];
        if(this.state.buttonLoad.visibility == false){
            buttonContent.push(
                <Text style={styles.greenBtnText}>
                    重置密码
                </Text>
            );
        }else{
            buttonContent.push(
                <Animated.View style={

                    {transform: [
                    {rotate: this.state.defaultState.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg']
                    })},
                  ]}
                }>
                    <Image source={require('../../img/loading.png')} style={[{width:25,height: 25,tintColor: '#fff'}]} />
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
                    onChangeText={(text) => this.setState({email: text})}

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
                    </View>
                </View>

        )
    }
}

export default Lostpassword;
