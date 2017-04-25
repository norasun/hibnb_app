import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux'
import {
  AppRegistry,
  NetInfo,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'

//导入redux生成的state（应用状态都保存在这里）
import { is_user_logged_in, actions } from '@norasun/hibnb-core'

//导入UI
import Nav from './components/nav.js';
// import Channel from './components/channel.js';
import Hi from './components/hi.js';
import Todolist from './components/todolist.js';


class App extends Component {

  _toggleNav = (navName) =>{
   this.props.dispatch(actions.navChange(navName))
  }

  constructor(props) {
    super(props);


  }

  componentWillMount() {


    //   this.props.dispatch(letLogin())


  }

  render() {

      if(is_user_logged_in(this.props.appState.Auth)){
          return (


                    <Todolist key="todolisthaha" appState={this.props.appState} dispatch={this.props.dispatch} />



          );
      }else{
          return(

               <Hi dispatch={this.props.dispatch} />


          )
      }
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: 'stretch',
      backgroundColor: "#fff",
  },
  hide: {
      top: Dimensions.get('window').height
  },
  display: {
      top: 0
  }
});


const mapStateToProps = state => ({ appState: state }); //把redux的状态传递给this.props
export default connect(mapStateToProps)(App);
