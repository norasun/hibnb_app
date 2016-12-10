import React, { Component } from 'react';
import moment from 'moment';
// import { calendarData, roomsData } from '../helpers/getdata' //导入认证函数
import { getdata } from '@norasun/hibnb-core'

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  findNodeHandle,
} from 'react-native'

const RCTUIManager = require('NativeModules').UIManager;

moment.updateLocale('cn', {
    weekdaysShort : ["日", "一", "二", "三", "四", "五", "六"]
});
moment.locale('cn');

const styles = StyleSheet.create({
    mainScroll: {
        backgroundColor: '#fff'
    },
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollHeader: {
        flexDirection: 'row',
        flex: 0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    scrollView: {
        flexDirection: 'row',
        flex: 1,
    },
    mainTitle: {
        fontSize: 24,
        paddingLeft: 15,
        paddingBottom: 20,

    },
    calendarHeader:{
        alignItems: 'stretch',
        flexDirection: 'row',
        borderBottomWidth: 0,
        borderColor: '#ddd',
    },
    titlePer: {
        alignItems: 'center',
        width: 42,
        borderRightWidth: 1,
        borderColor: '#e5e5e5'
    },
    perBig: {
        fontSize: 12,
    },
    perSmall: {
        fontSize: 10,
        color: '#999',
        paddingTop: 4,
    },
    roomTitleText: {
        position: 'absolute',
        fontSize: 10,
        color: '#333',
        paddingTop: 20,
        paddingBottom: 10,
    },
    dayRow: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 10,
        borderBottomWidth: 0,
        borderColor: '#e5e5e5'
    },
    perDay: {
        width: 42,
        height: 32,
        borderRightWidth: 1,
        borderColor: '#e5e5e5',
    },
    activeDay: {
        position: 'absolute',
        top: 53,
        left: 20,
        width: 100,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#FBA994',
    }
})

let roomTitleLeft = 20


class Calendar extends Component {

    _getDays = () => {
        let startday = moment().add(-3, 'day')
        let endday = moment().add(90, 'day')
        let days = []
        while (startday.valueOf() <= endday.valueOf()) {
    	    days.push(startday.valueOf());
            startday = startday.add(1, 'day')
        }
        return days
    }

    _haha = () => {
        RCTUIManager.measure(findNodeHandle(this.refs.hahah222), (x, y, width, height, pageX, pageY) => {
            this.refs.calHeader.scrollTo({y:0, x:-pageX, animated: false})
        });
    }

    _fixHeader = () => {
        RCTUIManager.measure(findNodeHandle(this.refs.mainContainer), (x, y, width, height, pageX, pageY) => {
            if(pageY <= -50){
                this.setState({mainContainerScrollable: true})
            }
        });
    }

    constructor(props) {
      super(props);
      this.state = {
          mainContainerScrollable: true,
          roomTitleLeft: 10,
      }
    }

    componentDidMount() {
        getdata.calendarData(this.props.appState.UpdateAuth0data.id_token)
    }

    render() {
        console.log(this.props.appState);
        let calHeader = [];
        let days = this._getDays();
        console.log('calendar_auth0data: ' + this.props.appState.UpdateAuth0data.id_token);
        days.map((item)=>{
            time = moment(item)
            calHeader.push(
                <View style={styles.titlePer} key={'day'+item}>
                    <Text style={styles.perBig}>{time.format('ddd')}</Text>
                    <Text style={styles.perSmall}>{time.format('M-D')}</Text>
                </View>
            )
        })

    return (

            <View style={styles.container} ref={'mainContainer'}>
                <Text style={styles.mainTitle}>日历</Text>

                <ScrollView style={styles.scrollHeader} ref={'calHeader'} scrollEnabled={false} scrollEventThrottle={1}>
                    <View style={styles.calendarHeader}>
                        {calHeader}
                    </View>
                </ScrollView>
                <ScrollView style={styles.scrollView} onScroll={this._haha} scrollEventThrottle={3} showsHorizontalScrollIndicator={false}>
                    <View ref={'hahah222'} >

                        <Text style={[styles.roomTitleText,{left: this.state.roomTitleLeft}]}>Space, 觉醒</Text>

                        <View style={styles.dayRow}>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                        </View>

                        <Text style={[styles.roomTitleText,{left: this.state.roomTitleLeft}]}>Space, 觉醒</Text>

                        <View style={styles.dayRow}>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                            <View style={styles.perDay}></View>
                        </View>
            <View style={styles.activeDay}></View>
            </View>
        </ScrollView>

        </View>

    )
}
};

export default Calendar;
