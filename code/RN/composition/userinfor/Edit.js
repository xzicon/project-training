import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Edit extends Component {
    constructor(props) {
        super(props),
            this.state = {
                data: [],
                uid: ''
            }
    }
    componentDidMount() {
        console.log(this.props.aid)
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                this.getarticle()
            })
    }
    getarticle = () => {
        fetch('http://116.62.14.0:8402/article/xiang/' + this.props.aid + '/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    data: res.data[0],
                    atitle: res.data[0].atitle,
                    atag: res.data[0].atag,
                    acontent: res.data[0].acontent
                });
            })
    }
    update = () => {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());

        let data = {
            aid: this.state.data.aid,
            uid: this.state.uid,
            atitle: this.state.atitle,
            acontent: this.state.acontent,
            atag: this.state.atag,
            utime: Y + M + D + h + m,
            aimage: ''
        }
        fetch('http://116.62.14.0:8402/aud/updatearticle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status == 0) {
                    ToastAndroid.show('修改成功', 100)
                    Actions.marticle({aid: this.props.aid})
                } else {
                    ToastAndroid.show('修改失败', 100)
                }

            })

    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={{ flex: 1, }}>
                    <View style={{ width: width, height: 80 * s, position: 'relative', backgroundColor: 'white' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: '25%', left: '5%', }} onPress={() => Actions.pop()}>
                            <Text style={{ fontSize: 24 * s }}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', top: '20%', right: '5%', }} onPress={this.update}>
                            <View style={{ width: 60, borderColor: 'red', borderWidth: 1 * s, alignItems: 'center' }}>
                                <Text style={{ fontSize: 24 * s, color: '#000', padding: '5%' }}>修改</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: "white", width: width * 0.96, marginTop: 10*s, marginLeft: width*0.02, marginRight: width*0.02, padding: '3%' }}>
                        <TextInput
                            value={this.state.atitle}
                            onChangeText={(text) => { this.setState({ atitle: text }) }}
                            style={{ width: '100%', fontSize: 24*s, textAlignVertical: 'top', borderWidth: s, borderColor: '#000' }}
                            editable={true}
                            maxLength={20}
                            numberOfLines={1}
                        />
                        <TextInput
                            value={this.state.atag}
                            onChangeText={(text) => { this.setState({ atag: text }) }}
                            style={{ width: '100%', fontSize: 20*s, textAlignVertical: 'top', borderWidth: s, borderColor: '#000', marginTop: '1%' }}
                            editable={true} multiline={true} maxLength={20} numberOfLines={1} />
                        <TextInput
                            value={this.state.acontent}
                            onChangeText={(text) => { this.setState({ acontent: text }) }}
                            style={{ width: '100%', fontSize: 20*s, textAlignVertical: 'top', borderWidth: s, borderColor: '#000', marginTop: '1%' }}
                            editable={true} multiline={true} maxLength={500} numberOfLines={10} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
