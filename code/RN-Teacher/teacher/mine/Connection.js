import React, { Component } from 'react';
import { View, Button, Text, StatusBar, FlatList, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class Connection extends Component {
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={{ flex: 1, }}>
                    <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Icon size={40 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 34 * s, marginLeft: width * 0.3 }}>联系我们</Text>
                        </View>
                    </View>
                    <View style={{ width: width * 0.96,height:80*s, marginTop: 10*s, marginLeft: 0.02*width, marginRight: 0.02*width,backgroundColor:'#fff'}}>
                        <View style={{ width: '100%', height: '40%',paddingTop:'1%', paddingLeft: '3%', paddingRight: '3%' }}><Text style={{ fontSize: 24*s, color: '#333', fontWeight: 'bold' }} >客服电话</Text></View>
                        <View style={{ width: '100%', height: '55%',paddingTop:'1%', paddingLeft: '3%', paddingRight: '3%', }}><Text style={{ fontSize: 24*s, color: '#333' }} >15231149826</Text></View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
