import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar
} from 'react-native'

const HEADER_MAX_HEIGHT = 120
const HEADER_MIN_HEIGHT = 0
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const BACKGROUNDCOLOR = '#454545'

const styles = StyleSheet.create({
    topSort: {
        backgroundColor: BACKGROUNDCOLOR,
        paddingTop: 30,
        height: 180,
        justifyContent: 'space-between',
    },
    selectButton: {
        backgroundColor: '#555',
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
    },
    selectButtonEnd: {
        borderTopWidth: 1,
        borderTopColor: '#454545',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        marginBottom: 10,
    },
    selectButtonText: {
        color: '#aaa',
        lineHeight: 18,
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    topNav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    topNavItem: {
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: BACKGROUNDCOLOR,
    },
    topNavItemText: {
        color: '#999',
        fontSize: 16,
        lineHeight: 16,
        textAlign: 'center',
    },
    topNavItemTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default class Sort extends Component{


    render() {
        const scrollY = this.props.scrollY
        const headerHeight = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/2],
            outputRange: [0, -HEADER_MAX_HEIGHT],
            extrapolate: 'clamp',
        });
        const opacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/2],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        const fontColor = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/2],
            outputRange: ['#fff', '#333'],
            extrapolate: 'clamp',
        });
        const background = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/2],
            outputRange: [BACKGROUNDCOLOR, '#fff'],
            extrapolate: 'clamp',
        });

        const bColor = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/2],
            outputRange: [BACKGROUNDCOLOR, '#ddd'],
            extrapolate: 'clamp',
        });
        const bColorAC = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [BACKGROUNDCOLOR, '#333'],
            extrapolate: 'clamp',
        });

        let statusBar = []

        if(scrollY <= HEADER_MAX_HEIGHT){
            statusBar.push(<StatusBar barStyle='dark-content' />)
        }else{
            statusBar.push(<StatusBar barStyle='dark-content' />)
        }

        return (
            <Animated.View style={[styles.topSort, {marginTop: headerHeight, backgroundColor: background}]} >
                {statusBar}
                <Animated.View style={[styles.selectButton, styles.selectButtonStart, {opacity: opacity}]}>
                    <Text style={styles.selectButtonText}>
                        2016-11-09 至 2016-12-31
                    </Text>
                </Animated.View>
                <Animated.View style={[styles.selectButton, styles.selectButtonEnd, {opacity: opacity}]}>
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
