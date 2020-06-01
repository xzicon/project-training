import React, { Component } from 'react'
import { Text, View, AsyncStorage ,FlatList,
    TouchableOpacity,ToastAndroid,ScrollView, Image,
    Dimensions,StyleSheet, Modal,TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,} from 'react-native'
    import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Title from '../common/Title';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Reply extends Component {
    constructor(props){
        super(props);
        this.state=({
            acid:this.props.acid,
            articlecomment:{
                uid:this.props.uid,
                uimage:this.props.uimage,
                uname:this.props.uname,
                accontent:this.props.accontent,
                actime:this.props.actime,
                level:this.props.arlevel
            },
            com:false,
            reply_acid:null
            

        })
    }
    componentDidMount(){
        AsyncStorage.getItem('uid')
        .then((res)=>{
            res===null?
            this.setState({uid:'6'})
            :
            this.setState({uid:res})
            this.getreply()
        })
        console.log(this.state.articlecomment);
        console.log(this.state.acid)
        
    }
    getreply=()=>{
        fetch('http://116.62.14.0:8402/reply/replylist/'+this.state.acid)
        .then(res=>res.json())
        .then((res)=>{
            if(res.status==0){
                console.log(res.data)
                this.setState({
                    reply_list:res.data
                })
            }else{
                console.log(res.data)
            }
            
        })
    }
    _comment=(item)=>{
        console.log(item)
        if(item==null){
            this.setState({
                com:true,
                reply_acid:null
            })
            console.log('1')
        }else{
            this.setState({
                com:true,
                reply_acid:item

            })
            
        }
        
        
    }
    _comment_false=()=>{
        this.setState({
            com:false,
            reply_acid:null
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
                arcontent:this.state.arcontent,
                artime:Y+M+D+h+m,
                uid:this.state.uid,
                acid:this.state.acid,
                arrid:this.state.reply_acid==null?null:this.state.reply_acid.arid
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
                    this.getreply()
                }else{
                    ToastAndroid.show('评论失败',100)
                }
                
            })
      
    }
    render() {
        return (
            <View style={{flex:1}}>
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
                            placeholder={this.state.reply_acid==null?'写评论~':'回复@'+this.state.reply_acid.uname}
                            autoFocus={true}
                            textAlignVertical={'top'}
                            onChangeText={(arcontent)=>{
                                
                                this.setState({
                                    arcontent:arcontent
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
                
                <View style={{paddingLeft:'5%',backgroundColor:'#FFF',
                alignItems:'center',flexDirection:'row',height:90*s}}>
                    {/* 返回 */}
                    <TouchableOpacity onPress={()=>Actions.pop(this.props.refresh())}>
                        <Icon size={40*s} style={{color:'#000'}} name='left'/>
                    </TouchableOpacity>
                    <View style={{marginLeft:20/scale}}>
                    <Text>{this.state.articlecomment.acnum}</Text>
                    </View>  
                </View>
                <ScrollView>
                <View style={{flexDirection:'row',backgroundColor:'#FFF',borderTopColor:'#666666',borderTopWidth:1/scale}}>
                    <View style={{width:'18%',paddingTop:15*s,justifyContent:'center',flexDirection:'row'}}>
                        <TouchableOpacity
                        onPress={()=>{Actions.personHome({uid:this.state.articlecomment.uid})}}
                        >
                            <Image style={{width:70*s,height:70*s,borderRadius:35*s,margin:10/scale}} 
                            source={{uri:'http://116.62.14.0:8402/images/'+this.state.articlecomment.uimage}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop:20/scale,paddingBottom:20/scale,paddingRight:20/scale,width:'82%'}}>
                        <View>
                            {/* <Text style={{fontSize:20*s,color:'#666666'}}>{this.state.articlecomment.uname}{this.state.articlecomment.level}</Text> */}
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{marginRight:5*s,fontSize:20*s,color:'#666666'}}>{this.state.articlecomment.uname}</Text>
                                {
                                    this.state.articlecomment.level!=undefined?
                                    <Title level={this.state.articlecomment.level}/>
                                    :
                                    <View></View>
                                }
                                
                            </View>
                            
                            <Text style={{fontSize:20*s,color:'#666666'}}>{this.state.articlecomment.actime}</Text>
                        </View>
                        <View>
                            <Text style={{marginTop:20/scale,marginRight:20/scale}}>{this.state.articlecomment.accontent}</Text>
                        </View>
                    </View>
                </View>
                {/* 时间和点赞 */}
                <View style={{flexDirection:'row',backgroundColor:'#FFF',paddingBottom:10*s}}>
                    <View style={{width:'18%'}}></View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20/scale,paddingRight:20/scale,borderBottomWidth:1,borderBottomColor:'#FFF',width:'82%'}}>
                        <Text style={{fontSize:20*s}}></Text>
                        <View style={{flexDirection:'row'}}>
                            <Icon style={{marginRight:20/scale}} name='like2' color='#666666' size={26*s}/>
                        </View>
                    </View>
                </View>
                <FlatList
                    style={{backgroundColor: '#F0F0F0',marginBottom:90*s,borderTopColor:'#F5F5F5',borderTopWidth:1}}
                    data={this.state.reply_list}
                    // ListFooterComponent={this._renderFooter}//颜色不对
                    numColumns={1}
                    renderItem={({item})=>(
                        <View style={{flexDirection:'column',borderBottomColor:'#666666',borderBottomWidth:1/scale}}>
                            
                            <TouchableNativeFeedback 
                            background={TouchableNativeFeedback.SelectableBackground()}
                            onPressOut={()=>this._comment(item)}
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
                                            {/* <Text style={{fontSize:20*s,color:'#666666'}}>{item.uname}{item.level}</Text> */}
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{marginRight:5*s,fontSize:20*s,color:'#666666'}}>{item.uname}</Text>
                                                {
                                                    item.level!=undefined?
                                                    <Title level={item.level}/>
                                                    :
                                                    <View></View>
                                                }
                                                
                                            </View>
                                            <Text style={{fontSize:20*s}}>{item.artime}</Text>
                                        </View>
                                        <View>
                                            {item.arrid==null?
                                            <Text style={{marginTop:20/scale,marginRight:20/scale}}>{item.arcontent}</Text>
                                            :
                                            <Text style={{marginTop:20/scale,marginRight:20/scale}}>回复<Text style={{color:'#5482b4'}}>@{item.urname}:</Text>{item.arcontent}</Text>

                                            }
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                            {/* 时间和点赞 */}
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:'18%'}}></View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20/scale,paddingRight:20/scale,borderBottomWidth:1,borderBottomColor:'#F0F0F0',width:'82%'}}>
                                    <Text style={{fontSize:20*s}}></Text>
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
                    <View style={{height:90*s,width:'100%'}}></View>
                </ScrollView>
                <View style={{position:'absolute',bottom:0,width:'100%',height:90*s,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#FFF'}}>
                    <TouchableWithoutFeedback onPress={()=>this._comment(null)} >
                        <View style={{width:'90%',backgroundColor:'#F0F0F0',height:60*s,borderRadius:30*s,alignItems:'center',flexDirection:'row'}}>
                                        <Text style={{marginLeft:'8%',fontSize:25*s,color:'#666666'}}>回复@{this.state.articlecomment.uname}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
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
