import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,Dimensions, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class AddSuccess extends Component {
    back=()=>{
        Actions.popTo('skill');
        setTimeout(()=> {
            Actions.refresh({refresh:1})
        });
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',height:90*s,backgroundColor:'#FFF',alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{marginLeft:15*s,marginRight:15*s}} onPress={()=>{this.back()}}><Text>完成</Text></TouchableOpacity>
                    <View style={{width:'40%',alignItems:'center',justifyContent:'center',flexDirection:'row'}}><Text style={{fontSize:30*s}} numberOfLines={1} ellipsizeMode="tail" ></Text></View>
                    <View style={{marginLeft:15*s,marginRight:15*s}}><Text style={{fontSize:30*s}}  style={{color:'red'}}></Text></View>
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:90*s}}>
                    <Image style={{width:150*s,height:150*s}} source={require('../../assets/composition/teacher/success.png')}/>
                    {/* <Text>{this.props.skilltitle}</Text> */}
                    <View style={{borderRadius:25*s,width:'50%',height:50*s,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text>发布成功</Text>
                    </View>
                </View>
            </View>
        )
    }
}
