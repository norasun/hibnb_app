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
    },
    thinNav: {
        flex: 1,
        flexDirection: 'row',
    },
    thinNavItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255,0)'
    },
    thinNavItemActive: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    thinNavItemText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#777',
    },
    thinNavItemTextActive: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500'
    }

});

export default class Sort extends Component{

    constructor(props){
        super(props)
        this.state = {
            selectedIndex: 0,
        }
        this.toggleView = this.toggleView.bind(this)
    }
    toggleView(viewId){
        // 设置当前视图的id
        this.setState({selectedIndex: viewId})
        // 通过setTimeout来延迟更新视图，这样可以避免切换时候的卡顿
        setTimeout(function(){
            this.props.toggleView(viewId)
        }.bind(this), 1)

    }
    render() {
        return (
            <View style={styles.container} blurRadius={10}>
                <View style={styles.leftElement}></View>
                <View style={styles.segmentsContainer}>
                    {/* <SegmentedControlIOS
                        tintColor={'#333'}
                        values={['清单', '日历']}
                        selectedIndex={this.state.selectedIndex}
                        onChange={(event) => {
                        this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                        this.props.toggleView(event.nativeEvent.selectedSegmentIndex)
                        }}

                    /> */}
                    <View style={styles.thinNav}>
                        <View style={[this.state.selectedIndex === 0 ? styles.thinNavItemActive : styles.thinNavItem]}
                            onTouchStart={() => this.toggleView(0)}>
                            <Text style={[this.state.selectedIndex === 0 ? styles.thinNavItemTextActive : styles.thinNavItemText]}>
                                清单
                            </Text>
                        </View>
                        <View style={[this.state.selectedIndex === 1 ? styles.thinNavItemActive : styles.thinNavItem]}
                            onTouchStart={() => this.toggleView(1)}>
                            <Text style={[this.state.selectedIndex === 1 ? styles.thinNavItemTextActive : styles.thinNavItemText]}>
                                日历
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.create} >
                    <Image source={require('../img/create.png')} style={{width: 20, height: 20}} />
                </View>
            </View>

        )
    }
}
