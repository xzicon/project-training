import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, ToastAndroid, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Checkbox, List, WhiteSpace } from '@ant-design/react-native';
const { width } = Dimensions.get('window');
const s = width / 640;

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: '',
            data: [],
            score: '',
            rank: '',
            gcontent: '',
            glanguage: '',
            gstructure: '',
            gcover: '',
            gexpress: '',
            gfeature: '',
            gscorepoint: '',
            glosepoint: '',
            gmodityadvice: '',
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
            .then((res) => {
                res === null ?
                    this.setState({ tid: '1' })
                    :
                    this.setState({ uid: res })
            })
    }
    comment = () => {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes();
        if (this.state.score === '') {
            ToastAndroid.show('请输入作文分数', 100)
        } else {
            let data = {
                aid: this.props.aid,
                atitle: this.props.atitle,
                acontent: this.props.acontent,
                gradetime: Y + M + D + h + m,
                score: this.state.score,
                rank: this.state.rank,
                gcontent: this.state.gcontent,
                glanguage: this.state.glanguage,
                gstructure: this.state.gstructure,
                gcover: this.state.gcover,
                gexpress: this.state.gexpress,
                gfeature: this.state.gfeature,
                gscorepoint: this.state.gscorepoint,
                glosepoint: this.state.glosepoint,
                gmodityadvice: this.state.gmodityadvice,
                gid: this.props.gid,
            }
            fetch('http://116.62.14.0:8402/grade/givemark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then((res) => {
                    console.log(res.status)
                    if (res.status == 0) {
                        ToastAndroid.show('点评成功', 100)
                        Actions.remark();
                    } else {
                        ToastAndroid.show('点评失败', 100)
                    }
                })
        }
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor:'#f6f6fa'}}>
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
                        borderWidth: 1, borderColor:'red',borderRadius: 15 * s,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={this.comment}>
                            <Text>发布</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignContent:'center',justifyContent:"flex-start",flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'20%',justifyContent:'center'}}>
                        <Text style={{fontWeight:"bloder",fontFamily:'courier',fontSize:30*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>作文分数</Text>
                    </View>
                    <TextInput
                        onChangeText={(score) => {
                            this.setState({ score: score })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3, borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="请在此输入作文分数" placeholderTextColor='gray' />
                     
                </View>
                
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'20%',justifyContent:'center'}}>
                        <Text style={{fontWeight:"bloder",fontFamily:'courier',fontSize:30*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>作文等级</Text>
                    </View>
                    <TextInput
                        onChangeText={(rank) => {
                            this.setState({ rank: rank })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3, borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="请在此输入作文等级" placeholderTextColor='gray' />
                </View>
                <View style={{ alignContent:'center',justifyContent:"flex-start",flexDirection: 'row', width: width * 0.96, height: 70 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{alignContent:'center',height:'90%',width:'30%',justifyContent:'center'}}>
                        <Text style={{fontSize:40*s,height:'100%',textAlignVertical:'center',justifyContent:'center'}}>作文评分</Text>
                    </View>
                
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'10.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>内容</Text>
                    </View>
                    <TextInput
                        onChangeText={(gcontent) => {
                            this.setState({ gcontent: gcontent })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容" placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'10.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>语言</Text>
                    </View>
                    <TextInput
                        onChangeText={(glanguage) => {
                            this.setState({ glanguage: glanguage})
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容" placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'10.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>结构</Text>
                    </View>
                    <TextInput
                        onChangeText={(gstructure) => {
                            this.setState({ gstructure: gstructure })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容" placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'10.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>卷面</Text>
                    </View>
                    <TextInput
                        onChangeText={(gcover) => {
                            this.setState({ gcover: gcover})
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容" placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'10.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>表达</Text>
                    </View>
                    <TextInput
                        onChangeText={(gexpress) => {
                            this.setState({ gexpress: gexpress })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容" placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'10.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>特征</Text>
                    </View>
                    <TextInput
                        onChangeText={(gcontent) => {
                            this.setState({ gcontent: gcontent })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容" placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{ alignContent:'center',justifyContent:"flex-start",flexDirection: 'row', width: width * 0.96, height: 70 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{alignContent:'center',height:'90%',width:'30%',justifyContent:'center'}}>
                        <Text style={{fontSize:40*s,height:'100%',textAlignVertical:'center',justifyContent:'center'}}>点评详情</Text>
                    </View>
                
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'15.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>得分点</Text>
                    </View>
                    <TextInput
                        onChangeText={(gscorepoint) => {
                            this.setState({ gscorepoint:gscorepoint })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%',fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容"placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'15.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>得分点</Text>
                    </View>
                    <TextInput
                        onChangeText={(glosepoint) => {
                            this.setState({ glosepoint:glosepoint })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%',fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容" placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
                    <View style={{height:'90%',width:'15.5%',justifyContent:'center'}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,height:'100%',textAlignVertical:'center',justifyContent:'center',color:'red'}}>修改建议</Text>
                    </View>
                    <TextInput
                        onChangeText={(gmodityadvice) => {
                            this.setState({ gmodityadvice:gmodityadvice })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '90%',fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3,borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="输入内容" placeholderTextColor='#4b4a4a' />
                </View>
            </View>
        )
    }
}