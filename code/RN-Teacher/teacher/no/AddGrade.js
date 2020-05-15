import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, Image,ToastAndroid, TouchableOpacity, AsyncStorage, Modal , StyleSheet, FlatList} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');
const s = width / 640;
const gcontent=[
    {
        type:'一等：符合题意，中心突出，内容充实，思想健康，感情真挚',
        img:require('../../assets/composition/teacher/selected1.png')
    },
    {
        type:'二等：符合题意，中心明确，内容比较充实，思想健康，感情真实',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'三等：基本符合题意，中心基本明确，内容单薄，思想基本健康，感情基本真实',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'四等：偏题，中心不明确，内容不当，思想不健康，感情虚假',
        img:require('../../assets/composition/teacher/select1.png')
    },
];
const gexpress=[
    {
        type:'一等：符合文体要求，结构严谨，语言流畅，字迹工整',
        img:require('../../assets/composition/teacher/selected1.png')
    },
    {
        type:'二等：符合文体要求，结构完整，语言通顺，字迹清楚',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'三等：基本符合文体要求，结构基本完整，语言基本通顺，字迹基本清楚',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'四等：不符合文体要求，结构混乱，语言不通顺，字迹潦草难辨',
        img:require('../../assets/composition/teacher/select1.png')
    },
];
const gfeature=[
    {
        type:'一等：深刻，丰富，有文采，有创意',
        img:require('../../assets/composition/teacher/selected1.png')
    },
    {
        type:'二等：较为深刻，较为丰富，较有文采，较有创意',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'三等：略显深刻，略显丰富，略显文采，略显创意',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'四等：个别语句有深意，个别内容较好，个别语句较精彩，个别地方有创意',
        img:require('../../assets/composition/teacher/select1.png')
    },
];
const rank=[
    {
        type:'一类文',
        img:require('../../assets/composition/teacher/selected1.png')
    },
    {
        type:'二类文',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'三类文',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'四类文',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'五类文',
        img:require('../../assets/composition/teacher/select1.png')
    },
];
const glanguage=[
    {
        type:'一等：',
        img:require('../../assets/composition/teacher/selected1.png')
    },
    {
        type:'二等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'三等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'四等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'五等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
];
const gstructure=[
    {
        type:'一等：',
        img:require('../../assets/composition/teacher/selected1.png')
    },
    {
        type:'二等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'三等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'四等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'五等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
];
const gcover=[
    {
        type:'一等：',
        img:require('../../assets/composition/teacher/selected1.png')
    },
    {
        type:'二等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'三等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'四等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
    {
        type:'五等：',
        img:require('../../assets/composition/teacher/select1.png')
    },
];
export default class AddGrade extends Component {
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
            acontent:this.props.acontent,
            select_modal:false,
            select_modal_list:[]
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
            console.log(this.state.acontent)
    }
    select=(tit)=>{
        if(tit=='gcontent'){
            this.setState({
                select_modal:true,
                select_modal_list:gcontent,
                tit:tit
            })
        }else if(tit=='gexpress'){
            this.setState({
                select_modal:true,
                select_modal_list:gexpress,
                tit:tit
            })
        }else if(tit=='gfeature'){
            this.setState({
                select_modal:true,
                select_modal_list:gfeature,
                tit:tit
            })
        }else if(tit=='rank'){
            this.setState({
                select_modal:true,
                select_modal_list:rank,
                tit:tit
            })
        }else if(tit=='glanguage'){
            this.setState({
                select_modal:true,
                select_modal_list:glanguage,
                tit:tit
            })
        }else if(tit=='gstructure'){
            this.setState({
                select_modal:true,
                select_modal_list:gstructure,
                tit:tit
            })
        }else if(tit=='gcover'){
            this.setState({
                select_modal:true,
                select_modal_list:gcover,
                tit:tit
            })
        }
        
    }
    select_one=(one,index)=>{
        if(one=='gcontent'){
            this.setState({
                gcontent:gcontent[index].type,
                select_modal:false
            },()=>{
                gcontent.forEach((v,k)=>{
                    v.img=k==index?require('../../assets/composition/teacher/selected1.png'):require('../../assets/composition/teacher/select1.png');
                })
            })
            
        }else if(one=='gexpress'){
            this.setState({
                gexpress:gexpress[index].type,
                select_modal:false
            },()=>{
                gexpress.forEach((v,k)=>{
                    v.img=k==index?require('../../assets/composition/teacher/selected1.png'):require('../../assets/composition/teacher/select1.png');
                })
            })
            
        }else if(one=='gfeature'){
            this.setState({
                gfeature:gfeature[index].type,
                select_modal:false
            },()=>{
                gfeature.forEach((v,k)=>{
                    v.img=k==index?require('../../assets/composition/teacher/selected1.png'):require('../../assets/composition/teacher/select1.png');
                })
            })
            
        }else if(one=='rank'){
            this.setState({
                rank:index+1,
                select_modal:false
            },()=>{
                rank.forEach((v,k)=>{
                    v.img=k==index?require('../../assets/composition/teacher/selected1.png'):require('../../assets/composition/teacher/select1.png');
                })
            })
            
        }else if(one=='glanguage'){
            this.setState({
                glanguage:glanguage[index].type,
                select_modal:false
            },()=>{
                glanguage.forEach((v,k)=>{
                    v.img=k==index?require('../../assets/composition/teacher/selected1.png'):require('../../assets/composition/teacher/select1.png');
                })
            })
            
        }else if(one=='gstructure'){
            this.setState({
                gstructure:gstructure[index].type,
                select_modal:false
            },()=>{
                gstructure.forEach((v,k)=>{
                    v.img=k==index?require('../../assets/composition/teacher/selected1.png'):require('../../assets/composition/teacher/select1.png');
                })
            })
            
        }else if(one=='gcover'){
            this.setState({
                gcover:gcover[index].type,
                select_modal:false
            },()=>{
                gcover.forEach((v,k)=>{
                    v.img=k==index?require('../../assets/composition/teacher/selected1.png'):require('../../assets/composition/teacher/select1.png');
                })
            })
            
        }
        
    }
    select_false=()=>{
        this.setState({
            select_modal:false
        })
    }
    comment = () => {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
        if (this.state.score === '') {
            ToastAndroid.show('请输入作文分数', 100)
        } else {
            let data = {
                aid: this.props.aid,
                atitle: this.props.atitle,
                acontent: this.state.acontent,
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
                        this.back();
                    } else {
                        ToastAndroid.show('点评失败', 100)
                    }
                })
        }
    }
    back=()=>{
        Actions.popTo('nessay');
        setTimeout(()=> {
            Actions.refresh({refresh:1})
        });
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor:'#f6f6fa'}}>
                <Modal
                    animationType='silde'
                    onRequestClose={this.select_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.select_modal}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover3}
                        onPress={this.select_false}>
                    </TouchableOpacity>
                    <View style={{ width: '80%',marginLeft:'10%',paddingTop:15*s,paddingBottom:15*s,height:340*s, backgroundColor: '#fff', flexDirection:'column',justifyContent:'space-around',alignItems:'center',position: 'absolute', top:450*s}}>
                        {
                            this.state.select_modal_list.map((item,index)=>{
                                return(
                                    <TouchableOpacity style={{}} onPress={()=>{this.select_one(this.state.tit,index)}} style={{flexDirection:'row',alignItems:'center',marginRight:20*s}}>
                                        <Image style={{width:25*s,height:25*s,marginRight:5*s}} source={item.img}/>
                                        <Text style={{width:'80%'}}>{item.type}</Text>
                                    </TouchableOpacity>)
                            })
                            
                        }
                    </View>
                </Modal>
                <View style={{ height: 80 * s, marginBottom: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                    <View style={{
                        width: 60, height: 50 * s,
                        borderRadius: 15 * s,
                        justifyContent: 'center', alignItems: 'flex-start'
                    }}>
                        <TouchableOpacity onPress={()=>{Actions.pop()}}><Text>上一步</Text></TouchableOpacity>
                    </View>
                    <View style={{ width: '60%' ,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <View  style={{width:'80%',alignItems:'center'}}><Text numberOfLines={1} ellipsizeMode="tail">{this.props.atitle}</Text></View>
                    </View>
                    <View style={{
                        width: 60, height: 50 * s,
                        borderWidth: 1, borderColor: 'red', borderRadius: 15 * s,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={()=>{this.comment()}}>
                            <Text>发布</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                <View style={{backgroundColor:'#FFF',paddingBottom:15*s,marginBottom:15*s,marginTop:10*s,marginRight:13*s,marginLeft:13*s}}>
                <View style={{marginTop: 15 * s,marginRight:28*s,marginLeft:28*s}}>
                    <Text style={{color:'red',marginBottom:10*s}}>内容</Text>
                    <View>
                        <Text onPress={()=>{this.select('gcontent')}}>
                        {
                            this.state.gcontent==''?
                            `请选择`
                            :    
                            this.state.gcontent
                        }
                            <Icon name='down'/>
                        </Text>
                    </View>
                </View>
                {
                    this.props.gclass=='高一'||this.props.gclass=='高二'||this.props.gclass=='高三'?
                    <View>
                        <View style={{marginTop: 15 * s,marginRight:28*s,marginLeft:28*s}}>
                            <Text style={{color:'red',marginBottom:10*s}}>表达</Text>
                            <View>
                                <Text onPress={()=>{this.select('gexpress')}}>
                                {
                                    this.state.gexpress==''?
                                    `请选择`
                                    :    
                                    this.state.gexpress
                                }
                                    <Icon name='down'/>
                                </Text>
                            </View>
                        </View>
                        <View style={{marginTop: 15 * s,marginRight:28*s,marginLeft:28*s}}>
                            <Text style={{color:'red',marginBottom:10*s}}>特征</Text>
                            <View>
                                <Text onPress={()=>{this.select('gfeature')}}>
                                {
                                    this.state.gfeature==''?
                                    `请选择`
                                    :    
                                    this.state.gfeature
                                }
                                    <Icon name='down'/>
                                </Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View>
                        <View style={{marginTop: 15 * s,marginRight:28*s,marginLeft:28*s}}>
                            <Text style={{color:'red',marginBottom:10*s}}>语言</Text>
                            <View>
                                <Text onPress={()=>{this.select('glanguage')}}>
                                {
                                    this.state.glanguage==''?
                                    `请选择`
                                    :    
                                    this.state.glanguage
                                }
                                    <Icon name='down'/>
                                </Text>
                            </View>
                        </View>
                        <View style={{marginTop: 15 * s,marginRight:28*s,marginLeft:28*s}}>
                            <Text style={{color:'red',marginBottom:10*s}}>结构</Text>
                            <View>
                                <Text onPress={()=>{this.select('gstructure')}}>
                                {
                                    this.state.gstructure==''?
                                    `请选择`
                                    :    
                                    this.state.gstructure
                                }
                                    <Icon name='down'/>
                                </Text>
                            </View>
                        </View>
                        <View style={{marginTop: 15 * s,marginRight:28*s,marginLeft:28*s}}>
                            <Text style={{color:'red',marginBottom:10*s}}>卷面</Text>
                            <View>
                                <Text onPress={()=>{this.select('gcover')}}>
                                {
                                    this.state.gcover==''?
                                    `请选择`
                                    :    
                                    this.state.gcover
                                }
                                    <Icon name='down'/>
                                </Text>
                            </View>
                        </View>
                    </View>
                }
                </View>
                <View style={{backgroundColor:'#FFF',paddingBottom:20*s,marginBottom:15*s,marginTop:10*s,marginRight:13*s,marginLeft:13*s}}>
                <View style={{marginTop: 15 * s,marginRight:28*s,marginLeft:28*s}}>
                    <Text style={{color:'red',marginBottom:10*s}}>作文等级</Text>
                    <View>
                        <Text onPress={()=>{this.select('rank')}}>
                        {
                            this.state.rank==''?
                            `请选择`
                            :    
                            rank[this.state.rank-1].type
                        }
                            <Icon name='down'/>
                        </Text>
                    </View>
                </View>
                <View style={{ margin:28*s,alignItems:'center',flexDirection: 'row'}}>
                    <Text style={{color:'red'}}>作文分数</Text>
                    <TextInput
                        onChangeText={(score) => {
                            this.setState({ score: score })
                        }}
                        style={{alignContent:'center',justifyContent:'center',marginLeft: 20*s,height: '80%', fontSize: 20 * s, textAlignVertical: 'center' ,width:"38%",borderWidth:0.3, borderRadius:5*s}} editable={true} multiline={true} maxLength={200} placeholder="请在此输入作文分数" placeholderTextColor='gray' />
                     
                </View>
                <View style={{marginRight:28*s,marginLeft:28*s}}>
                    <Text style={{color:'#666',fontSize:15*s}}>{(this.props.gclass=='高一'||this.props.gclass=='高二'||this.props.gclass=='高三')?'高中:高中作文评分标准分两部分组成，第一部分基础等级，第二部分发展等级。基础等级分为内容和表达两个角度。每个角度的作文等级为:20-16分为一类文，15-11分为二类文, 10-6分为三类文，5-0为四类文;总体分值为: -类文: 52-60':'初中: -类文分值为46-50分;二类文分值为40-45分;三类文分值为35-39分;四类文分值为30-34分;五类文分值为29分以下。'}</Text>
                </View>
                </View>
                <View style={{margin: 28 * s}}>
                    <View style={{marginBottom:10*s}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,justifyContent:'center',color:'red'}}>得分点</Text>
                    </View>
                    <TextInput
                        style={{height:200*s,borderWidth:1}}
                        multiline={true}
                        textAlignVertical={'top'}
                        onChangeText={(gscorepoint) => {
                            this.setState({ gscorepoint:gscorepoint })
                        }}
                        editable={true} 
                        placeholder="请输入详细内容"
                        placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{margin: 28 * s}}>
                    <View style={{marginBottom:10*s}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,justifyContent:'center',color:'red'}}>失分点</Text>
                    </View>
                    <TextInput
                        style={{height:200*s,borderWidth:1}}
                        multiline={true}
                        textAlignVertical={'top'}
                        onChangeText={(glosepoint) => {
                            this.setState({ glosepoint:glosepoint })
                        }}
                        editable={true} 
                        placeholder="请输入详细内容"
                        placeholderTextColor='#4b4a4a' />
                </View>
                <View style={{margin: 28 * s}}>
                    <View style={{marginBottom:10*s}}>
                        <Text style={{fontFamily:'courier',fontSize:20*s,justifyContent:'center',color:'red'}}>修改建议</Text>
                    </View>
                    <TextInput
                        style={{height:200*s,borderWidth:1}}
                        multiline={true}
                        textAlignVertical={'top'}
                        onChangeText={(gmodityadvice) => {
                            this.setState({ gmodityadvice:gmodityadvice })
                        }}
                        editable={true} 
                        placeholder="请输入详细内容"
                        placeholderTextColor='#4b4a4a' />
                </View>
                

                </ScrollView>
                {/* <View style={{ flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
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
                </View> */}
                {/* 分数 */}
                {/* <View style={{ alignContent:'center',justifyContent:"flex-start",flexDirection: 'row', width: width * 0.96, height: 60 * s, marginTop: 10 * s, marginLeft: 0.02 * width, marginRight: 0.02 * width }}>
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
                </View> */}
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cover2: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    cover3: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
})