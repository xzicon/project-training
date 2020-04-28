import React, { Component } from 'react'
import {View,Text, StatusBar, StyleSheet,Dimensions, TextInput,ScrollView,Image, FlatList, TouchableOpacity, AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class HomePage extends Component {
    constructor(){
        super();
        this.state=({
            new:0,//默认最热页面，是否是最新页面
            follow:0,//默认推荐页面，是否是关注页
            recommend_data:[],//推荐页下的作文
            recommend_data_new:[],
            follow_data:[],//关注页下的作文
            uid:'',
            refreshing: false,
        })
    }
    // 默认推荐页面
    componentDidMount(){
        AsyncStorage.getItem('uid')
        .then((res)=>{
            res===null?
            this.setState({uid:6})
            :
            this.setState({uid:res})
        })
        if(this.state.new===0&&this.state.follow===0){
            // fetch('http://116.62.14.0:8402/article/all')
            // .then((res)=>res.json())
            // .then((res)=>{
            //     this.setState({
            //         recommend_data:res.data
            //     })
            // })
            this.all()
        }
    }
    // 
    all = ()=>{
        this.setState({
            refreshing: true
        });
        setTimeout(() => {
        fetch('http://116.62.14.0:8402/article/all')
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res.data[0])
                this.setState({
                    recommend_data:res.data,
                    refreshing: false,
                })
            })
        }, 1000);
    }
    // 
    new = () => {
        this.setState({
            refreshing: true
        });
        setTimeout(() => {
        fetch('http://116.62.14.0:8402/article/new')
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res.data[0])

                this.setState({
                    recommend_data_new:res.data,
                    new:1,
                    refreshing: false,
                })
            })
        }, 1000);
    }
    // 关注推荐页面切换
    change=()=>{
        if(this.state.follow===0){
            fetch('http://116.62.14.0:8402/article/uconcern/'+this.state.uid)
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res.data[0])

                this.setState({
                    follow_data:res.data,
                    follow:1
                })
            })
        }else{
            this.setState({
                follow:0
            })
        }
    }
    // 推荐最新最热页面切换
    change_new=()=>{
        if(this.state.new===0){
            fetch('http://116.62.14.0:8402/article/new')
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    recommend_data_new:res.data,
                    new:1
                })
            })
            // this.new();
        }else{
            fetch('http://116.62.14.0:8402/article/all')
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    recommend_data:res.data,
                    new:0
                })
            })
        }
    }
    _renderEmptyComponent = () => (
        <View>
            <Text>
                你还没有关注人哦！
            </Text>
        </View>
    )
    _renderFooter = () => (
        <View>
            <Text>
                到底了~
            </Text>
        </View>
    )
    _container=(item)=>{
        return(
            <View style={{backgroundColor:'#FFF',marginLeft:20*s,marginRight:20*s,marginTop:10*s,marginBottom:10*s,
                        height:360*s,borderRadius:10*s,overflow:'hidden',padding:20*s
            }}>
            {/* 点击头像个人主页 */}
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity style={{marginRight:20*s}} onPress={()=>{Actions.personHome({uid:(item.upid==undefined)?item.uid:item.upid})}}>
                        <Image style={{width:60*s,height:60*s,borderRadius:30*s}} 
                        source={{uri:'http://116.62.14.0:8402/images/'+item.uimage}}/>
                    </TouchableOpacity>
                    <View>
                        <Text>{item.uname}</Text>
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
        )
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {/* 搜索 */}
                <View style={{backgroundColor:'#FFF',
                alignItems:'center',flexDirection:'row',justifyContent:'center',height:90*s}}>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60*s,width:'90%',borderRadius:30*s,backgroundColor:'#F5F5F5'}} 
                    onPress={()=>{Actions.search()}}>
                        <Text style={{color:'#666666'}}>请输入要搜索的内容</Text>
                        <Icon style={{paddingLeft:10*s}} name='search1' size={30*s} color='#666666'/>
                    </TouchableOpacity>
                </View>
                {/* 关注推荐 */}
                {
                    this.state.follow===1?
                        ( 
                            // 关注页面
                            <View style={{flex:1}}>
                                <View style={{alignItems:'center',flexDirection:'row',height:60*s,backgroundColor:'#fff',paddingLeft:10*s}}>
                                    <TouchableOpacity><Text style={{color: 'rgb(216, 62, 52)',fontSize:24,marginRight:10*s}}>关注</Text></TouchableOpacity>
                                    <TouchableOpacity  onPress={this.change}><Text>推荐</Text></TouchableOpacity>
                                </View>
                                <FlatList
                                    style={{marginTop:10*s,marginBottom:10*s}}
                                    data={this.state.follow_data}
                                    numColumns={1}
                                    // ListFooterComponent={ this._renderFooter }
                                    onRefresh = {()=>{
                                        this.all()
                                    }}
                                    refreshing = { this.state.refreshing }
                                    renderItem={({item})=>(
                                        this._container(item)
                                    )}
                                />
                            </View>
                        )
                        :(
                            // 推荐页面
                            <View style={{flex:1}}>
                                <View style={{alignItems:'center',flexDirection:'row',height:60*s,backgroundColor:'#fff',paddingLeft:10*s}}>
                                    <TouchableOpacity onPress={this.change} style={{marginRight:10*s}}><Text>关注</Text></TouchableOpacity>
                                    <TouchableOpacity><Text style={{color: 'rgb(216, 62, 52)',fontSize:24}}>推荐</Text></TouchableOpacity>
                                </View>
                                {/* 最新最热 */}
                                {this.state.new===1?
                                // 最新
                                <View style={{flex:1}}>
                                    <ScrollView>
                                    <View style={{alignItems:'center',flexDirection:'row',height:40*s,paddingLeft:10*s,justifyContent:'flex-end',paddingRight:20*s}}>
                                        {/* <TouchableOpacity style={{borderBottomWidth:4,borderBottomColor:'rgb(255, 223, 65)'}}><Text style={{color: 'rgb(216, 62, 52)'}}>最新</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={this.change_new}><Text>最热</Text></TouchableOpacity> */}
                                        <TouchableOpacity onPress={this.change_new} style={{flexDirection:'row',alignItems:'center'}}>
                                            {/* <Icon name='list' size={20*s} color='#5482b4'/> */}
                                            <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort.png')} />

                                            <Text style={{color:'#5482b4',fontSize:20*s}}>按时间</Text>
                                        </TouchableOpacity>
                                    </View> 
                                    {/* 作文 */}
                                    <View></View>
                                    <FlatList
                                        style={{paddingBottom:10*s}}
                                        data={this.state.recommend_data_new}
                                        numColumns={1}
                                        ListFooterComponent={ this._renderFooter }
                                        onRefresh = {()=>{
                                            this.new()
                                        }}
                                        refreshing = { this.state.refreshing }
                                        renderItem={({item})=>(
                                        this._container(item)

                                        )}
                                    />
                                    </ScrollView>
                                    </View>
                                    :(
                                        // 最热
                                    <View style={{flex:1}}>
                                        {/* <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row',height:50*s,paddingLeft:10*s}}>
                                            <Text>热门</Text>
                                            <View style={{flexDirection:'row',alignItems:'center',width:100*s,height:50*s,borderRadius:20*s,backgroundColor:'#F4F4F4'}}>
                                            <TouchableOpacity onPress={this.change_new}><Text style={{fontSize:20*s}}>最新</Text></TouchableOpacity>
                                            <TouchableOpacity style={{borderBottomWidth:4,borderBottomColor:'rgb(255, 223, 65)'}}><Text style={{color: 'rgb(216, 62, 52)',fontSize:20*s}}>最热</Text></TouchableOpacity>
                                            </View>
                                        </View>  */}
                                    <ScrollView>
                                    <View style={{alignItems:'center',flexDirection:'row',height:40*s,paddingLeft:10*s,justifyContent:'flex-end',paddingRight:20*s}}>
                                        {/* <TouchableOpacity onPress={this.change_new}><Text >最新</Text></TouchableOpacity>
                                        <TouchableOpacity style={{borderBottomWidth:4,borderBottomColor:'rgb(255, 223, 65)'}}><Text style={{color: 'rgb(216, 62, 52)'}}>最热</Text></TouchableOpacity> */}
                                        <TouchableOpacity onPress={this.change_new} style={{flexDirection:'row',alignItems:'center'}}>
                                            {/* <Icon name='list' size={20*s} color='#5482b4'/> */}
                                            <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort2.png')} />

                                            <Text style={{color:'#5482b4',fontSize:20*s}}>按热度</Text>
                                        </TouchableOpacity>
                                    </View> 
                                    {/* 作文 */}
                                    <FlatList
                                    style={{paddingBottom:10*s}}
                                    data={this.state.recommend_data}
                                    numColumns={1}
                                    // ListFooterComponent={ this._renderFooter }
                                    onRefresh = {()=>{
                                        this.all()
                                    }}
                                    refreshing = { this.state.refreshing }
                                    renderItem={({item})=>(
                                        this._container(item)
                                    )}
                                />
                                </ScrollView>
                            </View>
                        )}
                                
                        {
                            this.state.recommend_data.map((data)=>{
                                <View><Text>{data.atitle}</Text></View>
                            })
                        }
                    </View>
                )}
                {/* 添加作文 */}
                {/* <View style={{width:90*s,height:90*s,position:'absolute',top:900*s,right:30*s}}>
                    <TouchableOpacity 
                        style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#d83e34',borderRadius:45*s}}
                        onPress={()=>Actions.addEssay()}
                    >
                        <Text style={{color:'#fff',fontSize:58*s}}>+</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }
}

