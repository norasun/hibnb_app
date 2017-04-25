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


const styles = StyleSheet.create({
    loading: {
        alignItems: 'center',
        marginTop: 200,
        flex: 1,
    },
    viewContent: {
        flex: 1
    },
});
import Loading from './loading.js';
import Todolistrow from './todolistrow.js';


class Todos extends Component {

    constructor(props) {
      super(props);
      this.state ={
          refreshing: false,
          calendar_data : [],
          rooms_list: [],
          active: 'Todolist',
          viewId: 0,
          modalVisible: false,
          scrollY: new Animated.Value(0),
      }
      this.updateScrollY = this.updateScrollY.bind(this)

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




    _renderListView(){
        let todoListView = [];

        if(this.state.calendar_data != 0){

          todoListView.push(
              <ListView

                  ref={'listviewtodos'}

                  refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                          title="从Airbnb同步日历..."
                      />
                  }
                  enableEmptySections={true}
                  scrollEventThrottle={12}
                  key='listviewtodos'
                  dataSource={this.state.calendar_data}
                  renderRow={(data) => <Todolistrow {...data} />}
                  style={{paddingTop: 64}}
              />)

        }else{
            todoListView.push(<View key={'loadingtodoscontainer2'} style={styles.loading}><Loading key={'loadingtodoscontainers'} loaded={80} txt={'正在同步数据...'} /></View>)
        }
        return todoListView
    }




    componentDidMount() {

        this._loadTodolist();

    }

    render() {

        return (

            <View>
                {this._renderListView()}
            </View>

        )

    }

};

export default Todos
