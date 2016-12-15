import React, { Component } from 'react'
import moment from 'moment'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  StatusBar,
  SegmentedControlIOS,
} from 'react-native'



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 64,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f5f5f5',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#999'
    },
    leftElement: {
        flex: 1,
    },
    segmentsContainer: {
        flex: 4,
    },
    create: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

export default class Sort extends Component{

    constructor(props){
        super(props)
        this.state = {
            selectedIndex: 0,
        }
    }

    render() {
        return (
            <View style={styles.container} blurRadius={10}>
                <View style={styles.leftElement}></View>
                <View style={styles.segmentsContainer}>
                    <SegmentedControlIOS
                        tintColor={'#333'}
                        values={['清单', '日历']}
                        selectedIndex={this.state.selectedIndex}
                        onChange={(event) => {
                            this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                            this.props.toggleView(event.nativeEvent.selectedSegmentIndex)
                        }}
                    />
                </View>

                <View style={styles.create} >
                    <Image source={require('../img/create.png')} style={{width: 20, height: 20}} />
                </View>
            </View>

        )
    }
}
