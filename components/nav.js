import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'

const _alertWow = () => {
    console.log('点击了');
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: 'rgba(245,245,245,1)',
        height: 49,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 2
    },
    per: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 49,
    },
    icon: {
        width: 28,
        height: 28,
        tintColor: '#aaa',
        justifyContent: 'space-around',
    },
    iconActive: {
        width: 28,
        height: 28,
        tintColor: '#01D987',
    }
})

const navData = [
    {
        name: 'HOME',
        icon: require('../img/logo@2x.png'),
    },
    {
        name: 'PULSE',
        icon: require('../img/pulse@2x.png'),
    },
    {
        name: 'ADD',
        icon: require('../img/toolbox@2x.png'),
    },
    {
        name: 'SETTINGS',
        icon: require('../img/profile@2x.png'),
    }
];

const Nav = (props) => {

    let navView = [];
    let key = 999;
    navData.map((item)=>{
        let iconStyle = styles.icon;
        if(item.name == props.active){
            iconStyle = styles.iconActive;
        }
        navView.push(
            <TouchableWithoutFeedback onPress={props.handleClick.bind(this, item.name)} key={item.name + key}>
                <View style={styles.per} >
                    <Image source={item.icon}
                    style={iconStyle}  />
                </View>
            </TouchableWithoutFeedback>
        )
        key += 1;
    })

    return (

    <View style={styles.navbar}>
        {navView}
    </View>


)};

export default Nav;
