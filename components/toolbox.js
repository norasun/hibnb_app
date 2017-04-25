import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
    },
    per: {
        borderRadius: 4,
        backgroundColor: '#fff',
        padding: 10,
    },
    smoothTxt: {
        fontSize: 16,
        color: '#666',
    }
})

const _openLink = (url) =>{
    // Linking.openURL(url);
}

const Toolbox = (props) => {
AsyncStorage.clear()
return (
    <View style={styles.container}>
        <TouchableWithoutFeedback >
            <View style={styles.per} >
                <Text style={styles.smoothTxt}>Airbnb 客服电话</Text>
            </View>
        </TouchableWithoutFeedback>
    </View>
)


};

export default Toolbox;
