import React, { Component } from 'react'
import { Text, View, AsyncStorage ,FlatList,
    TouchableOpacity,ToastAndroid,ScrollView, Image,
    Dimensions,StyleSheet, Modal,TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    Animated,
    Easing
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import RichTextView from './RichTextView';
import {myFetch} from '../utils/index'
const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class DetailEssay extends Component {
    constructor(){
        super();
        this.state=({
            uid:'',
            data:[],
            comments:[],
            com:false,//评论
            // comzomm:false,//评论放大未实现
            accontent:'',
            isLoad:false,//加载
            // textInput:'',//自动获取键盘
            flag: '1',
            imageUrl1:'',
            me_data:[],
            reply:false,//回复评论弹框
            // fadeInHeight:new Animated.Value(0)
            reply_item:'',
            reply_acid:null,
            teacher: '2',
            _grade:undefined,
            teachercomment:{
                timage:''
            }
        })
    }
    componentDidMount(){
        // if(this.state.com){
        //     setTimeout(()=>{
        //         this.textInput.focus()
        //     },20)
        // }
        
        AsyncStorage.getItem('uid')
        .then((res)=>{
            res===null?
            this.setState({uid:'6'})
            :
            this.setState({uid:res})
            this.getarticle();
            
            // if(this.state.teacher === '2'){
            //     this.teacherComment(this.state.data.agrade)
            // }
        })
        // AsyncStorage.getItem('imgurl1').then((res) => {
        //     if (res !== null) {
        //         this.setState({
        //             imageUrl1: JSON.parse(res),
        //             flag: '2'
        //         });
        //     }
        // });
    }

    me=(uuid)=>{
        fetch('http://116.62.14.0:8402/login/me/'+uuid+'/'+this.state.uid)
        .then(res=>res.json())
        .then((res)=>{
            this.setState({
                me_data:res.data
            })
            console.log(this.state.me_data)
        })
    }
    follow_add=(upid)=>{
        let data = {
            uid:this.state.uid,
            upid:upid
        }
        fetch('http://116.62.14.0:8402/login/userconcern', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json())
          .then((res)=>{
              console.log(res)
              if(res.status==0){
                this.me(this.state.data.uid);
              }else if(res.status==1){
                this.me(this.state.data.uid);
              }else{
                ToastAndroid.show('关注失败',100)
              }
          })
    }
        // 教师评分
        _teacher_grade = (agrade) => {
            fetch('http://116.62.14.0:8402/grade/article/' + agrade)
                .then(res => res.json())
                .then((res) => {
                    console.log(res.data);
                    console.log('测试')
                    this.setState({
                        _grade:res.data.score
                    })
                })
        }
        
        _teacherComment = (agrade) => {
            fetch('http://116.62.14.0:8402/grade/article/' + agrade)
                .then(res => res.json())
                .then((res) => {
                    this.setState({
                        teachercomment: res.data,
                        teacher: '2',
                        
                    })
                    console.log(res.data)
                })
        }
    // 作文详情
    getarticle=()=>{
        fetch('http://116.62.14.0:8402/article/testxiang/'+this.props.aid+'/'+this.state.uid)
        .then(res=>res.json())
        // myFetch.get1('/article/testxiang/'+this.props.aid+'/'+this.state.uid)
        .then((res)=>{
            if(!this.state.isLoad){
                setTimeout(()=>{
                    this.setState({
                        isLoad:true
                    })
                },200);
            }
            this.setState({
                data:res.data,
                comments:res.data.comments
            })
            this.me(this.state.data.uid);
            if(this.state.data.agrade==0){
                console.log('无评分')
            }else if(this.state.data.agrade==-1){
                console.log('老师还未点评')
            }else{
                this._teacher_grade(this.state.data.agrade);
                this._teacherComment(this.state.data.agrade);
            }
            
            console.log(res.data)
        })
    }
    // 点赞与取消点赞
    like=()=>{
        let data = {
            aid:this.props.aid,
            uid:this.state.uid
        }
        fetch('http://116.62.14.0:8402/likes/article', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json())
          .then((res)=>{
              console.log(res.status)
              if(res.status==0){
                ToastAndroid.show('点赞成功',100);
                this.getarticle();
                return;
              }else{
                // ToastAndroid.show('取消点赞',100);
                this.getarticle();
                return;
              }
              
          })
    }
    // 评论
    _comment=(acid)=>{
        if(acid==null){
            this.setState({
                com:true,
                reply:false,
                reply_acid:null
            })
        }else{
            this.setState({
                com:true,
                reply:false,
                reply_acid:acid

            })
        }
        
    }
    _comment_false=()=>{
        this.setState({
            com:false,
            reply:false
            // reply_acid:null
        })
    }
    addComment=()=>{
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate()<10 ? '0'+(date.getDate()) : date.getDate())+' ';
        var h = (date.getHours()<10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes()<10 ? '0'+(date.getMinutes()) : date.getMinutes());
        if(this.state.reply_acid==null){
            let data={
                accontent:this.state.accontent,
                actime:Y+M+D+h+m,
                uid:this.state.uid,
                aid:this.props.aid
            }
            fetch('http://116.62.14.0:8402/comment/addarticle',{
                method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
            }).then(res=>res.json())
            .then((res)=>{
                if(res.status==0){
                    ToastAndroid.show('评论成功',100);
                    this._comment_false();
                    this.getarticle();
                }else{
                    ToastAndroid.show('评论失败',100)
                }
                
            })
        }else{
            let data={
                arcontent:this.state.arcontent,
                artime:Y+M+D+h+m,
                uid:this.state.uid,
                acid:this.state.reply_acid,
                arrid:null
            }
            fetch('http://116.62.14.0:8402/reply/reply',{
                method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
            }).then(res=>res.json())
            .then((res)=>{
                if(res.status==0){
                    ToastAndroid.show('评论成功',100);
                    this._comment_false();
                    this.getarticle();
                }else{
                    ToastAndroid.show('评论失败',100)
                }
                
            })
        }
    }
    _renderFooter = () => (
        <View style={{flexDirection:'row',justifyContent:'center',padding:20/scale,backgroundColor:'#F5F5F5'}}>
            <Text>
                到底了哦~
            </Text>
        </View>
    )
    _renderEmptyComponent = () => (
        <View>
            <Text>
               
            </Text>
        </View>
    )
    // 回复评论弹框
    reply_modal=(item)=>{
        this.setState({
            reply:true,
            reply_item:item
        })
        // this._onPress()
    }
    // _onPress() {
    //     Animated.timing(this.state.fadeInHeight, {
    //         toValue: 200*s,
    //         duration: 100,
    //         easing: Easing.linear,// 线性的渐变函数
    //     }).start();
    // }
    reply_modal_false=()=>{
        this.setState({
            reply:false
        })
    }
    render() {
        console.log(this.state.imageUrl);
        if(this.state.isLoad){
        return (
            <View style={{flex:1}}>
                {/* 回复评论 */}
                <Modal
                style={styles.container}
                    animationType='silde'
                    onRequestClose={this.reply_modal_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.reply}
                >
                    <TouchableOpacity style={styles.cover} 
                    onPress={this.reply_modal_false}>
                    </TouchableOpacity>
                    
                    <View style={{position:'absolute',width:'100%',height:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                        <View style={{backgroundColor:'#FFF',height:400*s,width:'78%',borderRadius:30*s}}>
                            <View style={{width:'100%',height:'34%',borderBottomColor:'#F0F0F0',borderBottomWidth:1,flexDirection:'row',alignItems:'center',paddingLeft:20*s,paddingRight:20*s}}>
                                <Text>
                                {this.state.reply_item.uname}:
                                {this.state.reply_item.accontent}
                                </Text>
                            </View>
                            <TouchableOpacity
                            style={{width:'100%',height:'22%',borderBottomColor:'#F0F0F0',borderBottomWidth:1,flexDirection:'row',alignItems:'center',paddingLeft:20*s,paddingRight:20*s}}
                            onPress={()=>this._comment(this.state.reply_item.acid)}
                            >
                                <Text>回复</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{width:'100%',height:'22%',borderBottomColor:'#F0F0F0',borderBottomWidth:1,flexDirection:'row',alignItems:'center',paddingLeft:20*s,paddingRight:20*s}}

                            >
                                <Text>复制</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{width:'100%',height:'22%',flexDirection:'row',alignItems:'center',paddingLeft:20*s,paddingRight:20*s}}

                            >
                                <Text>举报</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* 添加评论 */}
                <Modal
                style={styles.container}
                    animationType='silde'
                    onRequestClose={this._comment_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.com}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover} 
                    onPress={this._comment_false}>
                    </TouchableOpacity>
                    <View style={{backgroundColor:'#FFF',position:'absolute',bottom:0,right:0,left:0,flexDirection:'row',padding:20*s,justifyContent:'space-around'}}>
                        <View style={{width:'90%'}}>
                            <TextInput 
                            autoFocus={true}
                            multiline={true}
                            style={{width:'100%',backgroundColor:'#F5F5F5',borderRadius:10*s,height:200*s}}
                            minHeight={200*s} 
                            placeholder={this.state.reply_acid==null?'写评论~':'回复@'+this.state.reply_item.uname}
                            autoFocus={true}
                            textAlignVertical={'top'}
                            onChangeText={(accontent)=>{
                                this.state.reply_acid==null?
                                this.setState({
                                    accontent:accontent
                                })
                                :
                                this.setState({
                                    arcontent:accontent
                                })
                            }}
                            />
                        </View>
                        <View style={{justifyContent:'space-between',marginTop:10*s}}>
                            <TouchableOpacity>
                                <Icon1 name='maximize-2' size={30*s}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.addComment()}>
                                <Text>发送</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* 标题栏 */}
                <View style={{paddingLeft:'5%',backgroundColor:'#FFF',
                alignItems:'center',flexDirection:'row',height:90*s}}>
                    {/* 返回 */}
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon size={40*s} style={{color:'#000'}} name='left'/>
                    </TouchableOpacity>
                    {/* 用户头像 */}
                    <TouchableOpacity 
                    style={{marginLeft:50/scale}}
                    onPress={()=>{Actions.personHome({uid:this.state.data.uid})}}>
                        <Image style={{width:60*s,height:60*s,borderRadius:30*s}} 
                        source={{uri:'http://116.62.14.0:8402/images/'+this.state.data.uimage}}
                        />
                    </TouchableOpacity>
                    {/* 用户名 */}
                    <View style={{marginLeft:20/scale}}>
                        <Text>{this.state.data.uname}</Text>  
                    </View>  
                    {/* <View style={{}}>
                    {
                        this.state.me_data.look===this.state.me_data.uid?
                        <Text></Text>
                        :(
                            <View>
                            {
                            this.state.me_data.look==null?
                            <TouchableOpacity onPress={()=>this.follow_add(this.state.me_data.uid)}>
                                <View style={{width:90*s,height:50*s,justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
                                    <Text style={{color:'#FFF'}}>+关注</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>this.follow_add(this.state.me_data.uid)}>
                                <View style={{width:90*s,height:50*s,justifyContent:'center',alignItems:'center',backgroundColor:'#F5F5F5'}}>
                                    <Text>已关注</Text>
                                </View>
                            </TouchableOpacity>
                            }
                            </View>
                        )
                    }
                    </View>             */}
                </View>
                {/* 正文 */}
                <ScrollView >
                    {/* 作文 */}
                    <View style={{alignItems:'center',backgroundColor:'#FFF',marginTop:10}}>
                        <View style={{width:'95%'}}>
                            <View style={{width:'100%',paddingTop:10*s,flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{fontSize:20*s,color:'#666666'}}>{this.state.data.utime}</Text>
                                <Text style={{ marginRight:15*s,fontSize:21,fontFamily:'Courier',fontWeight:'400',color:'red',fontStyle:'italic',textDecorationStyle:'double',textDecorationLine:'underline'}}>{this.state._grade}</Text>
                            </View>
                            <View style={{margin:15,alignItems:'center'}}>
                                <Text style={{fontSize:40*s}}>{this.state.data.atitle}</Text>
                            </View>
                            <Text style={{fontSize:25*s,color:'grey'}}>{this.state.data.acontent}</Text>
                            {/* 标签 */}
                            <View style={{width:'100%',flexDirection:'row',padding:10/scale}}>
                                <Text style={{color:'#4682B4',fontSize:25*s}}>{this.state.data.atag}</Text>
                            </View>
                            {/* 图片 */}
                            {
                                this.state.data.aimage!==''?
                                <Image style={{width:'100%',height:300*s}} source={{uri:'http://116.62.14.0:8402/images/'+this.state.data.aimage}}/>
                                // :(this.state.flag === '2' ?
                                // <Image style={{width:'100%',height:300*s}} source={this.state.imageUrl1}/>
                                :
                                <View></View>
                            }
                            {/* 链接素材 */}
                            {
                                this.state.data.mtitle==null?
                                <View></View>
                                :
                                <TouchableOpacity onPress={()=>{Actions.popular({mid:this.state.data.mid})}} style={{width:'100%',justifyContent:'flex-end',flexDirection:'row',marginTop:10*s}}>
                                    <View style={{width:'100%',backgroundColor:'#4682B4',borderRadius:15/scale,padding:10/scale,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                                        <View style={{width:'10%',flexDirection:'row',justifyContent:'center'}}>
                                            <Icon2 name='tags' size={28*s} color='#FFF' />
                                        </View>
                                        <Text style={{fontSize:20*s,color:'#FFF',width:'90%'}}>{this.state.data.mtitle}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            
                            
                        </View>
                    </View>
                   
                        {this.state.teacher === '1' ?
                            <View></View>
                            :
                             
                            (this.state.data.agrade === -1 || this.state.data.agrade === 0 ?
                                <View></View> :
                            <View>
                                 <View style={{ height: 50 * s, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', padding: '2.5%' }}>
                                    <Text onPress={() => { this._teacherComment(this.state.data.agrade) }}>名师点评</Text>
                                </View>
                                <View style={{  padding: 30 / scale, backgroundColor: '#fff' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity>
                                            {/* {
                                                this.state.teachercomment.timage==''?
                                                <View></View>
                                                :
                                                <Image style={{ width: 60 * s, height: 60 * s, borderRadius: 30 * s, margin: 10 / scale }}
                                                source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.teachercomment.timage }}
                                                />
                                            } */}
                                            
                                        </TouchableOpacity>
                                        <View style={{ justifyContent: 'space-between', marginLeft: 10 / scale }}>
                                            <Text style={{ fontSize: 20 * s }}>{this.state.teachercomment.tname}</Text>
                                            <View style={{}}>
                                                <Text style={{ fontSize: 20 * s }}>{this.state.teachercomment.gradetime}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{marginTop: 20*s, borderTopWidth: s, borderTopColor: 'gray', padding: 30 / scale}}>
                                        <View>
                                            <Text style={{fontSize: 20 * s, marginBottom: 20*s}}>
                                                <Icon2 name="file-text-o" color="#4682B4" size={24 * s}/>
                                                &nbsp;&nbsp;&nbsp;作文评分
                                            </Text>
                                            <Text style={{fontSize: 20 * s, marginBottom: 10*s }}>分数&nbsp;&nbsp;&nbsp;<Text style={{fontSize: 20 * s, marginBottom: 10*s, color: 'red' }}>{this.state.teachercomment.score}</Text></Text>
                                            <View><Text style={{fontSize: 20 * s, marginBottom: 10*s}}>内容&nbsp;&nbsp;&nbsp;{this.state.teachercomment.gcontent}</Text></View>
                                            <View><Text style={{fontSize: 20 * s, marginBottom: 10*s}}>卷面&nbsp;&nbsp;&nbsp;{this.state.teachercomment.gcover}</Text></View>
                                            <View><Text style={{fontSize: 20 * s, marginBottom: 10*s}}>语言&nbsp;&nbsp;&nbsp;{this.state.teachercomment.glanguage}</Text></View>
                                            <View><Text style={{fontSize: 20 * s, marginBottom: 10*s}}>结构&nbsp;&nbsp;&nbsp;{this.state.teachercomment.gstructure}</Text></View>
                                            <View><Text style={{fontSize: 20 * s, marginBottom: 10*s}}>表达&nbsp;&nbsp;&nbsp;{this.state.teachercomment.gexpress}</Text></View>
                                            <View><Text style={{fontSize: 20 * s, marginBottom: 10*s}}>特征&nbsp;&nbsp;&nbsp;{this.state.teachercomment.gfeature}</Text></View>
                                        </View>
                                        <View>
                                        <Text style={{fontSize: 20 * s, marginBottom: 20*s, marginTop: 10*s, borderTopWidth: s, borderTopColor: 'gray', paddingTop: 30 / scale}}>
                                                <Icon2 name="file-text-o" color="#4682B4" size={24 * s}/>
                                                &nbsp;&nbsp;&nbsp;点评详情
                                            </Text>
                                            <View style={{marginBottom: 20*s}}>
                                                <Text style={{fontSize: 20 * s, marginBottom: 10*s, color: 'red' }}>得分点</Text>
                                                <Text>{this.state.teachercomment.gscorepoint}</Text>
                                            </View>
                                            <View style={{marginBottom: 20*s}}>
                                                <Text style={{fontSize: 20 * s, marginBottom: 10*s, color: 'red' }}>失分点</Text>
                                                <Text>{this.state.teachercomment.glosepoint}</Text>
                                            </View>
                                            <View style={{marginBottom: 20*s}}>
                                                <Text style={{fontSize: 20 * s, marginBottom: 10*s, color: 'red' }}>修改建议</Text>
                                                <Text>{this.state.teachercomment.gmodityadvice}</Text>
                                            </View>
                                            <View><Text style={{fontSize: 20 * s, marginBottom: 10*s, borderTopWidth: s, borderTopColor: 'gray', paddingTop: 30 / scale}}>作文等级&nbsp;&nbsp;&nbsp;<Text style={{fontSize: 20 * s, marginBottom: 10*s, color: 'red' }}>{this.state.teachercomment.rank}</Text></Text></View>
                                        </View>
                                    </View>
                                </View>
                            </View>)
                        }
                    {/* 评论 */}
                    <View style={{height:50*s,backgroundColor:'#FFF',flexDirection:'row',alignItems:'center',padding:'2.5%'}}><Text>评论</Text></View>
                    <FlatList
                            style={{backgroundColor: '#FFF',borderTopColor:'#F5F5F5',borderTopWidth:1}}
                            data={this.state.comments}
                            // ListFooterComponent={this._renderFooter}//颜色不对
                            ListEmptyComponent={ this._renderEmptyComponent }
                            numColumns={1}
                            renderItem={({item})=>(
                                <View style={{flexDirection:'column'}}>

                                    <TouchableNativeFeedback 
                                    background={TouchableNativeFeedback.SelectableBackground()}
                                    onPressOut={()=>this.reply_modal(item)}
                                    >
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{width:'18%',paddingTop:15*s,justifyContent:'center',flexDirection:'row'}}>
                                                <TouchableOpacity
                                                onPress={()=>{Actions.personHome({uid:item.uid})}}
                                                >
                                                    <Image style={{width:70*s,height:70*s,borderRadius:35*s,margin:10/scale}} 
                                                    source={{uri:'http://116.62.14.0:8402/images/'+item.uimage}}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{paddingTop:20/scale,paddingBottom:20/scale,paddingRight:20/scale,width:'82%'}}>
                                                <View>
                                                    <Text style={{fontSize:20*s,color:'#666666'}}>{item.uname}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{marginTop:20/scale,marginRight:20/scale}}>{item.accontent}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                    {/* 显示回复评论数量 */}
                                    {item.acnum==null?
                                    <View></View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{width:'18%'}}></View>
                                           <View style={{paddingTop:20/scale,paddingBottom:20/scale,paddingRight:20/scale,width:'82%'}}>
                                            <TouchableOpacity onPress={()=>{Actions.reply({refresh: () => { this.getarticle()},acid:item.acid,actime:item.actime,accontent:item.accontent,uid:item.uid,uimage:item.uimage,uname:item.uname,acnum:item.acnum})}}>
                                                <View style={{marginRight:20/scale,backgroundColor:'#F0F0F0'}}>
                                                    <Text style={{margin:10*s,color:'#5482b4'}}>
                                                        共{item.acnum}条回复>
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    }
                                    {/* 时间和点赞 */}
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{width:'18%'}}></View>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20/scale,paddingRight:20/scale,borderBottomWidth:1,borderBottomColor:'#F0F0F0',width:'82%'}}>
                                            <Text style={{fontSize:20*s}}>{item.actime}</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <Icon style={{marginRight:20/scale}} name='message1' color='#666666' size={25*s}/>
                                                <Icon style={{marginRight:20/scale}} name='like2' color='#666666' size={26*s}/>
                                                <Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                    />
                    <View style={{height:50}}></View>
                </ScrollView>
                {/* 评论点赞悬浮 */}
                <View style={{position:'absolute',bottom:0,width:'100%',height:90*s,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#FFF'}}>
                    <TouchableWithoutFeedback onPress={()=>this._comment(null)} >
                        <View style={{width:'70%',backgroundColor:'#F0F0F0',height:60*s,borderRadius:30*s,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{marginLeft:'8%',fontSize:25*s,color:'#666666'}}>说说你的看法吧</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={this.like}>
                        {
                            this.state.data.look===null?
                            (
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <Icon name='like2' color='#666666' size={40*s}/>
                                    <Text style={{fontSize:15*s}}>{this.state.data.alikes}</Text>
                                </View>
                            )
                            :
                            (
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <Icon name='like1' color='red' size={40*s}/>
                                    <Text style={{fontSize:15*s}}>{this.state.data.alikes}</Text>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>this._comment(null)} style={{justifyContent:'center',alignItems:'center'}}>
                        <Icon name='message1' color='#666666' size={40*s}/>
                        <Text style={{fontSize:15*s}}>{this.state.data.acomment}</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                        <Icon name='sharealt' color='#666666' size={40*s}/>
                        <Text style={{fontSize:15*s}}>分享</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>Actions.yelp({aid: this.props.aid})} style={{justifyContent:'center',alignItems:'center'}}>
                        <Icon name='sharealt' size={40*s}/>
                        <Text style={{fontSize:15*s}}>点评</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            
        )
        }
    else{
        return(
            <View>
                <ActivityIndicator size='large' color='red'/>
            </View>
        )
    }
        
    }
    
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cover: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
})
