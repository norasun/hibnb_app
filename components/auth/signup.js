import React, { Component } from 'react';
import { signup } from '@norasun/hibnb-core'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native'




class Signup extends Component {

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

    _postInput = () => {
        // signup为帮助函数，位于helpers/authentication.js
        signup(this.state.email, this.state.username, this.state.password, this.props)
    }

    constructor(props) {
      super(props);
      this.state ={
          username: '',
          password: '',
          email: '',
          buttonBG: '#02E2A3',
      }
    }

    render () {
        let styles = this.props.styles;
        return (
                <View style={styles.form}>
                    <View style={styles.sayContainer}>
                        <Text style={styles.sayText}>
                            马上成为聪明房东吧！
                        </Text>
                    </View>

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
                            onSubmitEditing={() => this.focusNextField('2')}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputName}>用户名</Text>
                    </View>
                    <View style={styles.inputLine}>
                        <TextInput
                            ref={'2'}
                            style={styles.input}
                            autoCapitalize = {'none'}
                            onBlur={()=>{console.log('blur...');}}

                            // autoFocus = {true}
                            keyboardAppearance = {'dark'}
                            onChangeText={(text) => this.setState({username: text})}
                            onSubmitEditing={() => this.focusNextField('3')}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputName}>密码</Text>
                    </View>
                    <View style={styles.inputLine}>
                        <TextInput
                            ref={'3'}
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
                            <Text style={styles.greenBtnText}>
                                登录
                            </Text>
                        </View>
                    </View>
                </View>

        )
    }
}

export default Signup;
