import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, Image } from 'react-native';
const styles = StyleSheet.create({

    titlePer: {
        alignItems: 'center',
        width: 60,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#555'
    },
    perBig: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold'
    },
    perSmall: {
        fontSize: 12,
        color: '#999',
        paddingTop: 4,
    },
    perDay: {
        width: 60,
        height: 40,
        borderRightWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
        borderColor: '#aaa',
        marginTop: 50,
    },
})

export const Calendarheader = (props) => {

    let day = props.days

    return (

        <View style={styles.titlePer}  key={'h'+ moment(day).format('YYMMDD')}>
            <Text style={styles.perBig}>{moment(day).format('ddd')}</Text>
            <Text style={styles.perSmall}>{moment(day).format('MM-DD')}</Text>
        </View>
    )
}

let rowOffset = {}

export class Calendardays extends React.Component{
    haha(){
        alert(1)
    }
    constructor(props){
        super(props)
        this.state = {
            rowOffset: {}
        }
    }

    render(){
        // console.log('开始！');

        let day = this.props.data

        let row = []
        this.props.rooms.content.map((room) => {


            row.push(
                    <View
                        style={styles.perDay}
                        key={'roomday' + room.bnbRoomId + moment(day).format('YYYYMMDD').toString()}
                        ref={'roomday' + room.bnbRoomId + moment(day).format('YYYYMMDD').toString()}
                    >
                    </View>

            )



        })
        return (<View>{row}</View>)
    }


}

export default Calendardays
