import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    bar: {
        backgroundColor: '#ccc',
        width: 200,
        height: 4,
        borderRadius: 4,
    },
    loaded: {
        width: 0,
        backgroundColor: '#02D887',
        height: 4,
        borderRadius: 4,
    },
    txt: {
        fontSize: 12,
        color: '#888',
        alignItems: 'center',
        paddingTop: 10,
    }
})

const Loading = (props) => {

return (
    <View style={styles.loading}>
            <View style={styles.bar}>
                <View style={[styles.loaded, {width: props.loaded}]}></View>
            </View>
            <View ><Text style={styles.txt}>{props.txt}</Text></View>
    </View>
)


};

export default Loading;
