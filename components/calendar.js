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
    Animated,
    StatusBar,
    ListView,
    RefreshControl,
    PanResponder
} from 'react-native'

const HEADER_MAX_HEIGHT = 64
const HEADER_MIN_HEIGHT = 0
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

moment.updateLocale('cn', {
    weekdaysShort : ["日", "一", "二", "三", "四", "五", "六"]
});
moment.locale('cn');

const styles = StyleSheet.create({
    mainScroll: {
        backgroundColor: '#fff'
    },
    container: {
        backgroundColor: '#eee',
        flexDirection: 'column',
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'stretch',
    },
    scrollHeader: {
        padding: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
    },
    scrollView: {
        flexDirection: 'row',
    },
    mainTitle: {
        fontSize: 24,
        paddingLeft: 15,
        paddingBottom: 20,
    },

    calendarHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        borderBottomWidth: 0,
        borderColor: '#ccc',
    },

    roomTitleText: {
        position: 'absolute',
        fontSize: 12,
        color: '#333',
        paddingTop: 10,
        marginBottom: 10,
    },
    resevation: {
        backgroundColor: '#C9FCF5',
        width: 60,
        height: 40,
        flex: 1,
        overflow: 'hidden',
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#01927E',
        position: 'absolute',
        paddingLeft: 5,
        justifyContent: 'center',
    },
    resevationText: {
        fontSize: 10,
        color: '#000',
        fontWeight: '400',
        overflow: 'hidden',
        width: 200,
    },
    room: {
        height: 50,
        marginBottom: 60,
    },
    roomText: {
        fontSize: 12,
        color: '#333'
    },
    roomsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 205,
        paddingLeft: 5,
        backgroundColor: '#fff',
    },
    daysContainer: {
        position: 'relative',
    },

    sortContainer: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        padding: 20,
        margin: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
    },
    selectButton: {
        height: 44,
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#aaa'
    },
    selectButtonStart: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomWidth: 0,
    },
    selectButtonEnd: {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    selectButtonText: {
        fontSize: 13,
        color: '#666'
    },
    analytics: {
        height: 49,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',

    },
    analyticsColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    analyticsColumnTextBig:{
        fontSize: 20,
        color: '#000',
        fontWeight: '200',
    },
    analyticsColumnTextSmall: {
        fontSize: 10,
        color: '#666'
    }
})

let roomTitleLeft = 20


class Calendar extends Component {


    _onRefresh(){
        this.setState({refreshing: true});
    }

    scrollRoomName(e){
        if(this.refs.roomsContainer){
            this.refs.roomsContainer.scrollTo({x: e.nativeEvent.contentOffset.x <= 0 ? e.nativeEvent.contentOffset.x : 0, y: e.nativeEvent.contentOffset.y, animated: false});
        }
    }
    scrollDaysHeader(e){

            this.refs.daysHeader.scrollTo({x: e.nativeEvent.contentOffset.x, y: 0, animated: false});

    }


    returnResevations(){
        let resevations = []
        let top = 50
        let roomIndex = {}
        let i = 1
        this.props.rooms.content.map((room) => {
            roomIndex[room.bnbRoomId] = i
            i += 1
        })
        if(this.props.calendar.totalCount !== 0){

            this.props.calendar.content.map((item)=>{

                let resevationData = JSON.stringify({"relationId": item.bnbRoomId + '-' + moment(item.checkout).format('YYMMDD').toString()})

                resevations.push(
                    <View
                        key={'resevation' + item.bnbRoomId + moment(item.checkin).format('YYYYMMDD').toString()}
                        ref={'resevation' + item.bnbRoomId + moment(item.checkin).format('YYYYMMDD').toString()}
                        style={[styles.resevation, {
                            left: 60 * parseInt(moment(item.checkin).diff(moment(this.props.startDay), 'days')) + 60/2 + 5,
                            top: 110 * roomIndex[item.bnbRoomId] - 50,
                            width: 60 * parseInt(moment(item.checkout).diff(moment(item.checkin), 'days')) - 10
                        }]}
                        onTouchStart={this.yesyes}
                    >
                        <Text style={styles.resevationText}>{item.summary}</Text>
                    </View>
                )



                return false
            })
        }
        return resevations
    }

    rooms(){
        let rooms = []
        let roomsContainer = []
        let roomIndex = {}
        if(this.props.rooms.totalCount !== 0){
            let i = 1
            this.props.rooms.content.map((room) => {
                roomIndex[room.bnbRoomId] = i
                i += 1
                rooms.push(
                    <View style={styles.room} key={'roomId' + room.bnbRoomId}>
                        <Text style={styles.roomText}>
                            {room.name}
                        </Text>
                    </View>
                )
            })
        }
        roomsContainer.push(
            <View
                style={styles.roomsContainer}
                ref={'roomsContainer'}
                key={'roomsContainer'}
            >
                {rooms}
            </View>)

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


        return (
            <ScrollView
                contentContainerStyle={styles.calendarHeader}
                horizontal={true}
                ref={'daysHeader'}
                scrollEnabled={false}

            >
                {wowday}
            </ScrollView>
        )
    }


    constructor(props) {
        super(props);
        this.state = {
            mainContainerScrollable: true,
            roomTitleLeft: 10,
            refreshing: false,
            resevations: {},
            days: [],
            roomIndex: {},
            offset: {},
            scrollY:  new Animated.Value(0),
            touchStart: moment().format('x'),
        }

        this.returnResevations = this.returnResevations.bind(this)
        this.rooms = this.rooms.bind(this)
        this.daysHeader = this.daysHeader.bind(this)
        this.scrollRoomName = this.scrollRoomName.bind(this)
        this.scrollDaysHeader = this.scrollDaysHeader.bind(this)
    }

    componentWillMount(){

        // this._panResponder = PanResponder.create({
        //     onPanResponderGrant: (e, g) => {
        //         a = e.nativeEvent.timestamp
        //     },
        //     onPanResponderMove: (evt, g) => {
        //         console.log('滑动：' + g.dy);
        //         console.log('速度' + g.vy);
        //         console.log('次数' + g.numberActiveTouches);
        //         if(parseInt(g.vy) > 0.2){
        //             this.props.changeNav(true)
        //         }
        //       },
        // })

        // this.refs.mainScroll.scrollTo({x:0, y: 160, animated: true})
    }

    render() {


        let days = formatdata.daysArray(this.props.startDay, this.props.endDay)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); //动态加载数据的一种算法，虽然看不懂，但是必须得用
        let newDays = ds.cloneWithRows(days)


        return (

                <ScrollView
                    stickyHeaderIndices={[2]}
                    // onScroll={this.scrollRoomName}
                    scrollEventThrottle={10}
                    // contentOffset={{x:0, y: 121}}
                    ref={'mainScroll'}
                    // onScroll={Animated.event(
                    //     [{nativeEvent: {contentOffset: {y: this.props.scrollY}}}]
                    // )}
                    // {...this._panResponder.panHandlers}

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            title="从Airbnb同步日历..."
                        />
                    }
                >
                    {this.rooms()}
                    <View style={styles.sortContainer}>
                        <View style={[styles.selectButton, styles.selectButtonStart]}>
                            <Text style={styles.selectButtonText}>
                                {moment(this.props.startDay).format('YYYY.MM.DD')} / {moment(this.props.endDay).format('YYYY.MM.DD')}
                            </Text>
                        </View>
                        <View style={[styles.selectButton, styles.selectButtonEnd]}>
                            <Text style={styles.selectButtonText}>
                                全部房源
                            </Text>
                        </View>
                    </View>

                    <ListView
                        contentContainerStyle={styles.calendarHeader}
                        horizontal={true}
                        dataSource={newDays}
                        scrollEnabled={false}
                        scrollEventThrottle={10}
                        initialListSize={100}
                        renderRow={(days) => <Calendarheader days={days} />}
                        ref={'daysHeader'}
                    />

                    {/* {this.daysHeader(days)} */}

                    <ListView
                        style={{paddingBottom: 50}}

                        horizontal={true}
                        // bounces={false}
                        alwaysBounceHorizontal={true}
                        alwaysBounceVertical={false}

                        ref={'calDays'}
                        scrollEventThrottle={12}
                        onScroll={this.scrollDaysHeader}
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
                        // renderSectionHeader={this.daysHeader}
                        renderFooter={this.returnResevations}
                    />
                </ScrollView>


        )
    }
};

export default Calendar;
