import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, ToastAndroid, TouchableOpacity, Dimensions, ScrollView, Modal, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Nessaydetail extends Component {
    constructor() {
        super();
        this.state = ({
            tid: '',
            data: [],
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
            .then((res) => {
                res === null ?
                    this.setState({ tid: '1' })
                    :
                    this.setState({ tid: res })
                this.getarticle()
            })
    }
    getarticle = () => {
        fetch('http://116.62.14.0:8402/grade/article/'+this.props.gid)
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
                        <TouchableOpacity onPress={()=>Actions.addcomment({aid: this.state.data.aid, atitle: this.state.data.atitle,acontent: this.state.data.acontent,gid: this.state.data.gid})}>
                            <Text>点评</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', backgroundColor: '#FFF', marginTop: 10*s,marginBottom:20*s }}>
                        <View style={{ width: '95%' }}>
                            <View style={{ marginTop: 15, alignItems: 'center' }}><Text style={{ fontSize: 40 * s }}>{this.state.data.atitle}</Text></View>
                            <View style={{ width: '100%', padding: 10 * s }}><Text style={{ fontSize: 20 * s, color: '#666666', textAlign: 'center' }}>{this.state.data.uname}&nbsp;|&nbsp;{this.state.data.invitetime}&nbsp;|&nbsp;{this.state.data.gclass}</Text></View>
                            <Text style={{ fontSize: 25 * s}}>{this.state.data.acontent}</Text>
                        </View>
                    </View>
                </ScrollView>
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