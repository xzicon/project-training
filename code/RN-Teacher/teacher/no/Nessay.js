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
            uid: '',
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: 6 })
                    :
                    this.setState({ uid: res })
            })
        this.all()
    }
    all = () => {
        fetch('http://116.62.14.0:8402/article/all')
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data[0])
                this.setState({
                    data: res.data,
                })
            })
    }
    render() {
        return (
            <View>
                <FlatList
                    style={{ marginBottom: 10 * s }}
                    data={this.state.data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: '#FFF', marginLeft: 10 * s, marginRight: 10 * s, marginTop: 10 * s, height: 250 * s, overflow: 'hidden', padding: 20 * s }}>
                            <View style={{ width: '100%', height: 160 * s}}>
                                <TouchableOpacity onPress={()=>{Actions.nessaydetail({aid:item.aid})}}>
                                    <Text style={{ fontSize: 26 * s, fontWeight: 'bold', marginBottom:10*s }}>{item.atitle}</Text>
                                    <Text numberOfLines={3} style={{fontSize: 20 * s}}>{item.acontent}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontSize: 18 * s, color:'gray'}}>{item.uname}</Text>
                                <Text style={{fontSize: 18 * s, color:'gray'}}>{item.utime}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}