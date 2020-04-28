import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class Marticle extends Component {
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
                this.getarticle();
            })
    }
    getarticle = () => {
        console.log(this.props.aid);
        fetch('http://116.62.14.0:8402/article/xiangqing/' + this.props.aid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }
    fetchDelete = (e) => {
        console.log(e);
        let data = {
            aid: e
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/aud/delarticle', {
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
                        ToastAndroid.showWithGravity('删除成功!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        Actions.pop()
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
                {
                    this.state.data.map(data =>
                        <View>
                            <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                                    <Icon name="left" color="#333" size={40 * s} />
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.4 }}>{data.atitle}</Text>
                                </View>
                            </View>
                            <ScrollView>
                                <View style={{ width: width * 0.96, backgroundColor: 'white', marginTop: 10 * s, marginBottom: 190 * s, marginLeft: 0.02 * width, position: 'relative' }}>
                                    <View style={{ width: '100%', marginTop: '1%', paddingLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: 'gray' }} >{data.utime}</Text></View>
                                    <View style={{ width: '100%', marginTop: '1%', paddingLeft: '3%', alignItems: 'center', }}><Text style={{ fontSize: 30 * s, color: '#333', textAlignVertical: 'center' }} >{data.atitle}</Text></View>
                                    <View style={{ width: '100%', marginTop: '2%', paddingLeft: '3%', paddingRight: '3%', }}><Text style={{ fontSize: 24 * s, color: '#333' }} >{data.acontent}</Text></View>
                                    <View style={{ width: '100%', marginTop: '2%', paddingLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: '#333' }} >{data.atag}</Text></View>
                                    {data.agrade === 0 ?
                                    <View style={{ width: '100%', marginTop: '6%', marginBottom: '2%' }}>
                                        <TouchableOpacity onPress={() => Actions.edit({ aid: data.aid })} style={{ position: 'absolute', right: '45%', bottom: '5%', }}  >
                                            <View style={{ width: 80*s, borderColor: 'red', borderWidth: s, alignItems: 'center' }}>
                                                <Text style={{ color: '#000', fontSize: 18*s, padding: '10%', }}>编辑</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.fetchDelete(data.aid)} style={{ position: 'absolute', right: '25%', bottom: '5%', }}  >
                                            <View style={{ width: 80*s, borderColor: 'red', borderWidth: s, alignItems: 'center', }}>
                                                <Text style={{ color: '#000', fontSize: 18*s, padding: '10%', }}>删除</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Actions.teacher({ aid: data.aid, atitle: data.atitle, acontent: data.acontent })} style={{ position: 'absolute', right: '5%', bottom: '5%', }}  >
                                            <View style={{ width: 100*s, borderColor: 'red', borderWidth: s, alignItems: 'center', }}>
                                                <Text style={{ color: '#000', fontSize: 18*s, padding: '10%', }}>邀请点评</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ width: '100%', marginTop: '6%', marginBottom: '2%' }}>
                                        <TouchableOpacity onPress={() => Actions.edit({ aid: data.aid })} style={{ position: 'absolute', right: '45%', bottom: '5%', }}  >
                                            <View style={{ width: 80*s, borderColor: 'red', borderWidth: s, alignItems: 'center' }}>
                                                <Text style={{ color: '#000', fontSize: 18*s, padding: '10%', }}>编辑</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.fetchDelete(data.aid)} style={{ position: 'absolute', right: '25%', bottom: '5%', }}  >
                                            <View style={{ width: 80*s, borderColor: 'red', borderWidth: s, alignItems: 'center', }}>
                                                <Text style={{ color: '#000', fontSize: 18*s, padding: '10%', }}>删除</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            data.agrade === -1 ?
                                            <TouchableOpacity style={{ position: 'absolute', right: '5%', bottom: '5%', }}  >
                                            <View style={{ width: 100*s, borderColor: 'red', borderWidth: s, alignItems: 'center', }}>
                                                <Text style={{ color: '#000', fontSize: 18*s, padding: '10%', }}>等待点评</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={()=>Actions.detailEssay({aid:data.aid})} style={{ position: 'absolute', right: '5%', bottom: '5%', }}  >
                                            <View style={{ width: 100*s, borderColor: 'red', borderWidth: s, alignItems: 'center', }}>
                                                <Text style={{ color: '#000', fontSize: 18*s, padding: '10%', }}>评分详情</Text>
                                            </View>
                                        </TouchableOpacity>
                                        }
                                        
                                    </View>
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    )
                }
            </View>

        )
    }
}
