import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,Animated,StyleSheet,Dimensions,Image, AsyncStorage,FlatList, ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import {Actions} from 'react-native-router-flux'
import Icon1 from 'react-native-vector-icons/Feather';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class PersonHome extends Component {
    constructor(){
        super();
        this.state=({
            uid:'',
            write:1,
            write_data:[],
            collect:0,
            collect_data:[],
            follow:0,
            follow_data:[],
            me_data:[]
        })
    }
    componentDidMount(){
        AsyncStorage.getItem('uid')
        .then((res)=>{
            res===null?
            this.setState({look:''})
            :
            this.setState({look:res})

            this.me()
            if(this.state.write===1){
                this._write()
            }
        })
    }
    me=()=>{
        fetch('http://116.62.14.0:8402/login/me/'+this.props.uid+'/'+this.state.look)
        .then(res=>res.json())
        .then((res)=>{
            this.setState({
                me_data:res.data
            })
        })
    }
    follow=()=>{
        fetch('http://116.62.14.0:8402/login/guanzhu/'+this.props.uid+'/'+this.state.look)
        .then(res=>res.json())
        .then((res)=>{
            this.setState({
                follow_data:res.data
            })
        })
    }
    // follow_add_delete=()=>{

    // }
    follow_add=(upid)=>{
        let data = {
            uid:this.state.look,
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
                this.me();
              }else if(res.status==1){
                this.me();
              }else{
                ToastAndroid.show('关注失败',100)
              }
          })
    }
    follow_add2=(upid)=>{
        let data = {
            uid:this.state.look,
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
                  this.follow();
              }else if(res.status==1){
                this.follow();
              }else{
                ToastAndroid.show('关注失败',100)
              }
          })
    }
    // 收藏列表
    _collect=()=>{
        fetch('http://116.62.14.0:8402/login/materialcollection/'+this.props.uid)
        .then(res=>res.json())
        .then((res)=>{
            console.log(res.data)
            this.setState({
                collect_data:res.data
            })
        })
    }
    // 收藏夹列表
    _collectlist=()=>{
        fetch('http://116.62.14.0:8402/favorite/plist/'+this.props.uid+'/'+this.state.look)
        .then(res=>res.json())
        .then((res)=>{
            console.log(res.data)
            this.setState({
                collectlist_data:res.data
            })
        })
    }
    _write=()=>{
        fetch('http://116.62.14.0:8402/login/article/'+this.props.uid)
        .then(res=>res.json())
        .then((res)=>{
            console.log(res.data)
            this.setState({
                write_data:res.data
            })
        })

    }
    change=()=>{
        if(this.state.write===0){
            this.setState({
                write:1,
                collect:0,
                follow:0
            })
            this._write()
        }
    }
    change_collect=()=>{
        if(this.state.collect===0){
            this.setState({
                write:0,
                collect:1,
                follow:0
            })
            this._collectlist()
        }
    }
    change_follow=()=>{
        if(this.state.follow===0){
            this.setState({
                write:0,
                collect:0,
                follow:1
            })
            this.follow()
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{paddingLeft:'5%',paddingRight:'5%',backgroundColor:'#FFF',
                alignItems:'center',flexDirection:'row',justifyContent:'space-between',height:90*s}}>
                    {/* 返回 */}
                    <TouchableOpacity style={{width:'15%'}} onPress={Actions.pop}>
                        <Icon size={40*s} style={{color:'#000'}} name='left'/>
                    </TouchableOpacity>
                    <View style={{alignItems:'center',width:'60%'}}>
                        <Text style={{fontSize:28*s}}>主页</Text>  
                    </View>       
                    <View style={{width:'15%'}}>
                        {
                        this.state.me_data.look===this.state.me_data.uid?
                        <Text></Text>
                        :
                        (
                            <View>
                            {
                            this.state.me_data.look===null?
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
                    </View>           
                </View>
                <View style={{height:250*s,backgroundColor:'#F5F5F5',justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                    <View style={{alignItems:'center'}}>
                        <Image
                        style={{width:100*s,height:100*s,borderRadius:50*s}}
                         source={{uri:'http://116.62.14.0:8402/images/'+this.state.me_data.uimage}}/>
                        <Text style={{}}>{this.state.me_data.uname}</Text>
                        <Text>{this.state.me_data.udescribe}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',height:70*s,alignItems:'center',backgroundColor:'#fff'}}>
                {
                    this.state.write===1?
                    <TouchableOpacity>
                        <Text style={{color:'red'}}>创作</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.change}>
                        <Text>创作</Text>
                    </TouchableOpacity>
                }
                {
                    this.state.collect===1?
                    <TouchableOpacity>
                        <Text style={{color:'red'}}>收藏</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.change_collect}>
                        <Text>收藏</Text>
                    </TouchableOpacity>
                }
                {
                    this.state.follow===1?
                    (
                    // <View>
                    <TouchableOpacity>
                        <Text style={{color:'red'}}>关注</Text>
                    </TouchableOpacity>
                    // <View style={{}}>
                    
                    // </View>
                    // </View>
                    )
                    :
                    <TouchableOpacity onPress={this.change_follow}>
                        <Text>关注</Text>
                    </TouchableOpacity>
                }

                </View>
                <View>
                {
                    this.state.write===1?
                    <View style={{marginBottom:410*s}}>
                                    <FlatList
                                        style={{backgroundColor: '#F4F4F4'}}
                                        data={this.state.write_data}
                                        numColumns={1}
                                     
                                        renderItem={({item})=>(
                                            <View style={{backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                                                    height:360*s,borderRadius:10*s,padding:20*s}}>
                                            {/* 点击头像个人主页 */}
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                                <TouchableOpacity style={{marginRight:20*s}}>
                                                    <Image style={{width:60*s,height:60*s,borderRadius:30*s}} 
                                                    source={{uri:'http://116.62.14.0:8402/images/'+this.state.me_data.uimage}}/>
                                                </TouchableOpacity>
                                                <View>
                                                    <Text>{this.state.me_data.uname}</Text>
                                                    <Text>{item.utime}</Text>
                                                </View>
                                            </View>
                                            {/* 点击详情页 */}
                                            <View style={{width:'100%',height:180*s}}>
                                                <TouchableOpacity style={{}} onPress={()=>{Actions.detailEssay({aid:item.aid})}}>
                                                        <View style={{alignItems:'center',margin:20*s}}>
                                                            <Text style={{fontSize:35*s,}}>{item.atitle}</Text>
                                                        </View>
                                                        <Text numberOfLines={3}>{item.acontent}</Text>
                                                        {/* 查看全文未设置好样式 */}
                                                        {/* <TouchableOpacity onPress={()=>Actions.detailEssay({aid:item.aid})}><Text>全文</Text></TouchableOpacity> */}
                                                </TouchableOpacity>
                                            </View>
                                            {/* 点击素材 */}
                                            {/* 接口未获取素材标题 */}
                                            {/* 目前改成标签 */}
                                            <View style={{marginTop:25*s,flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={{color:'#4682B4'}}>{item.atag}</Text>
                                                <Icon1 name='more-vertical' size={40*s}/>
                                            </View>
                                        </View>
                                        )}
                                    />
                    </View>
                    :(
                        this.state.collect===1?
                        <View style={{marginBottom:410*s}}>
                        <FlatList
                        // ListFooterComponent={}
                        extraData={this.state}
                        style={{backgroundColor: '#F4F4F4'}}
                        data={this.state.collectlist_data}
                        numColumns={1}
                        renderItem={({item})=>(
                                
                            <TouchableOpacity onPress={()=>{Actions.favorite({faid:item.faid})}}>
                                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                        height:150*s,borderRadius:10*s,padding:20*s}}>
                                    <Image style={{width:120*s,height:120*s,marginRight:10*s}} source={{ uri: 'http://116.62.14.0:8402/images/' + item.faimage }}/>
                                    <View style={{height:120*s,flexDirection:'column',justifyContent:'space-evenly'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={{fontSize:25*s,marginRight:10*s}}>{item.favoritename}</Text>

                                            {
                                                item.fhide==1?
                                                <Icon1 name='lock' color='grey' size={25*s}/>
                                                :
                                                <Text></Text>
                                            } 
                                        </View>
                                        <Text style={{color:'grey',fontSize:20*s}}>{item.fnum==null?'0个内容':item.fnum+`个内容`}</Text>     
                                    </View> 
                                </View>
                            </TouchableOpacity>     
                        )}
                        />
                    </View>
                        :
                        <View style={{marginBottom:410*s}}>
                        <FlatList
                        
                        style={{backgroundColor: '#F4F4F4'}}
                        data={this.state.follow_data}
                        numColumns={1}
                        renderItem={({item})=>(
                            <View style={{borderWidth:1/scale,borderColor:'#F5F5F5'}}>
                                {
                                item.taid==this.props.uid?
                                <View></View>
                                :
                                <View style={{height:150*s,backgroundColor:'#FFF',justifyContent:'space-between',padding:50*s,flexDirection:'row',alignItems:'center'}}>
                                    <TouchableOpacity style={{width:'40%',flexDirection:'row',alignItems:'center'}} onPress={()=>{Actions.personHome({uid:item.taid})}}>
                                        <Image style={{width:100*s,height:100*s,borderRadius:50*s}}
                                        source={{uri:'http://116.62.14.0:8402/images/'+item.uimage}}/>
                                        <View style={{marginLeft:'15%'}}>
                                        <Text>{item.uname}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {item.woid===null?
                                    (
                                        item.taid==this.state.look?
                                        <Text></Text>
                                        :
                                        <TouchableOpacity onPress={()=>this.follow_add2(item.taid)}>
                                            <View style={{width:90*s,height:50*s,justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
                                                <Text style={{color:'#FFF'}}>+关注</Text>
                                            </View>
                                        </TouchableOpacity>
                                        
                                    )
                                    :
                                    <TouchableOpacity onPress={()=>this.follow_add2(item.taid)}>
                                            <View style={{width:90*s,height:50*s,justifyContent:'center',alignItems:'center',backgroundColor:'#F5F5F5'}}>
                                                <Text style={{color:'#000'}}>已关注</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                                }
                            </View>
                        )}
                    />
                    </View>
                    
                    )

                }
                
                </View>
            </View>
        )
    }
}

