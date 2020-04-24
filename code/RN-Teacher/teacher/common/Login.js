import React, {Component} from 'react';
import { View, Text, ImageBackground,Image, TextInput, Dimensions, AsyncStorage , TouchableOpacity , BackHandler , ToastAndroid , Alert,StyleSheet, Modal }  from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            pwd:'',
            isLoading:false,
            now:0
        }
    }
    emailhandle = (text)=>{
      this.setState({email:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    handleLogin=()=>{
      
      if(this.state.email !='' && this.state.pwd != ''){
        let data = {
          temail:this.state.email,
          tpassword:this.state.pwd
        }
        this.setState({isLoading:true});
        fetch('http://116.62.14.0:8402/teacher/login',{
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
                  console.log(data.data);
                  AsyncStorage.setItem('tid',JSON.stringify(data.data))
                  .then(()=>{
                      console.log('1111'+data.data);
                      setTimeout(()=>{
                        ToastAndroid.show("登录成功",100);
                        this.setState({
                          isLoading:false
                        })
                        //Actions.HomePage();
                        Actions.noessay();
                      },200)  
                  })
                  break;
              }
              case "1":{
                  this.setState({isLoading:false});
                  ToastAndroid.show("密码错误，请重新输入",100);
                  break;
              }
              case "-2":{
                this.setState({isLoading:false});
                  ToastAndroid.show("账号不存在，请先注册",100);
                  break;
              }
              default:{
                  break;
              }
          }
      })
      }else{
        ToastAndroid.show('登录邮箱和密码均不能为空！',100)
      }
    }
    _change=()=>{
      this.setState({
        isLoading:false
      })
    }
    
  render() {
    BackHandler.addEventListener('back',()=>{
      if(Actions.currentScene==='login'){
        if(new Date().getTime()-this.state.now <2000){
          BackHandler.exitApp()
          return false;
        }else{
          ToastAndroid.show('再按一次退出',ToastAndroid.SHORT);
          this.state.now =new Date().getTime();
          return true;
        }
      }else {
        if(Actions.currentScene !== 'home' && Actions.currentScene !== 'login'){
          Actions.pop();
          return true;
        }else{
          if(new Date().getTime()-this.state.now <2000){
            BackHandler.exitApp();
            return false;
          }else{
            ToastAndroid.show('确定要退出吗',ToastAndroid.SHORT);
            this.state.now =new Date().getTime();
            return true;
          }
        }
      }
    });
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <ImageBackground 
          source={require('../../assets/bg8.png')} 
          style={{width: '100%', height: '100%'}}>
              <Modal
                style={styles.container}
                animationType='silde'
                onRequestClose={this._change}//安卓必须设置
                transparent={true}
                visible={this.state.isLoading}
              >
                <View style={styles.cover}>
                
                  <View style={{marginTop:100*s,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Icon2 name='loader' size={40*s}/>
                    <Text>
                      正在登录……
                    </Text>
                  </View> 
                </View>
              </Modal>

            <View style={styles.form_login}>
                <View style={styles.form}>
                    <View style={styles.wraper}>
                        <Icon1 name="email" color="gray" size={40*s}/>
                        <TextInput placeholder='请输入登录邮箱' placeholderTextColor="gray"
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
                    <View style={styles.tips}>
                        <Text onPress={()=>Actions.register()}>立即注册</Text>
                        <Text onPress={()=>Actions.forgetpwd()}>忘记密码</Text>
                    </View>
                    {this.state.isLoading
                      ? 
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
                            backgroundColor:'#ccc'
                        }}
                        >
                        <Text>正在登录……</Text>
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
                            marginLeft:'5%',
                            backgroundColor:'#f23030'
                        }}
                        onPress={this.handleLogin}>
                        <Text>登录</Text>
                      </TouchableOpacity>
                    }
    
                  </View>
                </View>
            </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  form_login:{
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
  },
  tips:{
      width:'90%',
      height:30,
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:40,
      marginLeft:'5%'
  },
  input:{
      borderBottomColor:'#ccc',
      borderBottomWidth:1,
      width:260,
      marginLeft:10
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
})