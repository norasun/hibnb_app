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

const HEADER_MAX_HEIGHT = 108
const HEADER_MIN_HEIGHT = 62
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const BACKGROUNDCOLOR = '#222'
const SELECTBUTTON = '#444'
const SELECTBUTTON_FONT_COLOR = '#888'
const SELECTBUTTONTOUCHED = '#4e4e4e'
const TOPNAV_ITEM_TEXT_COLOR = '#666'
const TOPNAV_ITEM_TEXT_ACTIVE_COLOR = '#fff'
// const BACKGROUNDCOLOR = '#01D987'
// const SELECTBUTTON = '#05F097'
// const SELECTBUTTON_FONT_COLOR = '#FFF'
// const SELECTBUTTONTOUCHED = '#4e4e4e'
// const TOPNAV_ITEM_TEXT_COLOR = '#84FBCE'

const styles = StyleSheet.create({
    topSort: {
        backgroundColor: BACKGROUNDCOLOR,
        paddingTop: 28,
        height: HEADER_MAX_HEIGHT,
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    sortButton: {
        flex: 3,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
    },
    selectButton: {
        backgroundColor: SELECTBUTTON,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    selectButtonStart: {
        flex: 4,
    },
    selectButtonEnd: {
        flex: 2,
    },
    selectButtonText: {
        color: SELECTBUTTON_FONT_COLOR,
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '400',
    },
    topNav: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    topNavItem: {
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: BACKGROUNDCOLOR,
    },
    topNavItemText: {
        color: TOPNAV_ITEM_TEXT_COLOR,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
    topNavItemTextActive: {
        color: TOPNAV_ITEM_TEXT_ACTIVE_COLOR,

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
            showDatepicker: false,
            StatusBar: 'light-content',
        }
        this.setDate = this.setDate.bind(this)
        // this.touchButton = this.touchButton.bind(this)
    }
    setDate(){
        this.setState({showDatepicker: false})
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
                    this.setState({dateButton: {touched: false}, showDatepicker: true})
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
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });
        const opacity = scrollY.interpolate({
            inputRange: [0, 40],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        const fontColor = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [TOPNAV_ITEM_TEXT_ACTIVE_COLOR, TOPNAV_ITEM_TEXT_ACTIVE_COLOR],
            extrapolate: 'clamp',
        });
        const background = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [BACKGROUNDCOLOR, BACKGROUNDCOLOR],
            extrapolate: 'clamp',
        });

        const bColor = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/3],
            outputRange: [BACKGROUNDCOLOR, BACKGROUNDCOLOR],
            extrapolate: 'clamp',
        });
        const bColorAC = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/3],
            outputRange: [BACKGROUNDCOLOR, BACKGROUNDCOLOR],
            extrapolate: 'clamp',
        });



        return (
            <Animated.View style={[styles.topSort, {marginTop: headerHeight, backgroundColor: background}]} >
                <StatusBar barStyle={this.state.StatusBar} />
                <Datepicker visible={this.state.showDatepicker} setDate={this.setDate} />
                <View style={styles.sortButton}>
                    <Animated.View
                        style={[styles.selectButton, styles.selectButtonStart, {opacity: opacity, backgroundColor: this.state.dateButton.touched ? SELECTBUTTONTOUCHED : SELECTBUTTON}]}
                        onTouchStart={() => this.touchButton('start', 'dateButton')}
                        onTouchEnd={() => this.touchButton('end', 'dateButton')}
                    >
                        <Text style={styles.selectButtonText}>
                            {moment(this.props.startDay).format('YY-MM-DD')} / {moment(this.props.endDay).format('YY-MM-DD')}
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
                </View>
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
