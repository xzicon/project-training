import React, {Component} from 'react';
import {View,Text,Image,TextInput,AsyncStorage,Dimensions,TouchableOpacity, StyleSheet, ImageBackground, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Forgetpwd extends Component {
    constructor(){
        super();
        this.state = {
            uemail:'',
            code:''
        }
    }
    emailhandle = (text)=>{
        this.setState({uemail:text})
    }
    codehandle = (text)=>{
        this.setState({code:text})
    }
    sendCode = ()=>{
        if(this.state.uemail===''){
            ToastAndroid.show('请输入邮箱',100);
        }else{
            let data = {uemail:this.state.uemail};
            fetch('http://116.62.14.0:8402/register/forget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res=>res.json())
            .then(data=>{
                switch(data.status){
                    case "1":{
                        ToastAndroid.show('该邮箱还未注册，请先去注册',100);
                        break;
                    }
                    case "2":{
                        ToastAndroid.show('发送成功',100);
                        break;
                    }
                    default:{
                        break;
                    }
                }
            })
        }
    }
    modify = ()=>{
        if(this.state.uemail==='' || this.state.code===''){
            ToastAndroid.show('请输入邮箱和验证码',100);
        }else{
            let data = {
                uemail:this.state.uemail,
                code:this.state.code
            }
            fetch('http://116.62.14.0:8402/register/forgetcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                switch (data.status) {
                    case "0":{
                        ToastAndroid.show('验证码验证成功',100);
                        Actions.modify({uemail:this.state.uemail});
                        break;
                    }
                    case "1":{
                        ToastAndroid.show('验证码错误，请重新输入',100);
                        break;
                    }
                    default:{
                        break;
                    }
                }
            })
        }
    }
    render() {
        return (
            <View style={{flex:1,justifyContent:'center'}}>
                <ImageBackground
                    source={require('../../../assets/bg8.png')}
                    style={{width: '100%', height: '100%'}}
                >
                    <View style={styles.form_forgetpwd}>
                        <View style={styles.form}>
                            <View style={styles.wraper}>
                                <Icon name="email" color="gray" size={40*s}/>
                                <TextInput placeholder="请输入注册邮箱" placeholderTextColor='gray'
                                    style={{
                                        borderBottomColor:'#ccc',
                                        borderBottomWidth:1,
                                        width:260,
                                        marginLeft:10
                                    }}
                                    onChangeText={this.emailhandle}
                                />
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity 
                                        style={{
                                            width: '35%',
                                            height: 40,
                                            borderWidth:1,
                                            backgroundColor:'#ccc',
                                            borderColor:'#ccc',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginLeft:'4%'
                                        }}
                                    onPress={this.sendCode}>
                                        <Text>发送验证码</Text>
                                </TouchableOpacity>
                                <TextInput placeholder="请输入验证码" placeholderTextColor='gray'
                                    style={{
                                        width:'40%',
                                        borderWidth:1,
                                        borderColor:'#ccc',
                                        height:40,
                                        marginLeft:'10%',
                                        marginRight:'5%'
                                    }}
                                    onChangeText={this.codehandle}
                                />
                            </View>
                            <View style={styles.tips}>
                                <Text onPress={()=>Actions.register()}>没有账号去注册</Text>
                                <Text onPress={()=>Actions.login()}>知道密码去登录</Text>
                            </View>
                            <TouchableOpacity 
                                style={{
                                    width: '90%',
                                    height: 40,
                                    opacity:0.8,
                                    borderWidth:1,
                                    borderColor:'#ccc',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft:'5%'
                                }}
                                onPress={this.modify}>
                                <Text>验证验证码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    form_forgetpwd:{
        position:'absolute',
        top:200,
        left:0,
        width:'100%',
        height:300,
        // backgroundColor:'red'
    },
    form:{
        width:310,
        height:300,
        marginLeft:'auto',
        marginRight:'auto'
    },
    wraper:{
        width:310,
        height:40,
        marginBottom: 30,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    tips:{
        width:'95%',
        height:30,
        marginTop:25,
        marginBottom:40,
        marginLeft:'3%',
        flexDirection:'row',
        justifyContent:'space-between'
    }
})