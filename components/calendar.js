import React, { Component } from 'react';
import moment from 'moment';
// import { calendarData, roomsData } from '../helpers/getdata' //导入认证函数
import { formatdata, showview } from '@norasun/hibnb-core'
import {Calendarheader, Calendardays} from './Calendardays'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    findNodeHandle,
    ListView,
    RefreshControl,
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
        paddingTop: 64,
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
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: 50,
        backgroundColor: '#fff',
    },

    roomTitleText: {
        position: 'absolute',
        fontSize: 12,
        color: '#333',
        paddingTop: 10,
        marginBottom: 10,
    },
    resevation: {
        backgroundColor: '#FBA994',
        width: 50,
        height: 34,
        flex: 1,
        overflow: 'hidden',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#F77979',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',

    },
    resevationText: {
        fontSize: 10,
    },
    room: {
        height: 50,
        marginBottom: 40,
    },
    roomText: {
        fontSize: 12,
        color: '#333'
    },
    roomsContainer: {
        position: 'absolute',
        top: 125,
        left: 0,
        right: 0,
        bottom: 0,
        paddingLeft: 5,
    },
    daysContainer: {
        position: 'relative',
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
})

let roomTitleLeft = 20


class Calendar extends Component {


    _onRefresh(){
        this.setState({refreshing: true});
    }

    _haha = (e) => {
        if(this.refs.roomsContainer){
            this.refs.roomsContainer.scrollTo({x: e.nativeEvent.contentOffset.x <= 0 ? e.nativeEvent.contentOffset.x : 0, y: e.nativeEvent.contentOffset.y, animated: false});
        }

    }


    returnResevations(){
        let resevations = []
        let top = 0
        if(this.props.calendar.totalCount !== 0){
            let i = 1
            this.props.calendar.content.map((item)=>{

                let resevationData = JSON.stringify({"relationId": item.bnbRoomId + '-' + moment(item.checkout).format('YYMMDD').toString()})

                resevations.push(
                    <View
                        key={'resevation' + item.bnbRoomId + moment(item.checkin).format('YYYYMMDD').toString()}
                        ref={'resevation' + item.bnbRoomId + moment(item.checkin).format('YYYYMMDD').toString()}
                        style={[styles.resevation, {
                            left: 50 * parseInt(moment(item.checkin).diff(moment(this.props.startDay), 'days')),
                            top: top,
                            width: 45 * parseInt(moment(item.checkout).diff(moment(item.checkin), 'days'))
                        }]}
                        onTouchStart={this.yesyes}
                    >
                        <Text style={styles.resevationText}>{item.summary}</Text>
                    </View>
                )

                top = 90 * i

                if(i === this.props.rooms.totalCount){
                    i = 1
                }
                i += 1
                return false
            })
        }
        return resevations
    }

    rooms(){
        let rooms = []
        let roomsContainer = []
        if(this.props.rooms.totalCount !== 0){
            this.props.rooms.content.map((room) => {
                rooms.push(
                    <View style={styles.room}>
                        <Text style={styles.roomText}>
                            {room.name}
                        </Text>
                    </View>
                )
            })
        }
        roomsContainer.push(
            <ScrollView
                style={styles.roomsContainer}
                ref={'roomsContainer'}
                scrollEventThrottle={12}
                horizontal={false}
                scrollEnabled={false}
                bounces={false}
            >
                {rooms}
            </ScrollView>)
            return roomsContainer
    }

    daysHeader(days, sectionId){
        let header = []

        let wowday = []
        days.map((day) => {
            wowday.push(
                <View style={styles.titlePer}  key={'h'+ moment(day).format('YYMMDD')}>
                    <Text style={styles.perBig}>{moment(day).format('ddd')}</Text>
                    <Text style={styles.perSmall}>{moment(day).format('MM-DD')}</Text>
                </View>
            )
        })


        return (<View style={styles.calendarHeader}>{wowday}</View>)
    }


    constructor(props) {
        super(props);
        this.state = {
            mainContainerScrollable: true,
            roomTitleLeft: 10,
            refreshing: false,
            resevations: {},
            days: [],
            offset: {},
        }

        this.returnResevations = this.returnResevations.bind(this)
        this.rooms = this.rooms.bind(this)
        this.daysHeader = this.daysHeader.bind(this)
    }



    render() {


        let days = formatdata.daysArray(this.props.startDay, this.props.endDay)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); //动态加载数据的一种算法，虽然看不懂，但是必须得用
        let newDays = ds.cloneWithRows(days)


        return (

            <View style={styles.container} ref={'mainContainer'}>



                {/* {this.daysHeader(days)} */}

                {this.rooms()}


                <ListView
                    style={{paddingBottom: 100}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            title="从Airbnb同步日历..."
                        />
                    }
                    horizontal={true}
                    alwaysBounceVertical={true}
                    ref={'calDays'}
                    scrollEventThrottle={12}
                    onScroll={this._haha}
                    dataSource={newDays}
                    renderRow={(days, sectionId, rowId) =>
                        <Calendardays
                            data={days}
                            sectionId={sectionId}
                            rowId={rowId}
                            rooms={this.props.rooms}
                            // findResevation={this.findResevation}
                        />
                    }
                    renderSectionHeader={this.daysHeader}
                    renderFooter={this.returnResevations}
                />








            </View>

        )
    }
};

export default Calendar;
