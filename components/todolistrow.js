import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderTopWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    padding: 30,
    paddingRight: 20,
    paddingLeft: 0,
  },
  date: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: '300',
    flex: 1,
    flexDirection: 'row',
    color: '#000'
  },
  roomName:{
    flex: 8,
    paddingRight: 25,
  },
  room: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  checkinout: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkIcon: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutIcon: {
    width: 14,
    height: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa',
    backgroundColor: '#aaa',
    borderRadius: 20,
  },
  checkinIcon: {
    width: 14,
    height: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#3DEAA9',
    backgroundColor: '#3DEAA9',
    borderRadius: 20,
  },
  noCheck: {
    width: 14,
    height: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    borderRadius: 20,
  }
});






const Todolistrow = (props) => {

    let yestoday = moment().add(-1, 'day').format('x')
    let today = moment().format('x');
    let tomorrow = moment().add(1, 'day').format('x');


  let todolist = [];
  let everyday = [];
  console.log('来啦！');
  let key = 10000;
  props.rooms.map((v)=>{
      let checkout = [];
      if(v.checkout != undefined){
        checkout.push(

              <View key={'checkout' + key} style={styles.checkoutIcon}></View>
          )
      }else{
        checkout.push(

              <View  key={'checkout' + key} style={styles.noCheck}></View>
          )
      }

      let checkin = [];
      if(v.checkin != undefined){
        checkin.push(
              <View  key={'checkin' + key} style={styles.checkinIcon}></View>
          )
      }else{
        checkin.push(
              <View  key={'checkin' + key} style={styles.noCheck}></View>
          )
      }

    everyday.push(
      <View style={styles.room} key={key}>
          <View style={styles.roomName}>
              <Text style={{fontSize: 14, color: '#444', textAlign: 'left'}}>
                  {v.location.substr(0, 18) + (v.location.length > 10 ? ' ...' : '')}
              </Text>
          </View>
          <View style={styles.checkinout}>
              <View style={styles.checkIcon}>
                  {checkout}
              </View>
              <View style={styles.checkIcon}>
                  <Image source={require('../img/arrow@2x.png')} />
              </View>
              <View style={styles.checkIcon}>
                  {checkin}
              </View>

          </View>
      </View>)

    key += 1;
  })

  let dayformat = moment(parseInt(props.date)).format('MM[月]DD[日]');
    if(dayformat == moment().format('MM[月]DD[日]')){
        dayformat = '今天';
    }
    if(dayformat == moment().add(1, 'day').format('MM[月]DD[日]')){
        dayformat = '明天';
    }


  return (
  <View style={styles.container} key={props.date}>
      <View>
          <Text style={styles.date}>
              {dayformat}
          </Text>
      </View>
      <View >
          {everyday}
      </View>

  </View>
)};

export default Todolistrow;
