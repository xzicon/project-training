import React, { Component } from 'react'
import {View, Text, Image, TextInput, AsyncStorage,TouchableOpacity,Dimensions, ToastAndroid,BackHandler,StyleSheet,ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Fontisto';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Register extends Component {
    constructor() {
      super();
      this.state = {
        temail:'',
        tcode:'',
        isloading: false,
        issend:false,
        cannot:false
      }
    }
    emailhandle = (text)=>{
      this.setState({temail:text})
    }
    codehandle = (text)=>{
      this.setState({tcode:text})
    }
    sendCode = ()=>{
        if(this.state.temail===''){
            ToastAndroid.show('邮箱不能为空',ToastAndroid.SHORT)
        }else{
            let data = {
                temail:this.state.temail
            }
            var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
            if(!data.temail.match(reg)){
                ToastAndroid.show('邮箱格式不正确',100)
            }else{
                fetch('http://116.62.14.0:8402/teacher/register',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data.status)
                    switch(data.status){
                        case "0":{
                            this.setState({
                                issend:true,
                                cannot:true
                            })
                            ToastAndroid.show("验证码已发送",100);
                            break;
                        }
                        case "1":{
                            this.setState({
                                issend:false
                            })
                            ToastAndroid.show("该邮箱已经被注册",100);
                            break;
                        }
                        case "-2":{
                            this.setState({
                                issend:false
                            })
                            ToastAndroid.show("发送验证码失败",100);
                            break;
                        }
                        default:{
                            break;
                        }
                    }
                })
            }
        }
    }
  registerhandle=()=>{
      if(this.state.temail===''&&this.state.tcode===''){
        ToastAndroid.show('邮箱不能为空',ToastAndroid.SHORT)
      }else if(this.state.tcode===''){
        ToastAndroid.show('验证码不能为空',ToastAndroid.SHORT)
      }else if(this.state.temail===''){
        ToastAndroid.show('邮箱不能为空',ToastAndroid.SHORT)
      }
      else{
          let data = {
            temail:this.state.temail,
            tcode:this.state.tcode 
          }
          this.setState({
            isloading: true
          })
          fetch('http://116.62.14.0:8402/teacher/register/code', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res=>res.json()).then(data=>{
                console.log(data);
                switch (data.status) {
                    case "0":{
                        this.setState({
                          isloading:false
                        })
                        ToastAndroid.show('验证码正确，邮箱验证成功', 100);
                        Actions.setpwd({temail:this.state.temail});
                        //Actions.login();
                        break;
                    }
                    case "1":{
                        this.setState({
                          isloading:false
                        })
                        ToastAndroid.show('验证码错误，请重新验证', 100);
                        break;
                    }
                    case "-2":{
                        this.setState({
                          isloading:false
                        })
                        ToastAndroid.show('邮箱输错了吧', 100);
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
        <View style={{flex: 1,justifyContent: 'center'}}>
          <ImageBackground
                    source={require('../../assets/bg8.png')}
                    style={{width: '100%', height: '100%'}}
                >
                    <View style={styles.form_register}>
                        <View style={styles.form}>
                            <View style={styles.wraper}>
                                <Icon1 name="email" color="gray" size={40*s}/>
                                <TextInput placeholder="请输入邮箱地址" placeholderTextColor='gray'
                                    style={styles.input}
                                    onChangeText={this.emailhandle}
                                />
                            </View>
                            
                            <View style={{flexDirection:'row'}}>
                              {
                                this.state.issend?
                                <TouchableOpacity 
                                style={{
                                    width: '35%',
                                    height: 40,
                                    borderWidth:1,
                                    backgroundColor:'#ccc',
                                    borderColor:'#ccc',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: '5%'
                                }}
                                >
                                    <Text>验证码已发送</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity 
                                style={{
                                    width: '35%',
                                    height: 40,
                                    borderWidth:1,
                                    backgroundColor:'#ccc',
                                    borderColor:'#ccc',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: '5%'
                                }}
                                onPress={this.sendCode}>
                                    <Text>发送验证码</Text>
                                </TouchableOpacity>
                              }
                               
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
                                <Text onPress={()=>Actions.login()}>已有账号 立即登录</Text>
                            </View>
                            {
                              this.state.isloading?
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
                                >
                                    <Text>正在验证……</Text>
                              </TouchableOpacity>
                              :
                            //   (
                            //     this.state.cannot?
                                <TouchableOpacity 
                                    style={{
                                        width: '90%',
                                        height: 40,
                                        opacity:0.8,
                                        borderWidth:1,
                                        borderColor:'#ccc',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft:'5%',
                                        backgroundColor:'red'
                                    }}
                                    onPress={this.registerhandle}>
                                        <Text>立即验证</Text>
                                </TouchableOpacity>
                            //     :
                            //     <View 
                            //         style={{
                            //             width: '90%',
                            //             height: 40,
                            //             opacity:0.8,
                            //             borderWidth:1,
                            //             borderColor:'#ccc',
                            //             alignItems: 'center',
                            //             justifyContent: 'center',
                            //             marginLeft:'5%',
                            //             backgroundColor:'grey'
                            //         }}
                            //         >
                            //             <Text>立即验证</Text>
                            //         </View>
                                
                            //   )
                              
                            }
                            
                        </View>
                    </View>
                </ImageBackground>

      </View>
        )
    }
}
const styles = StyleSheet.create({
  form_register:{
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
      width:'90%',
      height:30,
      marginTop:25,
      marginBottom:40,
      marginLeft:'5%'
  },
  input:{
      borderBottomColor:'#ccc',
      borderBottomWidth:1,
      width:260,
      marginLeft:10
  }
})
