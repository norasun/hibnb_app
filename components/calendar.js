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
} from 'react-native'



moment.updateLocale('cn', {
    weekdaysShort : ["日", "一", "二", "三", "四", "五", "六"]
});
moment.locale('cn');

const styles = StyleSheet.create({
    mainScroll: {
        backgroundColor: '#fff'
    },
    container: {
        marginTop: 0,
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
        flex: 1,
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
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 64,
        borderBottomWidth: StyleSheet.hairlineWidth,
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
        backgroundColor: 'rgba(251, 168, 148, .7)',
        width: 60,
        height: 40,
        flex: 1,
        overflow: 'hidden',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E66240',
        position: 'absolute',
        paddingLeft: 5,
        justifyContent: 'center',
    },
    resevationText: {
        fontSize: 10,
        color: '#000',
        overflow: 'hidden',
        width: 300,
    },
    room: {
        height: 50,
        marginBottom: 40,
    },
    roomText: {
        fontSize: 12,
        color: '#000'
    },
    roomsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 210,
        paddingLeft: 5,
        backgroundColor: '#fff',
    },
    daysContainer: {
        position: 'relative',
    },

    sortContainer: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
    },
    selectButton: {
        height: 40,
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
        if(this.refs.daysHeader){
            this.refs.daysHeader.scrollTo({x: e.nativeEvent.contentOffset.x, y: 0, animated: false});
        }
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
                            top: 90 * roomIndex[item.bnbRoomId] - 40,
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
                    <View style={styles.room}>
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
            scrollY:  new Animated.Value(0)
        }

        this.returnResevations = this.returnResevations.bind(this)
        this.rooms = this.rooms.bind(this)
        this.daysHeader = this.daysHeader.bind(this)
        this.scrollRoomName = this.scrollRoomName.bind(this)
        this.scrollDaysHeader = this.scrollDaysHeader.bind(this)
    }

    componentDidMount(){

        // this.refs.mainScroll.scrollTo({x:0, y: 160, animated: true})
    }

    render() {


        let days = formatdata.daysArray(this.props.startDay, this.props.endDay)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); //动态加载数据的一种算法，虽然看不懂，但是必须得用
        let newDays = ds.cloneWithRows(days)


        return (

            <View style={styles.container} ref={'mainContainer'}>


                <StatusBar
                    barStyle="light-content"
                    hidden={true}
                />

                <ScrollView
                    stickyHeaderIndices={[2]}
                    // onScroll={this.scrollRoomName}
                    scrollEventThrottle={10}
                    contentOffset={{x:0, y: 121}}
                    ref={'mainScroll'}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
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
                                2016.10.22 / 2016.12.23
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
                        pageSize={60}
                        renderRow={(days) => <Calendarheader days={days} />}
                        ref={'daysHeader'}
                    />

                    {/* {this.daysHeader(days)} */}

                    <ListView
                        style={{paddingBottom: 200}}

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


                {/* <View style={styles.analytics}>

                    <View style={styles.analyticsColumn}>
                    <Text style={styles.analyticsColumnTextBig}>
                    90%
                    </Text>
                    <Text style={styles.analyticsColumnTextSmall}>
                    入住率
                    </Text>
                    </View>
                    <View style={styles.analyticsColumn}>
                    <Text style={styles.analyticsColumnTextBig}>
                    320
                    </Text>
                    <Text style={styles.analyticsColumnTextSmall}>
                    间天
                    </Text>
                    </View>
                    <View style={styles.analyticsColumn}>
                    <Text style={styles.analyticsColumnTextBig}>
                    32
                    </Text>
                    <Text style={styles.analyticsColumnTextSmall}>
                    接待人组
                    </Text>
                    </View>

                </View> */}
            </View>

        )
    }
};

export default Calendar;
