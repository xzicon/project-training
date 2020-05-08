import React, { Component } from 'react'
import { View, Text, Dimensions, Image, FlatList, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Nessay extends Component {
    constructor() {
        super();
        this.state = ({
            data: [],
            tid: '',
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
            .then((res) => {
                res === null ?
                    this.setState({ tid: '' })
                    :
                    this.setState({ tid: res })
                this.all()
            })
    }
    all = () => {
        fetch('http://116.62.14.0:8402/grade/teacher/' + this.state.tid)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data)
                this.setState({
                    data: res.data,
                })
            })
    }
    fresh = ()=>{
        this.all();
    }
    render() {
        return (
            <View>
                {this.state.data.length !== 0 ?
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#333', fontSize: 34 * s, }}>未点评</Text>
                            <TouchableOpacity onPress={this.fresh} ><Text style={{color:'#fff'}}>刷新</Text></TouchableOpacity>
                        </View>
                        <FlatList
                            style={{ marginBottom: 10 * s }}
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                item.isgrade === 0 ?
                                    <View style={{ backgroundColor: '#FFF', marginLeft: 10 * s, marginRight: 10 * s, marginTop: 10 * s, height: 250 * s, overflow: 'hidden', padding: 20 * s }}>
                                        <View style={{ width: '100%', height: 160 * s }}>
                                            <TouchableOpacity onPress={() => { Actions.nessaydetail({ gid: item.gid }) }}>
                                                <Text style={{ fontSize: 26 * s, fontWeight: 'bold', marginBottom: 10 * s }}>{item.atitle}</Text>
                                                <Text numberOfLines={3} style={{ fontSize: 20 * s }}>{item.acontent}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18 * s, color: 'gray' }}>{item.uname}</Text>
                                            <Text style={{ fontSize: 18 * s, color: 'gray' }}>{item.invitetime}</Text>
                                        </View>
                                    </View> :
                                    <View></View>
                            )}
                        />
                    </View>
                    :
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#333', fontSize: 34 * s, }}>未点评</Text>
                            <TouchableOpacity onPress={this.fresh} ><Text style={{color:'#fff'}}>刷新</Text></TouchableOpacity>
                        </View>
                        <View style={{ width: width, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>你还没有收到点评邀请哦~</Text>
                        </View>
                    </View>}
            </View>
        )
    }
}