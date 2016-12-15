import React, { Component } from 'react';
import moment from 'moment';
// import { calendarData, roomsData } from '../helpers/getdata' //导入认证函数
import { formatdata, showview } from '@norasun/hibnb-core'

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
        paddingTop: 74,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'stretch',
    },
    scrollHeader: {
        padding: 10,
        paddingLeft: 0,
        // borderBottomWidth: 1,
        // borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    scrollView: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    mainTitle: {
        fontSize: 24,
        paddingLeft: 15,
        paddingBottom: 20,
    },
    calendarHeader:{
        flexDirection: 'row',
        borderBottomWidth: 0,
        borderColor: '#ddd',
    },
    titlePer: {
        alignItems: 'center',
        width: 50,
        borderRightWidth: 1,
        borderColor: '#ddd'
    },
    perBig: {
        fontSize: 14,
    },
    perSmall: {
        fontSize: 12,
        color: '#888',
        paddingTop: 4,
    },
    roomTitleText: {
        position: 'absolute',
        fontSize: 12,
        color: '#333',
        paddingTop: 10,
        marginBottom: 10,
    },
    dayRow: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingBottom: 10,
        borderBottomWidth: 0,
        borderColor: '#e5e5e5',
    },
    perDay: {
        width: 50,
        height: 40,
        borderRightWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#f2f2f2',
        borderColor: '#bbb',
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
        // getdata.calendarData(this.props.appState.Auth0.id_token)
    }

    render() {

        let header = []
        let table = []
        let resevation = []

        //生成列表头header
        let days = formatdata.daysArray(this.props.startDay, this.props.endDay);
        let headerCol = []
        // 遍历日期取得表头
        days.map((day) => {
            headerCol.push(
                <View style={styles.titlePer}  key={'h'+ day.format('YYMMDD')}>
                    <Text style={styles.perBig}>{day.format('ddd')}</Text>
                    <Text style={styles.perSmall}>{day.format('MM-DD')}</Text>
                </View>
            )
            return false
        })
        header.push(
            <ScrollView style={styles.scrollHeader} ref={'calHeader'} scrollEnabled={false} scrollEventThrottle={8}>
                <View style={styles.calendarHeader}>
                    {headerCol}
                </View>
            </ScrollView>
        )

        // 创建表格
        if(this.props.rooms.totalCount === 0){
            table.push(<View>暂无房源数据</View>)
        }else{
            // 遍历房源列表，获取每行表格
            this.props.rooms.content.map((item) => {

                // 如果房源id和当前选中的一致，则遍历；如果选择的是全部房源（等于null），则全部遍历
                if(item.bnbRoomId === this.props.selectedRoom || this.props.selectedRoom === null){
                // 房源标题
                table.push(
                    <Text
                        key={item.bnbRoomId + 'name'}
                        style={[
                            styles.roomTitleText,
                            {left: this.state.roomTitleLeft}
                        ]}>
                        {item.name}
                    </Text>

                )
                // 行数据，根据时间区间创建，为每一个单元格设置id
                let row = []
                days.map((d) => {
                    row.push(
                        <View
                            style={styles.perDay}
                            ref={item.bnbRoomId + '-' + moment(d).format('YYMMDD').toString()}
                            key={item.bnbRoomId + moment(d).format('YYMMDD')}></View>
                    )
                    return false
                })

                table.push(<View style={styles.dayRow}>{row}</View>)

                return false
                }
            })
        }

    return (

            <View style={styles.container} ref={'mainContainer'}>

                {header}

                <ScrollView
                    style={styles.scrollView}
                    onScroll={this._haha}
                    scrollEventThrottle={3}
                    showsHorizontalScrollIndicator={false}>

                    <View ref={'hahah222'} >
                        {table}
                    </View>
                    <View style={styles.activeDay}></View>
                </ScrollView>

        </View>

    )
}
};

export default Calendar;
