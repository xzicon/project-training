import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, StatusBar, AsyncStorage, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import Title from '../common/Title';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

const own = [
    {
        title: '收藏',
        img: require('../../assets/composition/mine/sc.png')
    },
    {
        title: '创作',
        img: require('../../assets/composition/mine/cz.png')
    },
    {
        title: '我赞过的',
        img: require('../../assets/composition/mine/zan.png')
    },
    {
        title: '我评论的',
        img: require('../../assets/composition/mine/say.png')
    },
]

const others = [
    {
        title: '关于我们',
    },
    {
        title: '常见问题',
    },
    {
        title: '帮助',
    },
    {
        title: '意见反馈',
    },
    {
        title: '设置',
    },
]

export default class Userinfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            p_data:[],
            uid: '',
            flag: '1',
            imageUrl:'',
            follow_data:[],
            huozan_data:[],
            isqiandao_data:[],
            teacher_list_data:[]
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res },()=>{
                        this.all();this.point();
                        this.follow();
                        this.huozan();
                        this.isqiandao();
                        this.teacher_list()
                        
                    })

                
            })
    }
    teacher_list = () => {
        fetch('http://116.62.14.0:8402/cteacher/ulist/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ teacher_list_data: res.data });
                console.log(res.data);
            })
    }
    isqiandao=()=>{
        fetch('http://116.62.14.0:8402/points/count/'+this.state.uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({isqiandao_data:res.data});
            // console.log(res.data);
        })
    }
    huozan=()=>{
        fetch('http://116.62.14.0:8402/login/likes/'+this.state.uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({huozan_data:res.data});
            console.log(res.data);
        })
    }
    follow = () => {
        fetch('http://116.62.14.0:8402/login/guanzhu/' + this.state.uid + '/' + this.state.uid)
            .then(res => res.json())
            .then((res) => {
                console.log(res.data)
                this.setState({
                    follow_data: res.data
                })
            })
    }
    all=()=>{
        fetch('http://116.62.14.0:8402/login/me/' + this.state.uid + '/' + this.state.uid)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ data: res.data });
            console.log(res.data);
        })
    }
    point=()=>{
        fetch('http://116.62.14.0:8402/points/personal/' + this.state.uid )
        .then((res) => res.json())
        .then((res) => {
            this.setState({ p_data: res.data });
            console.log(res.data);
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.message()}>
                        <Image style={{ width: 50 * s, height: 50 * s, marginLeft: width - 100 * s }} source={require('../../assets/composition/mine/remind.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                <View style={{ width: width, height: 250 * s, marginTop: 10 / scale, marginRight: width * 0.02, position: 'relative', backgroundColor: 'white' }}>
                        <View style={{ width: width, height: 175 * s, justifyContent: 'center' }}>
                            <View style={{ width: width, flexDirection: 'row', justifyContent: 'flex-start',alignItems:'center',paddingLeft:45 *s }}>
                                <TouchableOpacity onPress={() => Actions.personHome({ uid: this.state.data.uid })} style={{ alignItems: 'center', width: 90 * s }}>
                                {this.state.flag === '1' ?
                                    <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.data.uimage }} style={{ width: 100 * s, height: 100 * s, borderRadius: 50 * s, }} />
                                    :<Image source={this.state.imageUrl} style={{ width: 100 * s, height: 100 * s, borderRadius: 50 * s, }} />}
                                </TouchableOpacity>
                                <View style={{ width: width * 0.5, justifyContent: 'center', paddingLeft: 20 * s }}>
                                <View style={{flexDirection:'row',width: 220 * s,}}>
                                    <Text numberOfLines={1} ellipsizeMode = 'tail' style={{ marginRight:5*s,fontSize: 26 * s, overflow:'hidden'}}>{this.state.data.uname}</Text>
                                    {/* {console.log(this.state.data.level+'aaaaaaaaaaaaa')} */}
                                    {
                                        this.state.data.level!=undefined?(
                                        
                                        <Title level={this.state.data.level}/>
                                        )
                                        :
                                        <View></View>
                                    }
                                    
                                </View>
                                    <TouchableOpacity onPress={() => { Actions.ziliao() }} style={{position:'absolute',top:3 *s,left:260 *s}}>
                                        {/* <View style={{ }}> */}
                                            {/* <Text style={{ color: '#000', fontSize: 20 * s, }}>编辑</Text> */}
                                            <Image style={{width:20*s,height:20*s}} source={require('../../assets/composition/mine/edit.png')}/>
                                        {/* </View> */}
                                    </TouchableOpacity>
                                    <Text numberOfLines={1} ellipsizeMode = 'tail' style={{ fontSize: 19 * s, color: 'grey',paddingTop:5 * s }}>{this.state.data.udescribe}</Text>
                                    <Text style={{paddingTop:5 * s,fontSize: 15 * s, color: 'grey',}}>总积分:{this.state.p_data.point}  总经验值:{this.state.p_data.value}</Text>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => Actions.qiandao({uid:this.state.uid,uimage:this.state.data.uimage,uname:this.state.data.uname,refresh:()=>{this.isqiandao()}})} style={{width:128 * s,height:45 *s,backgroundColor:'#ADADAD',position:'absolute',top:70 *s,right:0,borderTopLeftRadius:23 *s,borderBottomLeftRadius: 23 *s}}>
                                    <Text style={{lineHeight:45 * s,textAlign:'center',color:'#fff'}}>{this.state.isqiandao_data.isre==true?'今日已签到':'每日签到'}</Text>
                                    <Image source={require('../../assets/composition/mine/qiandao.png')} style={{position:'absolute',right: 50 * s,top: -35 *s}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: width * 0.96, height: 75 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' ,borderTopWidth:1/scale,borderTopColor:'#F0F0F0'}}>
                            
                            <TouchableOpacity onPress={() => { Actions.huozan() }} style={{ width: width * 0.32, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{this.state.huozan_data.length}</Text>
                                <Text style={{ fontSize: 24 * s, color: '#333', textAlignVertical: 'center' }}>获赞</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Actions.follow({ uid: this.state.uid })} style={{ width: width * 0.32, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{this.state.follow_data.length}</Text>
                                <Text style={{ fontSize: 24 * s, color: '#333', textAlignVertical: 'center' }}>关注</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Actions.fensi({ uid: this.state.uid }) }} style={{ width: width * 0.32, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{this.state.data.ufans}</Text>
                                <Text style={{ fontSize: 24 * s, color: '#333', textAlignVertical: 'center' }}>粉丝</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Actions.xiai({ uid: this.state.uid }) }} style={{ width: width * 0.32, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{this.state.teacher_list_data.length}</Text>
                                <Text style={{ fontSize: 24 * s, color: '#333', textAlignVertical: 'center' }}>喜爱</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ backgroundColor: "white", width: width * 0.96, height: 120 * s, marginTop: 15 / scale, marginLeft: width * 0.02, marginRight: width * 0.02, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => { Actions.collect({ uid: this.state.uid }) }} style={{ width: width * 0.22, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={own[0].img}
                                style={{ width: 35 * s, height: 35 * s, marginTop: '3%', marginBottom: '5%' }}
                            />
                            <Text style={{ fontSize: 24 * s, color: '#333', textAlignVertical: 'center' }}>收藏</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { Actions.write({ uid: this.state.uid }) }} style={{ width: width * 0.22, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={own[1].img}
                                style={{ width: 35 * s, height: 35 * s, marginTop: '3%', marginBottom: '5%' }}
                            />
                            <Text style={{ fontSize: 24 * s, color: '#333', textAlignVertical: 'center' }}>创作</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { Actions.praise({ uid: this.state.uid }) }} style={{ width: width * 0.26, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={own[2].img}
                                style={{ width: 35 * s, height: 35 * s, marginTop: '3%', marginBottom: '5%' }}
                            />
                            <Text style={{ fontSize: 24 * s, color: '#333', textAlignVertical: 'center' }}>我赞过的</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { Actions.mnew({ uid: this.state.uid }) }} style={{ width: width * 0.26, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={own[3].img}
                                style={{ width: 35 * s, height: 35 * s, marginTop: '3%', marginBottom: '5%' }}
                            />
                            <Text style={{ fontSize: 24 * s, color: '#333', textAlignVertical: 'center' }}>我评论的</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: "white", width: width * 0.96, marginTop: 15 / scale, marginLeft: '2%', marginRight: '2%' }}>
                        <TouchableOpacity style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 24 * s, color: '#333' }} >{others[0].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.question()} style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 24 * s, color: '#333' }} >{others[1].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 24 * s, color: '#333' }} >{others[2].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.feedback({ uid: this.state.uid })} style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 24 * s, color: '#333' }} >{others[3].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.myset()} style={{ width: width * 0.96, height: 50 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s }}>
                            <Text style={{ position: 'absolute', left: '3%', fontSize: 24 * s, color: '#333' }} >{others[4].title}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{ position: 'absolute', top: '3%', right: '5%' }} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        )
    }
}
