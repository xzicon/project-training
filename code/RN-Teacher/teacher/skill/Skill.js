import React, { Component } from 'react'
import { Text, View ,FlatList,AsyncStorage, Image,Dimensions,TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import WebView from 'react-native-webview';

const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill_data: [],
            tid: '',
            refreshing:false
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
            .then((res) => {
                res === null ?
                    this.setState({ tid: '' })
                    :
                    this.setState({ tid: res },()=>{this.all()})
                    console.log(this.state.tid)
                    
                    
            })
    }
    componentWillReceiveProps(){
        if(this.props.refresh==1){
            this.all()
        }
    }
    all = () => {
        this.setState({
            refreshing:true
        },()=>{
        fetch('http://116.62.14.0:8402/skill/tlist/' + this.state.tid)
            .then((res) => res.json())
            .then((res) => {
                if(res.status==0){
                    this.setState({ skill_data: res.data,refreshing:false });
                }else{
                    console.log('error')
                }
                console.log(res.data);
            })
        })
    }
    _renderFooter = () => (
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:50*s,marginBottom:100*s}}>
            <Text>
               到底了~
            </Text>
        </View>
    )
    render() {
        return (
            <View>
                <View style={{flexDirection:'row',height:90*s,backgroundColor:'#FFF',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{marginLeft:20*s,fontSize:30*s}}>我的技法</Text>
                    {/* <View><Text  onPress={()=>Actions.addskill({tid:this.state.tid})}> +发布技法 </Text></View> */}
                </View>
                <FlatList
                    data={this.state.skill_data}
                    numColumns={1}
                    refreshing = { this.state.refreshing }
                    onRefresh = {()=>{
                        this.all()
                    }}
                    ListFooterComponent={ this._renderFooter }
                    renderItem={({ item }) => (
                        <View style={{flex:1}}>
                            {
                                item.skillimage==''?
                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:20*s,marginTop:10*s,marginLeft: 10 * s, marginRight: 10 * s,backgroundColor:'#FFF'}}>
                                    <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                        <Text style={{fontSize:25*s}} onPress={()=>{Actions.skilldetail({sid:item.sid,refresh:()=>{this.all()}})}}>{item.skilltitle}</Text>  
                                        <Text>{item.skilltime}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Image
                                            style={{width:35*s,height:25*s,marginRight:10*s}}
                                            source={require('../../assets/composition/teacher/browse.png')}/>
                                            <Text>阅读203</Text>
                                        </View>
                                    </View>
                                    <View 
                                    style={{width:150*s,height:150*s}}
                                    />
                                </View>
                                :
                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:20*s,marginTop:10*s,marginLeft: 10 * s, marginRight: 10 * s,backgroundColor:'#FFF'}}>
                                    <View style={{flexDirection:'column',justifyContent:'space-between',width:400*s}}>
                                        <Text style={{fontSize:25*s}} onPress={()=>{Actions.skilldetail({sid:item.sid,refresh:()=>{this.all()}})}}>{item.skilltitle}</Text>  
                                       
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Image
                                                style={{width:35*s,height:25*s,marginRight:10*s}}
                                                source={require('../../assets/composition/teacher/browse.png')}/>
                                                <Text>阅读203</Text>
                                            </View>
                                            <Text style={{color:'#666',fontSize:15*s}}>{item.skilltime}</Text>
                                        </View>
                                    </View>
                                    <Image 
                                    style={{width:150*s,height:150*s}}
                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.skillimage }}
                                    />
                                </View>
                            }
                            
                        </View>
                    )}
                />

                <View style={{width:90*s,height:90*s,position:'absolute',top:900*s,right:30*s}}>
                    <TouchableOpacity 
                        style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#d83e34',borderRadius:45*s}}
                        onPress={()=>Actions.addskill({tid:this.state.tid})}
                    >
                        <Text style={{color:'#fff',fontSize:58*s}}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
