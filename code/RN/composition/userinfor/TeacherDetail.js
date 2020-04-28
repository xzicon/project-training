import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, FlatList, ScrollView, AsyncStorage, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import Remark from './Remark';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class TeacherDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: [],
            flag: '1'
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
            })
        if (this.state.flag === '1') {
            this.person();
        }
        if (this.state.flag === '2') {
            this.remark();
        }
    }
    person = () => {
        fetch('http://116.62.14.0:8402/teacher/personal/' + this.props.tid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data, flag: '1' });
                console.log(res.data);
            })
    }
    remark = () => {
        fetch('http://116.62.14.0:8402/teacher/personal/' + this.props.tid)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ data: res.data, flag: '2' });
            console.log(res.data);
        })
    }
    comment = () => {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes();
        let data = {
            aid: this.props.aid,
            tid: this.props.tid,
            gclass: '高一',
            atitle: this.props.atitle,
            acontent: this.props.acontent,
            invitetime: Y + M + D + h + m,
            uid: this.state.uid
        }
        fetch('http://116.62.14.0:8402/grade/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res.data)
                if (res.status == 0) {
                    Actions.home();
                    ToastAndroid.show('邀请点评成功', 100)
                } else {
                    ToastAndroid.show('邀请点评失败', 100)
                }

            })
    }
    render() {
        console.log(this.props.tid);
        return (
            <View style={{ position: 'relative' }}>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.38 }}>主页</Text>
                    </View>
                </View>
                <View style={{ height: 200 * s, backgroundColor: '#F5F5F5', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width: 100 * s, height: 100 * s, borderRadius: 50 * s }}
                            source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.data.timage }} />
                        <Text style={{ fontSize: 26 * s, marginTop: 20 * s }}>{this.state.data.tname}</Text>
                    </View>
                </View>
                {this.state.flag === '1' ?
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 70 * s, alignItems: 'center', backgroundColor: '#fff' }}>
                            <TouchableOpacity onPress={() => { this.person() }}>
                                <Text style={{ color: 'red', fontSize: 24 * s }}>简介</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.remark() }}>
                                <Text style={{ fontSize: 24 * s }}>点评</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ height: 730 * s }}>
                            <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                                <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20 * s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>基本资料</Text>
                                    <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>所在地区</Text>
                                    <Text style={{ fontSize: 24 * s, marginLeft: 200 * s }}>{this.state.tarea}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>老师学校</Text>
                                    <Text style={{ fontSize: 24 * s, marginLeft: 200 * s }}>{this.state.tschool}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>所教年级</Text>
                                    <Text style={{ fontSize: 24 * s, marginLeft: 200 * s }}>{this.state.tyear}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>教师性别</Text>
                                    <Text style={{ fontSize: 24 * s, marginLeft: 200 * s }}>{this.state.tsex}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>教龄时间</Text>
                                    <Text style={{ fontSize: 24 * s, marginLeft: 200 * s }}>{this.state.tage}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>中高考阅卷经验</Text>
                                    <Text style={{ fontSize: 24 * s, marginLeft: 126 * s }}>{this.state.texperience}</Text>
                                </View>

                            </View>
                            <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                                <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20* s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>教学成就</Text>
                                    <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>{this.state.tachievement}</Text>
                                </View>
                            </View>
                            <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                                <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20* s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>所获荣誉</Text>
                                    <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>{this.state.tsuccess}</Text>
                                </View>
                            </View>
                            <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                                <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 22 * s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>教学特色</Text>
                                    <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>{this.state.ttrait}</Text>
                                </View>
                            </View>
                            <View style={{ height: 100 * s }}></View>
                        </ScrollView>
                    </View>
                    :
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 70 * s, alignItems: 'center', backgroundColor: '#fff' }}>
                            <TouchableOpacity onPress={() => { this.person() }}>
                                <Text style={{ fontSize: 24 * s }}>简介</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.remark() }}>
                                <Text style={{ color: 'red', fontSize: 24 * s }}>点评</Text>
                            </TouchableOpacity>
                        </View>
                        <Remark  tid={this.props.tid}/>
                    </View>
                }
                <View style={{ position: 'absolute', bottom: 20 * s, paddingLeft: '50%' }}>
                    <Text onPress={() => { this.comment() }} style={{ textAlign: 'center', fontSize: 24 * s, padding: 10 * s, backgroundColor: '#FFD700', width: 140 * s, borderRadius: 20 * s }}>邀请点评</Text>
                </View>
            </View>
        )
    }
}
