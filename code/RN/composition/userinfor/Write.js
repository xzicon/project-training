import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
// import Button from 'react-native-button';
// import { Grid, Icon } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { Actions } from 'react-native-router-flux';


const { width } = Dimensions.get('window');
const s = width / 640;

export default class Write extends Component {
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
                fetch('http://116.62.14.0:8402/login/article/' + this.state.uid)
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
                            <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.userinfor()}>
                                <Icon name="left" color="#333" size={40 * s} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.3 }}>我的创作</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ flex: 1, }}>
                                <View style={{ width: width, marginTop: 10 * s, marginBottom: 200 * s }}>
                                    <FlatList
                                        data={this.state.data}
                                        numColumns={1}
                                        renderItem={({ item }) => (
                                            <View style={{ width: width, height: 360 * s, backgroundColor: 'white', marginBottom: 10 * s, position: 'relative' }}>
                                                <TouchableOpacity onPress={() => { Actions.marticle({ aid: item.aid }) }}
                                                    style={{ width: width * 0.9, marginLeft: width * 0.05, height: 290 * s, borderWidth: 2 * s, borderColor: 'gray', marginTop: 10 * s }}>
                                                    <View style={{ width: '100%', height: '10%', marginTop: '1%', paddingLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: 'gray' }} >{item.utime}</Text></View>
                                                    <View style={{ width: '100%', height: '15%', marginTop: '1%', paddingLeft: '3%', alignItems: 'center', }}><Text style={{ fontSize: 34 * s, color: '#333', textAlignVertical: 'center' }} >{item.atitle}</Text></View>
                                                    <View style={{ width: '100%', height: '50%', marginTop: '1%', paddingLeft: '3%', paddingRight: '3%', overflow: 'hidden' }}><Text style={{ fontSize: 24 * s, color: '#333' }} >{item.acontent}</Text></View>
                                                    <View style={{ width: '100%', height: '5%', marginTop: '1%', paddingLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: '#333' }} >{item.atag}</Text></View>
                                                </TouchableOpacity>
                                                <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                                                {
                                                    item.aaudit==1?
                                                    <View style={{ }}>
                                                        <Text style={{ fontSize: 24 * s, backgroundColor: 'blue', color: '#fff', width: width * 0.16, textAlign: 'center', borderRadius: 14 * s }}>已发布</Text>
                                                    </View>
                                                    :
                                                    (
                                                        item.aaudit==0?
                                                        <View style={{ }}>
                                                            <Text style={{ fontSize: 24 * s, backgroundColor: 'red', color: '#fff', width: width * 0.16, textAlign: 'center', borderRadius: 14 * s }}>未审核</Text>
                                                        </View>
                                                        :
                                                        <View style={{ }}>
                                                            <Text style={{ fontSize: 24 * s, backgroundColor: '#666666', color: '#fff', width: width * 0.16, textAlign: 'center', borderRadius: 14 * s }}>审核不通过</Text>
                                                        </View>
                                                    )
                                                    
                                                }
                                                {
                                                item.agrade==0?
                                                <View style={{ }}>
                                                    <Text style={{ fontSize: 24 * s, backgroundColor: 'red', color: '#fff', width: width * 0.16, textAlign: 'center', borderRadius: 14 * s }}>未邀请</Text>
                                                </View>
                                                :(
                                                    item.agrade==-1?
                                                    <View style={{ }}>
                                                        <Text style={{ fontSize: 24 * s, backgroundColor: 'red', color: '#fff', width: width * 0.16, textAlign: 'center', borderRadius: 14 * s }}>等待点评</Text>
                                                    </View>
                                                    :
                                                    <View style={{ }}>
                                                        <Text style={{ fontSize: 24 * s, backgroundColor: 'red', color: '#fff', width: width * 0.16, textAlign: 'center', borderRadius: 14 * s }}>已点评</Text>
                                                    </View>
                                                )
                                                
                                                }
                                                </View>
                                                
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    :
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                                <Icon name="left" color="#333" size={40 * s} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.3 }}>我的创作</Text>
                            </View>
                        </View>
                        <View style={{ width: width, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>你还没有创作哦~</Text>
                        </View>
                    </View>}
            </View>
        )
    }
}
