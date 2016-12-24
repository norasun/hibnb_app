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
    findNodeHandle,
 } from 'react-native';
 const RCTUIManager = require('NativeModules').UIManager;

import Sort from './Sort.js'
import Calendar from './calendar.js'

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
        marginTop: 200,
        flex: 1,
    },
    viewContent: {
        marginTop: 64,
    },
});
import Loading from './loading.js';
import Todolistrow from './todolistrow.js';


class Todolist extends Component {

    constructor(props) {
      super(props);
      this.state ={
          refreshing: false,
          calendar_data : [],
          rooms_list: [],
          viewId: 0,
          modalVisible: false,
          scrollY: new Animated.Value(0),
      }
      this.toggleView = this.toggleView.bind(this)
      this.updateScrollY = this.updateScrollY.bind(this)
      this.changeNav = this.changeNav.bind(this)
    }

    updateScrollY(y){
        this.setState({scrollY: y})
    }

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
            await getdata.calendarData(userId, null, moment(startDay).format('YYYY-MM-DD'), moment(endDay).format('YYYY-MM-DD'), id_token, this.props.dispatch)
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

    toggleView(viewId) {
        this.setState({viewId: viewId})
    }

    changeNav(state){
        if(state){
            this.setState({scrollY: 1})
        }
    }

    _renderCalender = () => {
        return (
            <Calendar
                appState={this.props.appState}
                calendar={this.props.appState.AppData.calendar}
                rooms={this.props.appState.AppData.rooms}
                selectedRoom={this.props.appState.AppData.selectedRoom.roomId}
                startDay={moment(this.props.appState.AppData.date.startDay)}
                endDay={moment(this.props.appState.AppData.date.endDay)}
                scrollY={this.state.scrollY}
                changeNav={this.changeNav}
            />
        )
    }

    _renderListView = () => {
        let todoListView = [];

        if(this.state.calendar_data != 0){

          todoListView.push(
              <ListView

                  ref={'listviewtodolist'}

                  refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                          title="从Airbnb同步日历..."
                      />
                  }
                  enableEmptySections={true}

                  scrollEventThrottle={12}
                  style={styles.viewContent}
                  key='listviewtodolist'
                  dataSource={this.state.calendar_data}
                  renderRow={(data) => <Todolistrow {...data} />}

              />)

        }else{
            todoListView.push(<View key={'loadingcontainer'} style={styles.loading}><Loading key={'loadingtodolist'} loaded={80} txt={'正在同步数据...'} /></View>)
        }
        return todoListView
    }




    componentDidMount() {

        // RCTUIManager.measure(findNodeHandle(this.refs.listviewtodolist), (x, y, width, height, pageX, pageY) => {
        //     this.refs.calHeader.scrollTo({y:-100, x:0, animated: false})
        // });



        this._loadTodolist();

    }

    render() {
        // AsyncStorage.clear()
        let viewContent = []
        if(this.state.viewId === 0){
            viewContent.push(this._renderListView())
        }else{
            viewContent.push(this._renderCalender())
        }
        return (

                <View
                    style={{
                        flex: 1
                    }}>

                    {viewContent}

                    <Sort
                        appState={this.props.appState}
                        startDay={moment(this.props.appState.AppData.date.startDay)}
                        endDay={moment(this.props.appState.AppData.date.endDay)}
                        toggleView={this.toggleView}
                        scrollY={this.state.scrollY}
                    />
                </View>

        )

    }

};

export default Todolist;
