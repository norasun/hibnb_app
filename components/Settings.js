import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
 } from 'react-native'

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        backgroundColor: '#f2f2f2'
    },
    section: {
        marginTop: 30,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
        backgroundColor: '#fff',
        paddingLeft: 20,
        overflow: 'hidden'
    },
    per: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
        flex: 1,
        height: 46,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    center: {
        paddingLeft: 0,
        alignItems: 'center',
    },
    perText: {
        fontSize: 16,
    },
    lastPer: {
        borderBottomWidth: 0,
    },
    red: {
        color: 'red',
    },
})

class Settings extends Component {
    render(){
        return(
            <ScrollView style={styles.container}>

                <View style={styles.section}>
                    <View style={[styles.per]}>
                        <Text style={styles.perText}>
                            房源设置
                        </Text>
                    </View>
                    <View style={[styles.per, styles.lastPer]}>
                        <Text style={styles.perText}>
                            同步管理
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={[styles.per]}>
                        <Text style={styles.perText}>
                            关于我们
                        </Text>
                    </View>
                    <View style={[styles.per, styles.lastPer]}>
                        <Text style={styles.perText}>
                            修改密码
                        </Text>
                    </View>
                </View>

                <View style={[styles.section, styles.center]}>
                    <View style={[styles.per, styles.lastPer, styles.center]}>
                        <Text style={[styles.perText, styles.red]}>
                            退出
                        </Text>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

export default Settings
