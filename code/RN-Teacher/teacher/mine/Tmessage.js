import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Tmessage extends Component {
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
        this.mine();
        })
    }
    mine = () => {
        console.log(this.state.uid);
        fetch('http://116.62.14.0:8402/message/pinglun/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }
    render() {
        return (
            <View>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon size={40 * s} style={{ color: '#000', marginLeft: width * 0.04 }} name='left' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 30 * s, marginLeft: width * 0.3 }}>消息通知</Text>
                    </View>
                </View>
                
                <View>
                    {/* <TouchableOpacity style={{ width: width, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 11 * s }}>
                        <Image
                            source={require('../../assets/composition/mine/pinglun1.png')}
                            style={{ width: 40 * s, height: 40 * s, marginLeft: 20 * s, marginTop: 16 * s }}
                        />
                        <Text style={{ position: 'absolute', left: '12%', top: '20%', fontSize: 28 * s, color: '#333' }} >回复列表</Text>
                    </TouchableOpacity> */}
                    {this.state.data.length !== 0 ?
                            <FlatList
                                data={this.state.data}
                                style={{ backgroundColor: '#f5f5f5'}}
                                numColumns={1}
                                renderItem={({ item }) => (
                                    <View style={{backgroundColor: '#fff',borderBottomColor:'gray',borderBottomWidth:2*s,marginTop:'1%'}}>
                                        <View style={{ flexDirection: 'row', margin: 10 * s }}>
                                            <TouchableOpacity onPress={() => Actions.personHome({ uid: this.state.uid })}>
                                                <Image
                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.uimage }}
                                                    style={{ width: 80 * s, height: 80 * s, borderRadius: 80 * s }}
                                                />
                                            </TouchableOpacity>
                                            <View>
                                                <Text style={{ fontSize: 30 * s, margin: 10 * s }}>{item.uname}</Text>
                                                <Text style={{ fontSize: 18 * s }}>{item.actime}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.accontent}</Text>
                                            <Text onPress={() => Actions.detailEssayUser({ aid: item.aid })} style={{ fontSize: 26 * s, margin: 10 * s, backgroundColor: '#f5f1e8', padding: 20 * s }}>{item.atitle}</Text>
                                        </View>
                                    </View>
                                )} />:
                        <View><Text style={{ margin: 10 * s, fontSize: 20 * s }}>你还没有收到消息哦~</Text></View>}
                </View>
            </View >
        )
    }
}
