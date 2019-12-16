import React, { Component } from 'react';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import {Link} from 'react-router-dom';
import './launch.css';

export default class Register extends Component {
    fetchForm = (e)=>{
        let data = {
            uemail:document.getElementsByClassName('uemail')[0].value,
            upassword:document.getElementsByClassName('upassword')[0].value
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            // mode:"cors",//跨域
            body: JSON.stringify(data)
          }).then(res=>res.json()).then(data=>{
              console.log(data);
              switch (data.status) {
                  case "2":{
                      //验证码已经发送
                    Toast.info('验证码已经发送', 1);
                    console.log(data.data);
                    
                    break;
                  }
                  case "1":{
                    console.log(data.data);
                    Toast.fail('该邮箱已被注册，请直接登录', 1);
                    this.props.history.push('/login');
                    break;
                  }
                  default:{
                    console.log(data.data);
                    break;
                  }
              }
          })
    }
    fetchForm1=(e)=>{
        let data = {
            uemail:document.getElementsByClassName('uemail')[0].value,
            code:document.getElementsByClassName('code')[0].value,
            upassword:document.getElementsByClassName('upassword')[0].value
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/register/code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            // mode:"cors",//跨域
            body: JSON.stringify(data)
          }).then(res=>res.json()).then(data=>{
              console.log(data);
              switch (data.status) {
                  case "3":{
                      //验证码已经发送
                    console.log(data.data);
                    Toast.success('注册成功', 1);
                    this.props.history.push('/login');
                    break;
                  }
                  
                  default:{
                    console.log(data.data);
                    break;
                  }
              }
          })
    }

    render() {
        return (
            <div className='bg_register'>
                <div className='form_register'>
                    <form>
                        <div className='wraper_register'>
                            <img src='/images/login/youxiang.png'/>
                            <input type='email' name='email' placeholder='请输入qq邮箱' required class='uemail'/>
                        </div>
                        <div className='wraper_register'>
                            <img src='/images/login/mima.png'/>
                            <input type='password' name='password' placeholder='请输入密码' required class='upassword'/>
                        </div>
                        <div className='wraper_register'>
                            <input type="button" value="发送验证码" id='btn' onClick={(e)=>{this.fetchForm(e)}}/>
                            <input type='text' name='code' placeholder='请输入验证码' id='btn' required  class='code'/>
                        </div>
                        <p>
                        <Link to='/login'><span style={{color:'black'}}>已有账号立即登录</span></Link>
                        <Link to='/forgetpwd'><span style={{float:'right',color:'black'}}>已有账号忘记密码</span></Link>
                        </p>
                        <div className='sub_btn2'>
                            <input type='button' style={{color:'black'}} onClick={(e)=>{this.fetchForm1(e)}} value='立即注册'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
