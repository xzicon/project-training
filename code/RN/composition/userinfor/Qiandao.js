import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, Modal, FlatList, ScrollView  } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/EvilIcons'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import Title from '../common/Title'

const { width } = Dimensions.get('window');
const s = width / 640;

export default class Qiandao extends Component {
    constructor(props){
        super(props);
        this.state = {
            day: ['lv1','lv2','lv3','lv4','lv5','lv6'],
            perMsg: [],//class,point,value
            count: [],//累签allday,连签day,今日是否签isre
            modalVisible: false,
            modalRead : false,
            level:''
        }
    }
    componentDidMount(){
        this.pwm();
        this.point_count();
    }
    pwm=()=>{
        fetch('http://116.62.14.0:8402/points/personal/' + this.props.uid)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data);
            this.setState({ perMsg: res.data ,level:res.data.class})
        })
    }
    point_count=()=>{
        fetch('http://116.62.14.0:8402/points/count/' + this.props.uid)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data);
            this.setState({ count: res.data })
        })
    }
    qiandao = (e) => {
        
        let obj = { uid: this.props.uid}
        console.log(obj);
        this.state.count.isre == false ? (
            fetch('http://116.62.14.0:8402/points/sign',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            .then(res=>res.json())
            .then(data=>{
                switch(data.status){
                    case '0':
                        console.log('连续签到成功');
                        this.setState({ modalVisible: true },()=>{this.point_count()})
                        break;
                    case '1':
                        console.log('今日已签到');
                        this.setState({ modalVisible: true })
                        break;
                    case '2':
                        console.log('重新签到or第一次签到成功');
                        this.setState({ modalVisible: true },()=>{this.point_count()})
                        break;
                    default:
                        console.log(data.status + 'error');
                        break;
                }
            }) 
        ) 
        : this.state.count.isre == true ? 
            console.log('今日已签到，不能再签了') : ''
    }
    back=()=>{
        Actions.pop(this.props.refresh());
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                
                {/* 标题栏 */}
                <View style={styles.header}>
                    <Icon name='left' style={{position:'absolute',left:'5%'}} size={35 * s} onPress={()=>{this.back()}}/>
                    <Text style={{fontSize: 30 * s}}>每日签到</Text>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({modalRead:true})} style={{position:'absolute',right:30 * s}}>
                        <Text style={{fontSize:25 * s}}>攻略</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                <View style={{ width:width, backgroundColor: '#fff' }}>
                    {/* 个人信息 */}
                    <View style={{ height: 170 * s, justifyContent: 'center' }}>
                        <View style={{ width: width, flexDirection: 'row', justifyContent: 'flex-start',alignItems:'center',paddingLeft:45 *s }}>
                            <Image source={{ uri: 'http://116.62.14.0:8402/images/' + this.props.uimage }} style={{ width: 100 * s, height: 100 * s, borderRadius: 50 * s, }} />                           
                            <View style={{ width: width * 0.5, justifyContent: 'center',height:100 * s, paddingLeft: 20 * s }}>
                                <View style={{flexDirection:'row',width: 220 * s,}}>
                                    <Text numberOfLines={1} ellipsizeMode = 'tail' style={{ marginRight:5*s,fontSize: 26 * s, overflow:'hidden'}}>{this.props.uname}</Text>
                                    {
                                        this.state.level!=''?
                                        <Title level={this.state.level}/>
                                        :
                                        <View></View>
                                    }
                                </View>
                                <Text numberOfLines={1} style={{ width: 400 * s,paddingTop:7 * s,fontSize: 21 * s,color:'#666'}}>
                                    累计签到 {this.state.count.allday} 天
                                </Text>
                                <TouchableOpacity activeOpacity={1} onPress={()=>Actions.biangeng({uid:this.props.uid})} style={{flexDirection:'row',width:420*s,marginTop:7*s,alignItems:'center'}}>
                                    <Text numberOfLines={1} style={{ fontSize: 21 * s,color:'#666'}}>
                                        已获得经验值 {this.state.perMsg.value} ; 当前积分 {this.state.perMsg.point}
                                    </Text>
                                    <Icon name='right' style={{ }} size={21*s}/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => Actions.qiandaojilu({uname:this.props.uname,uid:this.props.uid})} activeOpacity={1} style={{width:128 * s,height:45 *s,backgroundColor:'#ADADAD',position:'absolute',top:75 *s,right:0,borderTopLeftRadius:23 *s,borderBottomLeftRadius: 23 *s}}>
                                <Text style={{lineHeight:45 * s,textAlign:'center',color:'#fff'}}>签到记录</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* 签到天数 */}
                    <View style={{ width: width * 0.9, height: 340 * s,flexDirection:'column',alignItems:'center', marginLeft: width * 0.05, marginTop: 10 * s, backgroundColor:'#F2DFA9'}}>
                        <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center',width: width * 0.75, height: 150 * s, borderWidth: 1, borderColor:'#C5A852',marginTop: 40 * s}}>
                            <Text style={{ color: '#fff',fontWeight:'bold',fontSize:50 * s }}>{this.state.count.day} </Text>
                            <Text style={{ color: '#fff', fontSize: 27 * s, fontWeight: 'bold' }}> 天</Text>
                        </View>
                        <View style={{backgroundColor:'#F2DFA9',width: 130 * s, height: 35 * s,alignItems:'center',position:'absolute',top:20 * s}}>
                            <Text style={{color:'#fff', fontSize: 27 * s, fontWeight: 'bold'}}>连续签到</Text>
                        </View>
                        <TouchableOpacity onPress={(e)=>{this.qiandao(e)}} activeOpacity={1} style={{ flexDirection:'row',justifyContent:'center',width:width * 0.6,height:70 * s,marginTop:20 * s,backgroundColor:'#F0F0F0'}}>
                            <Text style={{fontSize:25 * s,color:'#C5A852',lineHeight: 70 *s }}>{this.state.count.isre == false ? '今日签到' : (this.state.count.isre == true ? '今日已签到' : '')}</Text>
                        </TouchableOpacity>
                        {/* <Text style={{color:'#7A7A7A', paddingTop:12 * s,fontSize:21 * s }}> 查看今日日签 > </Text> */}
                    </View>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={styles.modalLayer}>
                            <View style={styles.modalContainer}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{ fontSize: 30 * s,marginRight:5 * s }}>签到成功!</Text>
                                    <Image source={require('../../assets/composition/mine/success.png')} style={{width: 28 * s,height: 28 * s}}/>
                                </View>
                                <Text style={{ fontSize: 25 * s ,paddingTop: 20 * s }}>此次签到已获得</Text>
                                <Text style={{ fontSize: 25 * s ,paddingTop: 20 * s }}>经验值 + {this.state.count.day<=7?10:(this.state.count.day<=30?15:20)} , 积分 + {this.state.count.day<=7?3:(this.state.count.day<=30?4:5)}</Text>
                                <Icon1 onPress={()=>this.setState({modalVisible:false})} name='close' style={{ position:'absolute',top:7 *s,right:7 * s }} size={35 * s} color={'#666'}/>
                            </View>
                        </View>
                    </Modal>
                    {/* 攻略 */}
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.modalRead}
                    >
                        <View style={styles.modalLayer1}>
                            <View style={styles.modalContainer1}>
                                <Text style={{fontSize:28 * s,height:50*s}}>攻略</Text>
                                <View style={{height:480*s,width:'90%'}}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <Text style={{fontWeight:'bold'}}>签到奖励</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0-7天积分+3,经验值+10</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8-30天积分+4,经验值+15</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;31天以上积分+5,经验值+20</Text>
                                        <Text style={{fontWeight:'bold'}}>注册奖励</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积分+20,经验值+50</Text>
                                        <Text style={{fontWeight:'bold'}}>评论奖励</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论素材积分+1,经验值+5</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论作文积分+1,经验值+3</Text>
                                        <Text style={{fontWeight:'bold'}}>发布作文or练笔奖励</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积分+5,经验值+15</Text>
                                        <Text style={{fontWeight:'bold'}}>邀请点评奖励</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积分-50,经验值+30</Text>
                                        <Text style={{fontWeight:'bold'}}>等级评定</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<100'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'lv1'}</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<300'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'lv2'}</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<600'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'lv3'}</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<1000'}&nbsp;&nbsp;&nbsp;&nbsp;{'lv4'}</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<1500'}&nbsp;&nbsp;&nbsp;&nbsp;{'lv5'}</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'>=1500'}&nbsp;&nbsp;{'lv6'}</Text>
                                    </ScrollView>
                                </View>
                                <TouchableOpacity activeOpacity={  1} onPress={()=>this.setState({modalRead:false})} style={{width:width * 0.7,height:65 * s,marginTop:30 * s,backgroundColor:'#000'}}>
                                    <Text style={{fontSize:28 * s,color:'#fff',textAlign:'center',lineHeight:65 * s}}>我知道了</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {/* 等级头衔 */}
                    <View style={{ marginTop:30 *s, backgroundColor: '#fff' }}>
                        <View style={{flexDirection:'row',marginLeft:16 * s,height:40 * s}}>
                            <Image source={require('../../assets/composition/mine/line.png')}/>
                            <Text style={{lineHeight: 35 * s, fontSize: 25 * s, fontWeight:'bold'}}>我的等级</Text>
                        </View>
                        <View style={{ flexDirection:'row',flexWrap:'wrap',marginLeft:40 * s,marginTop:10 * s, backgroundColor: '#fff'}}>
                            <FlatList
                            data={this.state.day}
                            numColumns={2}
                            
                            renderItem={({ item }) => (
                                <View style={{width:'40%',borderWidth:1,borderColor:'#666',height:150*s,margin:20*s,flexDirection:'column',alignItems:'center',justifyContent:'space-around',padding:5}}>
                                    <Title level={item}/>
                                    <Text style={{fontSize:18*s}}>{item}等级用户可佩戴</Text>
                                    <View style={{width:90*s,height:40*s,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#666',backgroundColor:this.state.level==item?'#666':'#FFF'}}>
                                        <Text style={{fontSize:19*s}}>{this.state.level==item?<Text style={{color:'#FFF'}}>正在佩戴</Text>:(item.slice(2)<this.state.level.slice(2)?'你已拥有':'还未拥有')}</Text>
                                    </View>

                                </View>
                            )}
                            />
                        
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        height: 90 * s,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.8,
        borderBottomColor:'#e4e4e4',
        backgroundColor:"#fff"
    },
    modalLayer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        paddingTop: 350 * s,
        alignItems: 'center'
    },
    modalContainer: {
        height: 300 * s,
        width: 300 * s,
        paddingTop: 60 * s,
        backgroundColor: '#fff',
        alignItems:'center'
    },
    modalLayer1: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        paddingTop: 260 * s,
        alignItems: 'center'
    },
    modalContainer1: {
        height: 700 * s,
        width: 500 * s,
        paddingTop: 30 * s,
        backgroundColor: '#fff',
        flexDirection:'column',
        alignItems:'center'
    },
})