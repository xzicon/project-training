import React, { Component } from 'react';
import { View, Button, Text, StatusBar, FlatList, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;
const tips = [
    {
        question: 'Q:未进行师资认证可以点评么？',
        answer: 'A:不可以，我们希望能保证点评的质量，还G希望您能理解'
    },
    {
        question: 'Q:老师给学生点评作文的形式是什么？',
        answer: 'A:老师给学生点评作文的形式是以文字的形式，点评内容可以为分数(按考试标准打分)+总结(得分点、失分点)+修改建议'
    },
    {
        question: 'Q:老师点评在哪里进行？',
        answer: 'A:老师可以在作文页点击点评开始点评，在点评页也有学生邀请点评'
    },
    {
        question: 'Q:老师点评作文有时间限制吗？',
        answer: 'A:暂时没有'
    },
    {
        question: 'Q:老师点评的收益怎么结算？',
        answer: 'A:平台采用每月一结的方式，根据老师本月的点评文章数量、点评质量评估核算。我们会以电话或微信的方式与您联系结算，如对收益有疑问，请联系我们'
    },
    
]

export default class Tquestion extends Component {
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={{ flex: 1, }}>
                    <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Icon size={40 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 34 * s, marginLeft: width * 0.3 }}>常见问题</Text>
                        </View>
                    </View>
                    <View style={{ width: width * 0.96, marginTop: 10*s, marginLeft: 0.02*width, marginRight: 0.02*width }}>
                        <FlatList
                            data={tips}
                            numColumns={1}
                            renderItem={({ item }) => (
                                <View style={{ width: '100%', height: 130*s, backgroundColor: 'white', marginBottom: 10*s }}>
                                    <View style={{ width: '100%', height: '35%', paddingLeft: '3%', paddingRight: '3%' }}><Text style={{ fontSize: 26*s, color: '#333', fontWeight: 'bold' }} >{item.question}</Text></View>
                                    <View style={{ width: '100%', height: '65%', paddingLeft: '3%', paddingRight: '3%', }}><Text style={{ fontSize: 20*s, color: '#333' }} >{item.answer}</Text></View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
