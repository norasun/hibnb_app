import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  date: {
    marginBottom: 10,
    paddingLeft: 25,
    fontSize: 18,
    flex: 1,
    flexDirection: 'row',
    color: '#444'
  },
  roomName:{
    flex: 1,
    paddingRight: 25,
  },
  room: {
    flex: 1,
    borderRadius: 0,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  roomTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingRight: 30,
  },
  checkinout: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  perCheck: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
  checkIcon: {
    flex: 1,
    alignItems: 'center',
  },
  checkInfo: {
    flex: 4,
    paddingRight: 20,
  },
  checkSummary: {
    fontSize: 16,
    paddingRight: 20,
  },
  detail: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  littleGray: {
     flex: 1,
    fontSize: 16,
    color: '#888',
    paddingTop: 10,
  },
  normalGray: {
    fontSize: 16,
    color: '#999999',
  },
  checkin: {
      borderTopWidth: 1,
      borderTopColor: '#e3e3e3',
      paddingTop: 10,
  },
  checkoutIcon: {
     marginTop: 10,
    width: 30,
    height: 30,
  },
  checkinIcon: {
      marginTop: 10,
    width: 30,
    height: 34,
  },
  noCheck: {
      marginTop: 10,
    width: 30,
    height: 34,
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
          <View key={'checkout' + key} style={styles.perCheck}>
              <View style={styles.checkIcon}>
                  <Image source={require('../img/checkout@2x.png')} style={styles.checkoutIcon} />
              </View>
              <View style={styles.checkInfo}>
                  <Text style={styles.checkSummary}>{v.checkout.summary}</Text>
                  <View style={styles.detail}>
                      <View>
                          <Text style={styles.littleGray}>{moment(v.checkout.checkin).format('MM[月]DD[日]')} 至 {moment(v.checkout.checkout).format('MM[月]DD[日]')}</Text>
                      </View>
                      <View>
                          <Text style={styles.littleGray}>{v.checkout.nights}晚</Text>
                      </View>

                  </View>
              </View>
          </View>)
      }else{
        checkout.push(
          <View key={'checkout' + key} style={styles.perCheck}>
              <View style={styles.checkIcon}>
                  <Image source={require('../img/nocheck@2x.png')} style={styles.checkoutIcon} />
              </View>
              <View style={[styles.checkInfo, styles.checkout]}>
              <Text style={styles.littleGray}>无前续入住</Text>
            </View>
          </View>)
      }

      let checkin = [];
      if(v.checkin != undefined){
        checkin.push(
          <View key={'checkin' + key} style={styles.perCheck}>
              <View style={styles.checkIcon}>
                  <Image source={require('../img/checkin@2x.png')} style={styles.checkinIcon} />
              </View>
              <View style={[styles.checkInfo, styles.checkin]}>
                  <Text style={styles.checkSummary}>{v.checkin.summary}</Text>
                  <Text style={styles.littleGray}>{moment(v.checkin.checkin).format('MM[月]DD[日]')} 至 {moment(v.checkin.checkout).format('MM[月]DD[日]')}</Text>
              <Text style={styles.littleGray}>{v.checkin.nights}晚</Text>
            </View>
          </View>)
      }else{
        checkout.push(
          <View key={'checkin' + key} style={styles.perCheck}>
              <View style={styles.checkIcon}>
                  <Image source={require('../img/nocheck@2x.png')} style={styles.checkoutIcon} />
              </View>
              <View style={[styles.checkInfo, styles.checkin]}>
                  <Text style={styles.littleGray}>无后续入住</Text>
            </View>
          </View>)
      }

    everyday.push(
      <View style={styles.room} key={key}>
          <View style={styles.roomName}>
              <Text style={{fontSize: 20, lineHeight: 24, fontWeight: '500', color: '#333', textAlign: 'left'}}>
                  {v.location}
              </Text>
          </View>
          <View style={styles.checkinout}>
              {checkout}
          {checkin}
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
