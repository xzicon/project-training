import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
// import Button from 'react-native-button';
// import { Grid, Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';


const { width } = Dimensions.get('window');
const s = width / 640;
var date = new Date();


export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: ''
        }
    }
    fetchFeedback = () => {
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes();
        let uid = this.props.uid;
        let data = {
            fcontent: this.state.textValue,
            ftime: Y + M + D + h + m,
            uid: uid
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                switch (data.status) {
                    case "0": {
                        console.log(data.data);
                        ToastAndroid.showWithGravity('反馈成功!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        Actions.pop();
                        break;
                    }
                    default: {
                        console.log(data.data);
                        break;
                    }
                }
            })

    }
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, }}>
                    <View style={{ width: width, height: 80 * s, position: 'relative', backgroundColor: 'white' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: '25%', left: '5%', }} onPress={() => Actions.pop()}>
                            <Text style={{ fontSize: 24 * s }}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', top: '20%', right: '5%', }} onPress={this.update}>
                            <View style={{ width: 60, borderColor: 'red', borderWidth: 1 * s, alignItems: 'center' }}>
                                <Text style={{ fontSize: 24 * s, color: '#000', padding: '5%' }}>反馈</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: "white", width: width * 0.96, height: 500*s, marginTop: 10*s, marginLeft: 0.02*width, marginRight: 0.02*width }}>
                        <TextInput onChangeText={(text) => { this.state.textValue = text }} style={{ width: '100%', height: '100%', fontSize: 20*s, textAlignVertical: 'top' }} editable={true} multiline={true} maxLength={200} placeholder="请输入反馈内容" placeholderTextColor='gray' />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
