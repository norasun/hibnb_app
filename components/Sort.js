import React, { Component } from 'react'
import moment from 'moment'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  Modal,
  DatePickerIOS,
} from 'react-native'
import Datepicker from './Datepicker'

const HEADER_MAX_HEIGHT = 120
const HEADER_MIN_HEIGHT = 0
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const BACKGROUNDCOLOR = '#414141'
const SELECTBUTTON = '#575757'
const SELECTBUTTON_FONT_COLOR = '#aaa'
const SELECTBUTTONTOUCHED = '#4e4e4e'
const TOPNAV_ITEM_TEXT_COLOR = '#999'
const TOPNAV_ITEM_TEXT_ACTIVE_COLOR = '#fff'
// const BACKGROUNDCOLOR = '#01D987'
// const SELECTBUTTON = '#05F097'
// const SELECTBUTTON_FONT_COLOR = '#FFF'
// const SELECTBUTTONTOUCHED = '#4e4e4e'
// const TOPNAV_ITEM_TEXT_COLOR = '#84FBCE'

const styles = StyleSheet.create({
    topSort: {
        backgroundColor: BACKGROUNDCOLOR,
        paddingTop: 30,
        height: 200,
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    selectButton: {
        backgroundColor: SELECTBUTTON,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    selectButtonStart: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    selectButtonEnd: {
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        marginBottom: 10,
    },
    selectButtonText: {
        color: SELECTBUTTON_FONT_COLOR,
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    topNav: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    topNavItem: {
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: BACKGROUNDCOLOR,
        paddingBottom: 10,
    },
    topNavItemText: {
        color: TOPNAV_ITEM_TEXT_COLOR,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '400',
    },
    topNavItemTextActive: {
        color: TOPNAV_ITEM_TEXT_ACTIVE_COLOR,
        fontWeight: 'bold',
    }
});

export default class Sort extends Component{

    constructor(props){
        super(props)
        this.state = {
            dateButton: {
                touched: false
            },
            roomButton: {
                touched: false
            },
            StatusBar: 'light-content',
        }
        // this.touchButton = this.touchButton.bind(this)
    }

    // 点击筛选按钮
    touchButton(type, buttonId){
        if(type === 'start'){
            switch (buttonId) {
                case 'dateButton':
                    this.setState({dateButton: {touched: true}})
                    break
                case 'roomButton':
                    this.setState({roomButton: {touched: true}})
                    break
            }
        }else {
            switch (buttonId) {
                case 'dateButton':
                    this.setState({dateButton: {touched: false}})
                    break
                case 'roomButton':
                    this.setState({roomButton: {touched: false}})
                    break
            }
        }

    }

    render() {
        const scrollY = this.props.scrollY
        const headerHeight = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_MAX_HEIGHT],
            extrapolate: 'clamp',
        });
        const opacity = scrollY.interpolate({
            inputRange: [0, 40],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        const fontColor = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [TOPNAV_ITEM_TEXT_ACTIVE_COLOR, '#333'],
            extrapolate: 'clamp',
        });
        const background = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [BACKGROUNDCOLOR, '#fff'],
            extrapolate: 'clamp',
        });

        const bColor = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/3],
            outputRange: [BACKGROUNDCOLOR, '#ddd'],
            extrapolate: 'clamp',
        });
        const bColorAC = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/3],
            outputRange: [BACKGROUNDCOLOR, '#333'],
            extrapolate: 'clamp',
        });



        return (
            <Animated.View style={[styles.topSort, {marginTop: headerHeight, backgroundColor: background}]} >
                <StatusBar barStyle={this.state.StatusBar} />
                <Datepicker />
                <Animated.View
                    style={[styles.selectButton, styles.selectButtonStart, {opacity: opacity, backgroundColor: this.state.dateButton.touched ? SELECTBUTTONTOUCHED : SELECTBUTTON}]}
                    onTouchStart={() => this.touchButton('start', 'dateButton')}
                    onTouchEnd={() => this.touchButton('end', 'dateButton')}
                >
                    <Text style={styles.selectButtonText}>
                        {moment(this.props.startDay).format('YYYY-MM-DD')} / {moment(this.props.endDay).format('YYYY-MM-DD')}
                    </Text>
                </Animated.View>
                <Animated.View
                    style={[styles.selectButton, styles.selectButtonEnd, {opacity: opacity, backgroundColor: this.state.roomButton.touched ? SELECTBUTTONTOUCHED : SELECTBUTTON}]}
                    onTouchStart={() => this.touchButton('start', 'roomButton')}
                    onTouchEnd={() => this.touchButton('end', 'roomButton')}
                >
                    <Text style={styles.selectButtonText}>
                        全部房源
                    </Text>
                </Animated.View>
                <View style={styles.topNav}>
                    <Animated.View style={[styles.topNavItem, {borderBottomColor: bColorAC}]}>
                        <Animated.Text style={[styles.topNavItemText, styles.topNavItemTextActive, {color: fontColor}]}>
                            清单
                        </Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.topNavItem, {borderBottomColor: bColor}]}>
                        <Text style={styles.topNavItemText}>
                            日历
                        </Text>
                    </Animated.View>
                    <Animated.View style={[styles.topNavItem, {borderBottomColor: bColor}]}>
                        <Text style={styles.topNavItemText}>
                            统计
                        </Text>
                    </Animated.View>
                </View>
            </Animated.View>
        )
    }
}
