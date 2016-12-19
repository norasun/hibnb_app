import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, Image } from 'react-native';
const styles = StyleSheet.create({
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
    perDay: {
        width: 50,
        height: 40,
        borderRightWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#f2f2f2',
        borderColor: '#bbb',
        marginTop: 50,
    },
})

export const Calendarheader = (props) => {

    let day = props.data

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

            let resevation = []

            row.push(
                    <View
                        style={styles.perDay}
                        key={'roomday' + room.bnbRoomId + moment(day).format('YYYYMMDD').toString()}
                        ref={'roomday' + room.bnbRoomId + moment(day).format('YYYYMMDD').toString()}
                    >
                    </View>

            )



        })
        return (<View style={{paddingTop: 30}}>{row}</View>)
    }


}

export default Calendardays
