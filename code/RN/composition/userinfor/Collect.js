import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class Collect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: [],
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                this.getcollect();
            })
    }
    getcollect = () => {
        fetch('http://116.62.14.0:8402/login/materialcollection/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }
    fetchDelete = (e) => {
        console.log(e);
        let data = {
            uid: this.state.uid,
            mid: e
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/likes/delmaterial', {
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
                        ToastAndroid.showWithGravity('取消收藏成功!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        // this.state.data.splice(e,1);
                        //console.log(this.state.data);
                        this.getcollect();
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
            <View>
                {this.state.data.length !== 0 ?
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                                <Icon name="left" color="#333" size={40 * s} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.3 }}>我的收藏</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ flex: 1, }}>
                                <View style={{ width: width, marginTop: 10 * s }}>
                                    <FlatList
                                        data={this.state.data}
                                        numColumns={1}
                                        renderItem={({ item }) => (
                                            <View style={{ width: width * 0.96, height: 200 * s, backgroundColor: 'white', marginLeft: 0.02 * width, marginBottom: 0.02 * width, position: 'relative' }}>
                                                <TouchableOpacity  >
                                                    <View style={{ width: width * 0.96, height: '20%', marginTop: '1%', marginLeft: 0.02 * width }}>
                                                        <Text style={{ fontSize: 18 * s, color: '#333' }} >{item.mtime}</Text>
                                                    </View>
                                                    <View style={{ width: width * 0.94, height: '40%', marginTop: '3%', marginLeft: width * 0.02, marginRight: 0.02 * width, marginBottom: '5%' }}>
                                                        <Text onPress={()=>{Actions.popular({mid:item.mid})}} style={{ fontSize: 26 * s, fontWeight: 'bold', color: '#333' }} >{item.mtitle}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => this.fetchDelete(item.mid)}
                                                        style={{
                                                            width: '18%',
                                                            height: '30%',
                                                            borderRadius: 18 * s,
                                                            backgroundColor: 'red',
                                                            position: 'absolute',
                                                            right: '5%',
                                                            bottom: '1%',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Text style={{ color: 'white', fontSize: 24 * s }}>删除</Text>
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 180 * s }}></View>
                        </ScrollView>
                    </View>
                    :
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                                <Icon name="left" color="#333" size={40 * s} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.3 }}>我的收藏</Text>
                            </View>
                        </View>
                        <View style={{ width: width, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>你还没有收藏哦~</Text>
                        </View>
                    </View>}
            </View>
        )
    }
}
