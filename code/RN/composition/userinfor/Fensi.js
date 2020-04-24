import React, { Component } from 'react';
import { View, Text, TextInput, StatusBar, AsyncStorage, FlatList, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
// import Button from 'react-native-button';
// import { Grid, Icon } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Fensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            uid: ''
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
        this.getfan()
        })
    }
    getfan = () => {
        fetch('http://116.62.14.0:8402/login/fans/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }
    follow_mi = (upid) => {
        let data = {
            uid: this.state.uid,
            upid: upid
        }
        fetch('http://116.62.14.0:8402/login/userconcern', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status == 0) {
                    ToastAndroid.show('关注成功', 100)
                    this.getfan();
                } else if (res.status == 1) {
                    ToastAndroid.show('取关成功', 100)
                    this.getfan();
                } else {
                    ToastAndroid.show('关注失败', 100)
                    this.getfan();
                }
            })
    }
    render() {
        return (
            <View>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon size={40 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 34 * s, marginLeft: width * 0.3 }}>我的粉丝</Text>
                    </View>
                </View>
                {this.state.data.length !== 0 ?
                    <FlatList
                        style={{ backgroundColor: '#F4F4F4' }}
                        data={this.state.data}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View style={{ borderWidth: 1 / scale, borderColor: '#F5F5F5' }}>
                                <View style={{ height: 150 * s, backgroundColor: '#FFF', justifyContent: 'space-between', padding: 50 * s, flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }} onPress={() => { Actions.personHome({ uid: item.uid }) }}>
                                        <Image style={{ width: 100 * s, height: 100 * s, borderRadius: 50 * s }}
                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.uimage }} />
                                        <View style={{ marginLeft: '15%' }}>
                                            <Text style={{ fontSize: 26 * s }}>{item.uname}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {item.guanzhu === null ?
                                        <TouchableOpacity onPress={() => this.follow_mi(item.uid)}>
                                            <View style={{ width: 100 * s, height: 50 * s, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                                                <Text style={{ color: '#FFF', fontSize: 26 * s, margin: 10 * s }}>+关注</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => this.follow_mi(item.uid)}>
                                            <View style={{ width: 100 * s, height: 50 * s, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
                                                <Text style={{ color: '#000', fontSize: 26 * s, margin: 10 * s }}>已关注</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        )}
                    /> :
                    <View><Text>还没有人关注你哦~</Text></View>}
            </View>
        )
    }
}
