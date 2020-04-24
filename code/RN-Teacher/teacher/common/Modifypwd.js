import React, {Component} from 'react';
import {View,Text,Image,TextInput,AsyncStorage,Dimensions,TouchableOpacity, StyleSheet, ImageBackground, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Fontisto';
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Modify extends Component {
    constructor(props){
        super(props);
        this.state = {
            temail:this.props.temail,
            tpassword:'',
            tpassword_again:'',
        }
    }
    pwdhandle = (text)=>{
        this.setState({tpassword:text})
    }
    pwdhandle_again = (text)=>{
        this.setState({tpassword_again:text})
    }
    updatepwd = ()=>{
        if(this.state.pwdhandle!==this.state.pwdhandle_again){
            ToastAndroid.show('两次输入不一致')
        }else{
            let data = {
                temail:this.state.temail,
                tpassword:this.state.tpassword_again
            }
            fetch('http://116.62.14.0:8402/teacher/register/pwd', {
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
                        ToastAndroid.show('设置成功，去登录吧', 100);
                        Actions.login();
                        break;
                    }
                    case "-2":{
                        ToastAndroid.show('邮箱不存在哦', 100);
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
                    source={require('../../assets/bg8.png')}
                    style={{width:'100%',height:'100%'}}
                >
                    <View style={styles.form_modify}>
                        <View style={styles.form}>
                            <View style={styles.wraper}>
                            <Icon name="lock" color="gray"  size={40*s}/>
                                <TextInput placeholder='请输入新密码' placeholderTextColor="gray"
                                    style={{
                                        borderBottomColor:'#ccc',
                                        borderBottomWidth:1,
                                        width:260,
                                        marginLeft:10
                                    }}
                                    onChangeText = {this.pwdhandle}
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.wraper}>
                                <Icon name="lock" color="gray"  size={40*s}/>
                                <TextInput placeholder='再一次输入新密码' placeholderTextColor="gray"
                                    style={{
                                        borderBottomColor:'#ccc',
                                        borderBottomWidth:1,
                                        width:260,
                                        marginLeft:10
                                    }}
                                    onChangeText = {this.pwdhandle_again}
                                    secureTextEntry={true}
                                />
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
                                onPress={this.updatepwd}>
                                    <Text>设置密码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    form_modify:{
        position:'absolute',
        top:200,
        left:0,
        width:'100%',
        height:300
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
    }
})