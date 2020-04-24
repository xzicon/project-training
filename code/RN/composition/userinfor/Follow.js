import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux'

const { width, scale } = Dimensions.get('window');
const s = width / 640;
export default class Follow extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            uid: '',
            follow_data: [],
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                this.follow()
            })
    }
    follow = () => {
        fetch('http://116.62.14.0:8402/login/guanzhu/' + this.state.uid + '/' + this.state.uid)
            .then(res => res.json())
            .then((res) => {
                console.log(res.data)
                this.setState({
                    follow_data: res.data
                })
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
                    this.follow();
                } else if (res.status == 1) {
                    ToastAndroid.show('取关成功', 100)
                    this.follow();
                } else {
                    ToastAndroid.show('关注失败', 100)
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
                        <Text style={{ fontSize: 34 * s, marginLeft: width * 0.3 }}>我的关注</Text>
                    </View>
                </View>
                {this.state.follow_data.length !== 0 ?
                    <FlatList
                        style={{ backgroundColor: '#F4F4F4' }}
                        data={this.state.follow_data}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View style={{ borderWidth: 1 / scale, borderColor: '#F5F5F5' }}>
                                {
                                    item.taid == this.props.uid ?
                                        <View></View>
                                        :
                                        <View style={{ height: 150 * s, backgroundColor: '#FFF', justifyContent: 'space-between', padding: 50 * s, flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }} onPress={() => { Actions.personHome({ uid: item.taid }) }}>
                                                <Image style={{ width: 100 * s, height: 100 * s, borderRadius: 50 * s }}
                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.uimage }} />
                                                <View style={{ marginLeft: '15%' }}>
                                                    <Text style={{ fontSize: 26 * s }}>{item.uname}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {item.woid === null ?
                                                (
                                                    item.taid == this.state.look ?
                                                        <Text></Text>
                                                        :
                                                        <TouchableOpacity onPress={() => this.follow_mi(item.taid)}>
                                                            <View style={{ width: 100 * s, height: 50 * s, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                                                                <Text style={{ color: '#FFF', fontSize: 26 * s, margin: 10 * s }}>+关注</Text>
                                                            </View>
                                                        </TouchableOpacity>

                                                )
                                                :
                                                <TouchableOpacity onPress={() => this.follow_mi(item.taid)}>
                                                    <View style={{ width: 100 * s, height: 50 * s, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
                                                        <Text style={{ color: '#000', fontSize: 26 * s, margin: 10 * s }}>已关注</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                }
                            </View>
                        )}
                    /> :
                    <View><Text>还没有人关注你哦~</Text></View>}
            </View>
        )
    }
}
