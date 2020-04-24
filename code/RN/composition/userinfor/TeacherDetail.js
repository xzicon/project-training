import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, FlatList, ScrollView, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class TeacherDetail extends Component {
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
                fetch('http://116.62.14.0:8402/teacher/personal/'+this.props.tid)
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({ data: res.data });
                        console.log(res.data);
                    })
            })
    }
    render() {
        console.log(this.props.tid);
        return (
            <View>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 70 * s, alignItems: 'center', backgroundColor: '#fff' }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'red', fontSize: 24 * s }}>简介</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 24 * s }}>点评</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                        <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22 * s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>基本资料</Text>
                            <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>教龄时间</Text>
                            <Text style={{ fontSize: 24 * s, marginLeft: 200 * s }}>34年</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>中高考阅卷经验</Text>
                            <Text style={{ fontSize: 24 * s, marginLeft: 126 * s }}>有</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>学生评分</Text>
                            <Text style={{ fontSize: 24 * s, marginLeft: 200 * s }}>5.0</Text>
                        </View>
                    </View>
                    <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                        <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22 * s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>教学成就</Text>
                            <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>荣获模范教师称号</Text>
                        </View>
                    </View>
                    <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                        <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22 * s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>所获荣誉</Text>
                            <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>荣获模范教师称号</Text>
                        </View>
                    </View>
                    <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                        <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22 * s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>教学特色</Text>
                            <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>幽默</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
