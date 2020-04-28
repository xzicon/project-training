import React, {Component,useEffect} from 'react';
import {View,Button, Text,StatusBar, FlatList, Dimensions ,ScrollView,Image, ToastAndroid ,TouchableWithoutFeedback,TouchableOpacity,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Actions} from 'react-native-router-flux';

const {width} = Dimensions.get('window');
const s = width/640;
const settings =[
    {
        title:'账号管理',
    },
    {
        title:'账号安全',
    },
    {
        title:'通用',
    },
    {
        title:'清除缓存',
    },
    {
        title:'检查更新',
    },
]


export default class Myset extends Component {
    constructor(){
        super();
    }
    out=()=>{
        AsyncStorage.removeItem('uid')
        .then(() => {
            Actions.pop();
            Actions.login();
        });
    }
    render() {
        
        return (
            <View style={{flex: 1}}>
                <View style={{}}>
                    <View style={{width:width,height:90*s,backgroundColor:'white',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{width:'15%',justifyContent:'center',flexDirection:'row',alignItems:'center'}}  onPress={()=>Actions.pop()}>
                            <Icon name="left" color="#333" size={35*s}  />
                        </TouchableOpacity>  
                        <View style={{alignItems:'center',width:'70%',}}>
                            <Text style={{color:'#333',fontSize:30*s}}>设置</Text>
                        </View>
                        <View style={{width:'15%'}}></View>
                    </View>
                    <View style={{backgroundColor:"white",width:width,marginTop:10*s}}>
                        <FlatList 
                            data={settings}
                            numColumns={1}
                            renderItem={({item})=>(
                                <View style={{width:width,height:60*s,backgroundColor:'white',position:'relative',marginTop:20*s,}}>
                                    <Text style={{position:'absolute',left:'3%',fontSize:30*s,color:'#333'}} >{item.title}</Text>
                                    <Icon name="right" size={35*s} color="#d8d8d8" style={{position:'absolute',top:'3%',right:'5%'}} />
                                    <View style={{width:'100%',height:s,position:'absolute',bottom:0,backgroundColor:'gray'}}></View>
                                </View>
                            )}
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width: '60%',
                            height: 80*s,
                            borderRadius:20*s,
                            backgroundColor: 'red',
                            marginTop: '10%',
                            marginLeft:'20%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection:'row'
                        }}
                        onPress={this.out}>
                        <Text style={{color:'white',fontSize:30*s}}>退出登录</Text>
                    </TouchableOpacity>

                   
                </View>
            </View>
        )
    }
}
