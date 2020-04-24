import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, StatusBar, AsyncStorage, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

const own = [
    {
        title: '收藏',
        img: require('../../assets/composition/mine/sc.png')
    },
    {
        title: '创作',
        img: require('../../assets/composition/mine/cz.png')
    },
    {
        title: '我赞过的',
        img: require('../../assets/composition/mine/zan.png')
    },
    {
        title: '我评论的',
        img: require('../../assets/composition/mine/say.png')
    },
]

const others = [
    {
        title: '关于我们',
    },
    {
        title: '常见问题',
    },
    {
        title: '帮助',
    },
    {
        title: '意见反馈',
    },
    {
        title: '设置',
    },
]

export default class Userinfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            uid: '',
            flag: '1',
            imageUrl:''
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })

                fetch('http://116.62.14.0:8402/login/me/' + this.state.uid + '/' + this.state.uid)
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({ data: res.data });
                        console.log(res.data);
                    })
            })
        AsyncStorage.getItem('imgurl').then((res) => {
            if (res !== null) {
                this.setState({
                    imageUrl: JSON.parse(res),
                    flag: '2'
                });
            }
        });

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.message()}>
                        <Image style={{ width: 50 * s, height: 50 * s, marginLeft: width - 100 * s }} source={require('../../assets/composition/mine/remind.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{ width: width * 0.96, height: 250 * s, marginTop: 10 / scale, marginLeft: width * 0.02, marginRight: width * 0.02, position: 'relative', backgroundColor: 'white' }}>
                        <View style={{ width: width * 0.96, height: 175 * s, justifyContent: 'center' }}>
                            <View style={{ width: width * 0.96, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => Actions.personHome({ uid: this.state.data.uid })} style={{ alignItems: 'center', width: 90 * s }}>
                                {this.state.flag === '1' ?
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.data.uimage }} style={{ width: 90 * s, height: 90 * s, borderRadius: 45 * s, }} />
                                    :<Image source={this.state.imageUrl} style={{ width: 90 * s, height: 90 * s, borderRadius: 45 * s, }} />}
                                </TouchableOpacity>
                                <View style={{ width: width * 0.5, justifyContent: 'center', paddingLeft: 20 * s }}>
                                    <Text style={{ fontSize: 28 * s, }}>{this.state.data.uname}</Text>
                                    <Text style={{ fontSize: 20 * s, color: 'grey' }}>{this.state.data.udescribe}</Text>
                                </View>
                                {/* 编辑资料 */}
                                <TouchableOpacity onPress={() => { Actions.ziliao() }} style={{ width: 130 * s, justifyContent: 'center' }}  >
                                    <View style={{ width: 130 * s, borderWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 10 * s }}>
                                        <Text style={{ color: '#000', fontSize: 24 * s, }}>编辑资料</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: width * 0.96, height: 75 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => Actions.follow({ uid: this.state.uid })} style={{ width: width * 0.32, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 28 * s, color: '#333', textAlignVertical: 'center' }}>关注</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Actions.huozan() }} style={{ width: width * 0.32, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 28 * s, color: '#333', textAlignVertical: 'center' }}>获赞</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Actions.fensi({ uid: this.state.uid }) }} style={{ width: width * 0.32, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 28 * s, color: '#333', textAlignVertical: 'center' }}>{this.state.data.ufans}粉丝</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ backgroundColor: "white", width: width * 0.96, height: 120 * s, marginTop: 15 / scale, marginLeft: width * 0.02, marginRight: width * 0.02, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => { Actions.collect({ uid: this.state.uid }) }} style={{ width: width * 0.22, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={own[0].img}
                                style={{ width: 40 * s, height: 40 * s, marginTop: '3%', marginBottom: '5%' }}
                            />
                            <Text style={{ fontSize: 28 * s, color: '#333', textAlignVertical: 'center' }}>收藏</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { Actions.write({ uid: this.state.uid }) }} style={{ width: width * 0.22, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={own[1].img}
                                style={{ width: 40 * s, height: 40 * s, marginTop: '3%', marginBottom: '5%' }}
                            />
                            <Text style={{ fontSize: 28 * s, color: '#333', textAlignVertical: 'center' }}>创作</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { Actions.praise({ uid: this.state.uid }) }} style={{ width: width * 0.26, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={own[2].img}
                                style={{ width: 40 * s, height: 40 * s, marginTop: '3%', marginBottom: '5%' }}
                            />
                            <Text style={{ fontSize: 28 * s, color: '#333', textAlignVertical: 'center' }}>我赞过的</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { Actions.mnew({ uid: this.state.uid }) }} style={{ width: width * 0.26, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={own[3].img}
                                style={{ width: 40 * s, height: 40 * s, marginTop: '3%', marginBottom: '5%' }}
                            />
                            <Text style={{ fontSize: 28 * s, color: '#333', textAlignVertical: 'center' }}>我评论的</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: "white", width: width * 0.96, marginTop: 15 / scale, marginLeft: '2%', marginRight: '2%' }}>
                        <TouchableOpacity style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 28 * s, color: '#333' }} >{others[0].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.question()} style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 28 * s, color: '#333' }} >{others[1].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 28 * s, color: '#333' }} >{others[2].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.feedback({ uid: this.state.uid })} style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 28 * s, color: '#333' }} >{others[3].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.myset()} style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 28 * s, color: '#333' }} >{others[4].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        )
    }
}
