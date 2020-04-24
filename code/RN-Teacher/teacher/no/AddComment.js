import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class Feedback extends Component {
    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ height: 80 * s, marginBottom: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                    <View style={{
                        width: 60, height: 50 * s,
                        borderRadius: 15 * s,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={Actions.pop}><Text>取消</Text></TouchableOpacity>
                    </View>
                    <View style={{ width: '60%' }}></View>
                    <View style={{
                        width: 60, height: 50 * s,
                        borderWidth: 1, borderColor: 'red', borderRadius: 15 * s,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => Actions.nessay()}>
                            <Text>发布</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: "white", width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <TextInput style={{ width: '100%', height: '100%', fontSize: 20 * s, textAlignVertical: 'center' }} editable={true} multiline={true} maxLength={200} placeholder="请在此输入作文评分" placeholderTextColor='gray' />
                </View>
                <View style={{ backgroundColor: "white", width: width * 0.96, height: 500 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <TextInput style={{ width: '100%', height: '100%', fontSize: 20 * s, textAlignVertical: 'top' }} editable={true} multiline={true} maxLength={200} placeholder="请在此输入点评详情" placeholderTextColor='gray' />
                </View>
            </View>
        )
    }
}