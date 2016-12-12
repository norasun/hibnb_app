import React, { Component } from 'react';
import moment from 'moment';
import {getdata, formatdata} from '@norasun/hibnb-core'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ListView,
    Modal,
    RefreshControl,
    SegmentedControlIOS,
    TouchableWithoutFeedback,
    AsyncStorage,
    Animated,
    ScrollView,
    StatusBar,
 } from 'react-native';

import Sort from './Sort.js'

const HEADER_MAX_HEIGHT = 90
const HEADER_MIN_HEIGHT = 0
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'stretch',
    },
    loading: {
        alignItems: 'center',
        paddingTop: 200,
        flex: 1,
    },
    viewContent: {
        marginTop: 0,
        paddingTop: 220,
    },
    topSort: {
        backgroundColor: '#454545',
        paddingTop: 40,
        height: 200,
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
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    selectButtonEnd: {
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        marginBottom: 10,
    },
    selectButtonText: {
        color: '#aaa',
        lineHeight: 20,
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
        justifyContent: 'center'
    },
    topNavItemText: {
        color: '#aaa',
        fontSize: 16,
        lineHeight: 16,
        textAlign: 'center',
    },
    topNavItemTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
import Loading from './loading.js';
import Todolistrow from './todolistrow.js';


class Todolist extends Component {


    _toggleAddWindow = (state) => {
        this.setState({modalVisible: state})
    }

    _onRefresh = () => {

        this.setState({refreshing: true});
        this._loadTodolist();

    }



    _loadTodolist = async () => {

        try {

            // 从redux获取userId和id_token，以便后续调用API使用
            let userId = this.props.appState.Profile.id
            let id_token = this.props.appState.Auth0.id_token
            let rooms = this.props.appState.AppData.rooms
            let startDay = moment(this.props.appState.AppData.date.startDay)
            let endDay = moment(this.props.appState.AppData.date.endDay)
            // 读取日历列表
            await getdata.calendarData(userId, null, moment(startDay), moment(endDay), id_token, this.props.dispatch)
            // 读取房间列表
            await getdata.roomsData(userId, id_token, this.props.dispatch)
            let formatTodolist = await formatdata.formatTodolist(this.props.appState.AppData.calendar.content, this.props.appState.AppData.rooms.content)
            // 设置react状态
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); //动态加载数据的一种算法，虽然看不懂，但是必须得用
            this.setState({calendar_data: ds.cloneWithRows(formatTodolist), rooms_list: this.props.appState.AppData.rooms.content, refreshing: false})

        } catch(error) {
          console.error(error);
        }
    }

    _renderListView = () => {
        let todoListView = [];

        if(this.state.calendar_data != 0){

          todoListView.push(
              <ListView
                  refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                          title="从Airbnb同步日历..."
                      />
                  }

                  onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                  )}
                  scrollEventThrottle={12}
                  style={styles.viewContent}
                  key='listviewtodolist'
                  dataSource={this.state.calendar_data}
                  renderRow={(data) => <Todolistrow {...data}

                                       />}

              />)

        }else{
            todoListView.push(<View key={'loadingcontainer'} style={styles.loading}><Loading key={'loadingtodolist'} loaded={80} txt={'正在同步数据...'} /></View>)
        }
        return todoListView
    }

    constructor(props) {
      super(props);
      this.state ={
          refreshing: false,
          calendar_data : [],
          rooms_list: [],
          modalVisible: false,
          scrollY: new Animated.Value(0),
      }
    }


    componentDidMount() {


        this._loadTodolist();

    }

    render() {
        // AsyncStorage.clear()

        return (

                <View
                    style={{
                        flex: 1
                    }}>

                    { this._renderListView() }

                    <Sort scrollY={this.state.scrollY} startDay={moment(this.props.appState.AppData.date.startDay)} endDay={moment(this.props.appState.AppData.date.endDay)} />
                </View>

        )

    }

};

export default Todolist;
