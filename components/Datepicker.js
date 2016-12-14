import React, { Component } from 'react';
import moment from 'moment'
import {
  StyleSheet,
  Text,
  View,
  Modal,
  DatePickerIOS
} from 'react-native'
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F6F7',
        flex: 1,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    dateName: {
        padding: 20,
    },
    dateNameText: {
        fontSize: 18,
        fontWeight: '600'
    },
    dateContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    dateContent: {
        height: 140,
        overflow: 'hidden',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#01D987',
        height: 49,
        justifyContent: 'center',

    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    }
})

export default class Datepicker extends Component {
    render(){
        return(
            <Modal

                animationType={"slide"}
                transparent={false}
                visible={this.props.visible}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={styles.container}>
                    <View>
                        <View style={styles.dateName}>
                            <Text style={styles.dateNameText}>
                                开始
                            </Text>
                        </View>
                        <View style={styles.dateContainer}>

                            <DatePickerIOS
                                style={styles.dateContent}
                                mode="date"
                                date={moment().toDate()}
                            />
                        </View>

                        <View style={styles.dateName}>
                            <Text style={styles.dateNameText}>
                                结束
                            </Text>
                        </View>
                        <View style={styles.dateContainer}>

                            <DatePickerIOS
                                style={styles.dateContent}
                                mode="date"
                                date={moment().add(90, 'day').toDate()}
                            />
                        </View>
                    </View>

                    <View style={styles.button} onTouchEnd={this.props.setDate}>
                        <Text style={styles.buttonText}>
                            完成
                        </Text>
                    </View>
                </View>
            </Modal>
        )
    }
}
