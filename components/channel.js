import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions,
} from 'react-native'

import Todolist from './todolist.js';
import Calendar from './calendar.js';
import Toolbox from './toolbox.js';

let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        flex: 1
    },
    channel: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: windowWidth,
        height: windowHeight,
    },
    hide: {
        top: windowHeight,
    },
    display: {
        top: 0
    }
})


const Nav = (props) => {

    let channelState = [
        {
            name: 'HOME',
            active: false,
            loaded: false,
            content: <Todolist key="todolisthaha" appState={props.appState} dispatch = { props.dispatch } />,
        },
        {
            name: 'PULSE',
            active: false,
            loaded: false,
            content: <Calendar key="calendarhaha" appState={props.appState} dispatch = { props.dispatch } />,
        },
        {
            name: 'ADD',
            active: false,
            loaded: false,
            content: <Toolbox key="toolbox" />,
        },
        {
            name: 'PROFILE',
            active: false,
            loaded: false,
            content: <Toolbox key="toolbox" />,
        }
    ];


    let channelView = [];
    let key = 999;

    channelState.map((item)=>{
        let display_or_hide = styles.hide;
        let content = [];
        if(item.name == props.active){
            display_or_hide = styles.display;
            item.loaded = true;
        }

        //仅在切换到的频道加载内容（为了性能）
        if(item.loaded == true){
            content.push(item.content);
        }

        channelView.push(
            <View style={[styles.channel, display_or_hide]} key={item.name + key}>
                {content}
            </View>
        )
        key += 1;
    })

    return (

    <View style={styles.container}>
        {channelView}
    </View>


)};

export default Nav;
