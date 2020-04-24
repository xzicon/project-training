import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, ToastAndroid, TouchableOpacity, Dimensions, ScrollView, Modal, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Nessaydetail extends Component {
    constructor() {
        super();
        this.state = ({
            uid: '',
            data: [],
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '6' })
                    :
                    this.setState({ uid: res })
                this.getarticle()
            })
    }
    getarticle = () => {
        fetch('http://116.62.14.0:8402/article/testxiang/' + this.props.aid + '/' + this.state.uid)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    data: res.data
                })
                console.log(res.data)
            })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 80 * s, marginBottom: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                    <View style={{
                        width: 60, height: 50 * s,
                        borderRadius: 15 * s,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={Actions.pop}><Text>取消</Text></TouchableOpacity>
                    </View>
                    <View style={{ width: '60%' }}></View>
                    <View style={{
                        width: 60, height: 50 * s,
                        borderWidth: 1, borderColor: 'red', borderRadius: 15 * s,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={()=>Actions.addcomment()}>
                            <Text>点评</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView >
                    <View style={{ alignItems: 'center', backgroundColor: '#FFF', marginTop: 10*s,marginBottom:20*s }}>
                        <View style={{ width: '95%' }}>
                            <View style={{ marginTop: 15, alignItems: 'center' }}><Text style={{ fontSize: 40 * s }}>{this.state.data.atitle}</Text></View>
                            <View style={{ width: '100%', padding: 10 * s }}><Text style={{ fontSize: 20 * s, color: '#666666', textAlign: 'center' }}>{this.state.data.uname}&nbsp;|&nbsp;{this.state.data.utime}</Text></View>
                            <Text style={{ fontSize: 25 * s}}>{this.state.data.acontent}</Text>
                            <View style={{ width: '100%', padding: 10 * s }}>
                                <Text style={{ color: '#4682B4', fontSize: 25 * s }}>{this.state.data.atag}</Text>
                            </View>
                            {
                                this.state.data.aimage !== '' ?
                                    <Image style={{ width: '100%', height: 300 * s }} source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.data.aimage }} />
                                    : (this.state.flag === '2' ?
                                        <Image style={{ width: '100%', height: 300 * s }} source={this.state.imageUrl} />
                                        :
                                        <View></View>)
                            }
                        </View>
                    </View>
                </ScrollView>
                {/* <View style={{width:width,height:40*s,marginTop:14*s,marginLeft:0.02*width,flexDirection:'row'}}>
                    <Text style={{fontSize:25*s,backgroundColor:'red',color:'#fff',width:width*0.2,paddingLeft:18*s}}>我要点评</Text>
                    <Text style={{width:width*0.04,borderTopRightRadius:100*s,borderBottomRightRadius:100*s,backgroundColor:'red'}}></Text>
                </View> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cover: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
})