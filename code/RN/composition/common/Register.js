import React, { Component } from 'react'
import {View, Text, Image, TextInput, AsyncStorage,TouchableOpacity,Dimensions, ToastAndroid,BackHandler,StyleSheet,ImageBackground} from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Fontisto';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Register extends Component {
    constructor() {
      super();
      this.state = {
        uemail:'',
        upwd:'',
        upwd2:'',
        code:'',
        isloading: false,
        issend:false
      }
    }
    emailhandle = (text)=>{
      this.setState({uemail:text})
    }
    pwdhandle = (text) => {
      this.setState({ upwd: text })
    }
    pwdhandle2 = (text) => {
      this.setState({ pwd2: text })
    }
    codehandle = (text)=>{
      this.setState({code:text})
    }
    sendCode = ()=>{
      if(this.state.uemail===''||this.state.upwd===''){
        ToastAndroid.show('邮箱密码不能为空',ToastAndroid.SHORT)
      }else{
      let data = {
          uemail:this.state.uemail,
          upassword:this.state.upwd    
      }
      var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
      if(!data.uemail.match(reg)){
          ToastAndroid.show('邮箱格式不正确',100)
      }else if(data.upassword===''){
          ToastAndroid.show('密码错误',100)
      }else{
          fetch('http://116.62.14.0:8402/register',{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(data)
          })
          .then(res=>res.json())
          .then(data=>{
              console.log(data);
              switch(data.status){
                  case "2":{
                    this.setState({
                      issend:true
                    })
                      ToastAndroid.show("验证码已发送",100);
                      break;
                  }
                  case "1":{
                    this.setState({
                      issend:false
                    })
                      ToastAndroid.show("该邮箱已被注册",100);
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
      if(this.state.uemail===''||this.state.upwd===''){
        ToastAndroid.show('邮箱密码不能为空',ToastAndroid.SHORT)
      }else{
        if(this.state.pwd!==this.state.pwd2){
          ToastAndroid.show('两次密码输入不一致',ToastAndroid.SHORT)
        }else{
          let data = {
            uemail:this.state.uemail,
            upassword:this.state.upwd,
            code:this.state.code 
          }
          this.setState({
            isloading: true
          })
          fetch('http://116.62.14.0:8402/register/code', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res=>res.json()).then(data=>{
                console.log(data);
                switch (data.status) {
                    case "3":{
                        this.setState({
                          isloading:false
                        })
                        ToastAndroid.show('注册成功', 100);
                        Actions.login();
                        break;
                    }
                    default:{
                        break;
                    }
                }
            })
          // myFetch.post('/register',{username:this.state.username,pwd:this.state.pwd})
          // .then(res=>{
          //   if(res.data.state==='1'){
          //     this.setState({
          //       isloading:false
          //     })
          //     ToastAndroid.show('该手机号已被注册',ToastAndroid.SHORT)
          //   }else{
          //     AsyncStorage.setItem('register',JSON.stringify(res.data))
          //     .then(()=>{
          //         this.setState({
          //             isloading:false
          //         })
          //         ToastAndroid.show('注册成功',ToastAndroid.SHORT);          
          //         Actions.login();
          //     })
          //   }
          // });
        }
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
                            <View style={styles.wraper}>
                                <Icon name="lock" color="gray" size={40*s}/>
                                <TextInput placeholder='请输入密码' placeholderTextColor="gray"
                                    style={styles.input}
                                    onChangeText={this.pwdhandle}
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
                                onPress={this.sendCode}>
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
                                onPress={this.registerhandle}>
                                    <Text>正在注册……</Text>
                              </TouchableOpacity>
                              :
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
                                onPress={this.registerhandle}>
                                    <Text>立即注册</Text>
                              </TouchableOpacity>
                            }
                            
                        </View>
                    </View>
                </ImageBackground>
         {/* <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请输入注册手机号"
                onChangeText={this.userhandle}
            />
          </View>
          
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请输入密码" 
                onChangeText={this.pwdhandle}
                secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请再次输入密码" 
                onChangeText={this.pwdhandle2}
                secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
              style={{width:'80%'}}
              onPress={()=>Actions.login()}
            >
              <Text style={{marginLeft:'65%'}}>有账号？去登录</Text>
          </TouchableOpacity>
          {
              this.state.isloading
                ? 
                <TouchableOpacity 
                  style={{
                      width: '80%',
                      height: 40,
                      backgroundColor: '#ccc',
                      marginTop: 30,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  >
                  <Text>正在注册……</Text>
                </TouchableOpacity>
                : 
                <TouchableOpacity 
                  style={{
                      width: '80%',
                      height: 40,
                      backgroundColor: '#f23030',
                      marginTop: 30,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  onPress={this.register}>
                  <Text style={{color:'#ffffff'}}>注册</Text>
                </TouchableOpacity>
            }
        </View> */}
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
