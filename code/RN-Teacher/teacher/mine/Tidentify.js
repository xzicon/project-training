import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon, Button } from '@ant-design/react-native';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class Tidentify extends Component {
    render() {
        
        return (
            <ScrollView>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 30 * s, left: width * 0.3 }}>师资认证</Text>
                    </View>
                </View>
                <View style={{width:'100%',height:250*s}}>
                    <Image  source={require('../../assets/composition/mine/jiaoshizigezheng.png')} style={{width:'100%',height:'100%'}} />
                    
                </View>
                <View style={{width:'100%',height:30*s,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                    <Text style={{fontSize:20*s}}>上传教师资格证</Text>
                </View>
                <View style={{width:'100%',height:250*s}}>
                    <Image  source={require('../../assets/composition/mine/jiaoshizigezheng.png')} style={{width:'100%',height:'100%'}} />
                </View>
                <View style={{width:'100%',height:30*s,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                    <Text style={{fontSize:20*s}}>上传身份证正面</Text>
                </View>
                <View style={{width:'100%',height:250*s}}>
                    <Image  source={require('../../assets/composition/mine/jiaoshizigezheng.png')} style={{width:'100%',height:'100%'}} />
                </View>
                <View style={{width:'100%',height:30*s,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                    <Text style={{fontSize:20*s}}>上传身份证背面</Text>
                </View>
                <View style={{width:'100%',height:80*s,backgroundColor:'white',justifyContent: 'center',alignItems: 'center'}}>
                    <Button type="primary" style={{width:"90%"}}>提交</Button>
                </View>
                
            </ScrollView>
        )
    }
}
