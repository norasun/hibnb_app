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
        backgroundColor: '#eee',
        height: 49,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 2,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        opacity: 0,
    },
    per: {
        flex:2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 49,
    },
    icon: {
        tintColor: '#888',
        alignItems: 'center',
    },
    iconActive: {
        tintColor: '#000',
        alignItems: 'center',
    },
})

const navData = [
    {
        name: 'HOME',
        icon: require('../img/todolist.png'),
    },
    {
        name: 'PULSE',
        icon: require('../img/calendar.png'),
    },

    // {
    //     name: 'PULSE',
    //     icon: require('../img/pulse.png'),
    // },
    {
        name: 'ADD',
        icon: require('../img/add.png'),
    },
    {
        name: 'SETTINGS',
        icon: require('../img/profile.png'),
    },

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
                    <Image source={item.icon} style={iconStyle}  />
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
