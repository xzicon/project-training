import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, Dimensions, ScrollView, Image, AsyncStorage, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class Mnew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: [],
            adata: [],
            tabtitle: true
        }
    }
    componentDidMount() {
        if (this.state.tabtitle) {
            AsyncStorage.getItem('uid')
                .then((res) => {
                    res === null ?
                        this.setState({ uid: '' })
                        :
                        this.setState({ uid: res })
                    this.getmcomment();
                })
        }
    }
    getmcomment = () => {
        fetch('http://116.62.14.0:8402/login/mcomment/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }
    fetchDelete = (e, f) => {
        console.log(e);
        console.log(f);
        let data = {
            mcid: e,
            mid: f
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/comment/delmaterial', {
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
                        this.getmcomment();
                        ToastAndroid.showWithGravity('删除素材评论成功!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        break;
                    }
                    default: {
                        console.log(data.data);
                        break;
                    }
                }
            })
    }
    getacomment = () => {
        fetch('http://116.62.14.0:8402/login/acomment/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ adata: res.data });
                console.log(res.data);
            })
    }
    _fetchDelete = (e, f) => {
        console.log(e);
        console.log(f);
        let data = {
            acid: e,
            aid: f
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/comment/delarticle', {
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
                        ToastAndroid.showWithGravity('删除文章评论成功!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        // this.state.data.splice(e,1);
                        this.getacomment();
                        break;
                    }
                    default: {
                        console.log(data.data);
                        break;
                    }
                }
            })
    }
    change = () => {
        if (this.state.tabtitle) {
            this.setState({
                tabtitle: false
            })
            this.getacomment()
        } else {
            this.setState({
                tabtitle: true
            })
            this.getmcomment()
        }

    }
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon size={40 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 34 * s, marginLeft: width * 0.36 }}>评论</Text>
                    </View>
                </View>
                {
                    this.state.tabtitle ?
                        <View style={{ backgroundColor: '#f5f5f5', width: width, height: 70 * s, position: 'relative' }} >
                            <View style={{ width: '18%', height: 70 * s, position: 'absolute', left: '5%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity >
                                    <Text style={{ fontSize: 28 * s, alignItems: 'center', borderBottomWidth: 4 * s, borderBottomColor: '#ffdf41' }}>素材评论</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '18%', height: 70 * s, position: 'absolute', left: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={this.change}>
                                    <Text style={{ fontSize: 28 * s, alignItems: 'center' }}>文章评论</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={{ backgroundColor: '#f5f5f5', width: width, height: 70 * s, position: 'relative' }} >
                            <View style={{ width: '18%', height: 70 * s, position: 'absolute', left: '5%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={this.change}>
                                    <Text style={{ fontSize: 28 * s, alignItems: 'center' }}>素材评论</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '18%', height: 70 * s, position: 'absolute', left: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity >
                                    <Text style={{ fontSize: 28 * s, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: '#ffdf41' }}>文章评论</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                }

                {
                    this.state.tabtitle ?
                        <View>
                            {this.state.data.length !== 0 ?
                                <ScrollView style={{ width: width, backgroundColor: '#f5f5f5', marginBottom: 100 }}>
                                    <View style={{ backgroundColor: "#f5f5f5", width: width, marginTop: 10 }}>
                                        <FlatList
                                            data={this.state.data}
                                            numColumns={1}
                                            renderItem={({ item }) => (
                                                <View style={{ width: width * 0.96, backgroundColor: 'white', marginLeft: width * 0.02, marginBottom: width * 0.02, position: 'relative', }}>
                                                    <TouchableOpacity  >
                                                        <View style={{ width: '94%', marginTop: '3%', marginLeft: '3%' }}><Text style={{ fontSize: 26 * s, color: '#333' }} >{item.mccontent}</Text></View>
                                                        <View style={{ width: '94%', marginTop: '1%', marginLeft: '3%' }}><Text style={{ fontSize: 18 * s, color: 'gray' }} >{item.mctime}</Text></View>

                                                        <View style={{ width: '100%', marginTop: '7%', marginBottom: '2%', }}>
                                                            <TouchableOpacity onPress={() => this.fetchDelete(item.mcid, item.mid)}
                                                                style={{
                                                                    width: '18%',
                                                                    height: 40 * s,
                                                                    borderRadius: 20 * s,
                                                                    backgroundColor: 'red',
                                                                    position: 'absolute',
                                                                    right: '5%',
                                                                    bottom: 0,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Text style={{ color: 'white', fontSize: 26 * s }}>删除</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </ScrollView>
                                :
                                <View style={{ width: width, backgroundColor: '#f5f5f5', marginTop: 10, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20 * s }}>你还没有评论素材哦~</Text>
                                </View>}
                        </View>

                        :
                        <View>
                            {this.state.adata.length !== 0 ?
                                <ScrollView style={{ width: width, backgroundColor: '#f5f5f5' }}>
                                    <View style={{ backgroundColor: "#f5f5f5", width: width, marginTop: 10 * s }}>
                                        <FlatList
                                            data={this.state.adata}
                                            numColumns={1}
                                            renderItem={({ item }) => (
                                                <View style={{ width: width * 0.96, backgroundColor: 'white', marginLeft: width * 0.02, marginBottom: width * 0.02, position: 'relative', }}>
                                                    <TouchableOpacity  >
                                                        <View style={{ width: '94%', marginTop: '3%', marginLeft: '3%', }}><Text style={{ fontSize: 26 * s, color: '#333' }} >{item.accontent}</Text></View>
                                                        <View style={{ width: '94%', marginTop: '1%', marginLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: 'gray' }} >{item.utime}</Text></View>

                                                        <View style={{ width: '100%', marginTop: '7%', marginBottom: '2%', }}>
                                                            <TouchableOpacity onPress={() => this._fetchDelete(item.acid, item.aid)}
                                                                style={{
                                                                    width: '18%',
                                                                    height: 40 * s,
                                                                    borderRadius: 20 * s,
                                                                    backgroundColor: 'red',
                                                                    position: 'absolute',
                                                                    right: '5%',
                                                                    bottom: 0,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Text style={{ color: 'white', fontSize: 26 * s }}>删除</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>

                                                </View>
                                            )}

                                        />
                                    </View>
                                </ScrollView>
                                :
                                <View style={{ width: width, backgroundColor: '#f5f5f5', marginTop: 10 * s, marginLeft: 10 * s }}>
                                    <Text style={{ fontSize: 20 * s }}>你还没有评论文章哦~</Text>
                                </View>}
                        </View>

                }



            </View>

        )
    }
}
