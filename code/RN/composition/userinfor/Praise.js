import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Praise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: []
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                fetch('http://116.62.14.0:8402/login/marticlelikes/' + this.state.uid)
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({ data: res.data });
                        console.log(res.data);
                    })
            })
    }
    render() {
        return (
            <View>
                {this.state.data.length !== 0 ?
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => Actions.pop()}>
                                <Icon size={40 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ fontSize: 34 * s, marginLeft: width * 0.3 }}>我赞过的</Text>
                            </View>
                        </View>
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                <View style={{ width: width * 0.96, height: 360*s, backgroundColor: 'white', marginLeft: width*0.02, marginTop: 10*s, position: 'relative' }}>
                                    <TouchableOpacity onPress={() => { Actions.detailEssay({ aid: item.aid }) }}>
                                        <View style={{ width: '100%', height: '10%', marginTop: '1%', paddingLeft: '3%', }}><Text style={{ fontSize: 18*s, color: 'gray' }} >{item.utime}</Text></View>
                                        <View style={{ width: '100%', height: '15%', marginTop: '1%', paddingLeft: '3%', alignItems: 'center', }}><Text style={{ fontSize: 34*s,  color: '#333', textAlignVertical: 'center' }} >{item.atitle}</Text></View>
                                        <View style={{ width: '100%', height: '50%', marginTop: '1%', paddingLeft: '3%', paddingRight: '3%', overflow: 'hidden' }}><Text style={{ fontSize: 24*s, color: '#333' }} >{item.acontent}</Text></View>
                                        <View style={{ width: '100%', height: '5%', marginTop: '1%', paddingLeft: '3%', }}><Text style={{ fontSize: 20*s, color: '#333' }} >{item.atag}</Text></View>
                                        <View style={{ width: '100%', height: '5%', marginTop: '2%', paddingLeft: '3%' }}><Text style={{ fontSize: 20*s, color: '#5a6d95' }} >...查看全文</Text></View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                    :
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => Actions.pop()}>
                                <Icon size={40 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ fontSize: 34 * s, marginLeft: width * 0.3 }}>我赞过的</Text>
                            </View>
                        </View>
                        <View style={{ width: width, marginTop: 20, marginLeft: 20 }}>
                            <Text style={{ fontSize: 19 }}>你还没有赞过别人哦~</Text>
                        </View>
                    </View>}
            </View>
        )
    }
}
