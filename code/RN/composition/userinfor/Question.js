import React, { Component } from 'react';
import { View, Button, Text, StatusBar, FlatList, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;
const tips = [
    {
        question: 'Q:怎么寻找我想要的素材？',
        answer: 'A:可以通过素材页的搜索框进行关键词查找，也可以通过搜索框旁边的图标进去分类中寻找'
    },
    {
        question: 'Q:怎么修改之前进入时选择的标签？',
        answer: 'A:可以点击搜索框旁边的‘修改标签’选择你想要看的标签(最多5个)'
    },
    {
        question: 'Q:怎么修改我写过的练笔或创作？',
        answer: 'A:可以通过我的页面的‘创作’查看自己的创作，再点击查看全文即可编辑或修改你的练笔和创作'
    },
    {
        question: 'Q:练笔可以有专业的点评吗？',
        answer: 'A:正在努力开发中'
    },
    {
        question: 'Q:打印是免费的吗？',
        answer: 'A:不是的呢，没有是因为我们写不完了'
    },
    {
        question: 'Q:可以加好友聊天吗？',
        answer: 'A:不可以哦，我们不是一个聊天软件，不过您可以关注你喜欢的用户'
    },
]

export default class Question extends Component {
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
                                <View style={{ width: '100%', height: 120*s, backgroundColor: 'white', marginBottom: 10*s }}>
                                    <View style={{ width: '100%', height: '40%', paddingLeft: '3%', paddingRight: '3%' }}><Text style={{ fontSize: 26*s, color: '#333', fontWeight: 'bold' }} >{item.question}</Text></View>
                                    <View style={{ width: '100%', height: '60%', paddingLeft: '3%', paddingRight: '3%' }}><Text style={{ fontSize: 20*s, color: '#333' }} >{item.answer}</Text></View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
