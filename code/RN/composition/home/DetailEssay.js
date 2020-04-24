import React, { Component } from 'react'
import { Text, View, AsyncStorage ,FlatList,
    TouchableOpacity,ToastAndroid,ScrollView, Image,
    Dimensions,StyleSheet, Modal,TextInput,
    ActivityIndicator
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
            imageUrl1:''
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
            this.getarticle()
        })
        AsyncStorage.getItem('imgurl1').then((res) => {
            if (res !== null) {
                this.setState({
                    imageUrl1: JSON.parse(res),
                    flag: '2'
                });
            }
        });
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
    _comment=()=>{
        let com1 = this.state.com;
        this.setState({
            com:!com1
        })
    }
    addComment=()=>{
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate()<10 ? '0'+(date.getDate()) : date.getDate())+' ';
        var h = (date.getHours()<10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes()<10 ? '0'+(date.getMinutes()) : date.getMinutes());

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
                this._comment();
                this.getarticle();
              }else{
                ToastAndroid.show('评论失败',100)
              }
              
        })
    }
    _renderFooter = () => (
        <View style={{flexDirection:'row',justifyContent:'center',padding:20/scale,backgroundColor:'#F5F5F5'}}>
            <Text>
                到底了哦~
            </Text>
        </View>
    )
    render() {
        console.log(this.state.imageUrl);
        if(this.state.isLoad){
        return (
            <View style={{flex:1}}>
                {/* 添加评论 */}
                <Modal
                style={styles.container}
                    animationType='silde'
                    onRequestClose={this._comment}//安卓必须设置
                    transparent={true}
                    visible={this.state.com}
                >
                    <TouchableOpacity style={styles.cover} 
                    onPress={this._comment}>
                    </TouchableOpacity>
                    <View style={{backgroundColor:'#FFF',position:'absolute',bottom:0,right:0,left:0,flexDirection:'row',padding:20*s,justifyContent:'space-around'}}>
                        <View style={{width:'90%'}}>
                            {/* <RichTextView 
                            
                            style={{width:'100%',backgroundColor:'#F5F5F5',borderRadius:10*s,height:200*s}}
                            minHeight={200*s} 
                            maxLength={200} 
                            placeholder='写评论~'
                            onChangeText={(accontent)=>{
                                this.setState({
                                    accontent:accontent
                                })
                            }}
                            /> */}
                            <TextInput 
                            autoFocus={true}
                            multiline={true}
                            style={{width:'100%',backgroundColor:'#F5F5F5',borderRadius:10*s,height:200*s}}
                            minHeight={200*s} 
                            placeholder='写评论~'
                            autoFocus={true}
                            textAlignVertical={'top'}
                            onChangeText={(accontent)=>{
                                this.setState({
                                    accontent:accontent
                                })
                            }}
                            />
                        </View>
                        <View style={{justifyContent:'space-between',marginTop:10*s}}>
                            <TouchableOpacity>
                                <Icon1 name='maximize-2' size={30*s}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.addComment}>
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
                        <Image style={{width:50*s,height:50*s,borderRadius:25*s}} 
                        source={{uri:'http://116.62.14.0:8402/images/'+this.state.data.uimage}}
                        />
                    </TouchableOpacity>
                    {/* 用户名 */}
                    <View style={{marginLeft:20/scale}}>
                        <Text>{this.state.data.uname}</Text>  
                    </View>                  
                </View>
                {/* 正文 */}
                <ScrollView >
                    {/* 作文 */}
                    <View style={{alignItems:'center',backgroundColor:'#FFF',marginTop:10}}>
                        <View style={{width:'95%'}}>
                            <View style={{width:'100%',paddingTop:10*s}}><Text style={{fontSize:20*s,color:'#666666'}}>{this.state.data.utime}</Text></View>
                            <View style={{margin:15,alignItems:'center'}}><Text style={{fontSize:40*s}}>{this.state.data.atitle}</Text></View>
                            <Text style={{fontSize:25*s,color:'grey'}}>{this.state.data.acontent}</Text>
                            {/* 标签 */}
                            <View style={{width:'100%',flexDirection:'row',padding:10/scale}}>
                                <Text style={{color:'#4682B4',fontSize:25*s}}>{this.state.data.atag}</Text>
                            </View>
                            {/* 图片 */}
                            {
                                this.state.data.aimage!==''?
                                <Image style={{width:'100%',height:300*s}} source={{uri:'http://116.62.14.0:8402/images/'+this.state.data.aimage}}/>
                                :(this.state.flag === '2' ?
                                <Image style={{width:'100%',height:300*s}} source={this.state.imageUrl1}/>
                                :
                                <View></View>)
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
                    {/* 评论 */}
                    <View style={{height:50*s,backgroundColor:'#FFF',flexDirection:'row',alignItems:'center',padding:'2.5%'}}><Text>最新评论</Text></View>
                    <FlatList
                            style={{backgroundColor: '#FFF',borderTopColor:'#F5F5F5',borderTopWidth:1}}
                            data={this.state.comments}
                            // ListFooterComponent={this._renderFooter}//颜色不对
                            numColumns={1}
                            renderItem={({item})=>(
                                <View style={{borderBottomWidth:1,borderBottomColor:'#666666',padding:30/scale}}>
                                {/* <View style={{borderBottomWidth:1,borderBottomColor:'#666666',padding:30/scale,flexDirection:'row',justifyContent:'space-around'}}> */}
                                    {/* <View>
                                        <Image style={{width:40*s,height:40*s,borderRadius:20*s,margin:10/scale}} 
                                        source={{uri:'http://116.62.14.0:8402/images/'+item.uimage}}
                                        />
                                    </View>
                                    <View style={{width:'95%'}}> */}

                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <TouchableOpacity>
                                                <Image style={{width:40*s,height:40*s,borderRadius:20*s,margin:10/scale}} 
                                                source={{uri:'http://116.62.14.0:8402/images/'+item.uimage}}
                                                />
                                            </TouchableOpacity>
                                            <View style={{justifyContent:'space-between',marginLeft:10/scale}}>
                                                <Text style={{fontSize:20*s}}>{item.uname}</Text>
                                                <View style={{}}>
                                                    <Text style={{fontSize:20*s}}>{item.actime}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{width:'100%'}}>
                                            <TouchableOpacity>
                                                <Text style={{marginTop:20/scale,marginLeft:10/scale}}>{item.accontent}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{width:'100%',justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                                            <Icon style={{marginRight:20/scale}} name='like2' size={30*s}/>
                                            <Text></Text>
                                            <Icon style={{marginRight:20/scale}} name='message1' size={30*s}/>
                                            <Text></Text>
                                        </View>
                                    {/* </View> */}
                                </View>
                            )}
                    />
                    <View style={{height:50}}></View>
                </ScrollView>
                {/* 评论点赞悬浮 */}
                <View style={{position:'absolute',bottom:0,width:'100%',height:90*s,flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'#FFF'}}>
                    
                    <TouchableOpacity onPress={this.like}>
                        {
                            this.state.data.look===null?
                            (
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <Icon name='like2' size={40*s}/>
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
                    <TouchableOpacity onPress={this._comment} style={{justifyContent:'center',alignItems:'center'}}>
                        <Icon name='message1' size={40*s}/>
                        <Text style={{fontSize:15*s}}>{this.state.data.acomment}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                        <Icon name='sharealt' size={40*s}/>
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
