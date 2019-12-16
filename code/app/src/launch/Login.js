import React, { Component } from 'react';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import {Link} from 'react-router-dom';
import './launch.css';
export default class Login extends Component {
    fetchForm = (e)=>{
        let data = {
            uemail:document.getElementsByClassName('user')[0].value,
            upassword:document.getElementsByClassName('pwd')[0].value
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            switch (data.status) {
                case "0":{
                    console.log(data.data);
                    //登录成功
                    Toast.success('登录成功', 1);
                    this.props.history.push({pathname:'/xselect',state:data.data});
                    break;
                }
                case "1":{
                    //密码错误
                    Toast.fail('密码错误,请重新输入密码', 1);
                    console.log(data.data);
                    break;
                }
                case "2":{
                    //不存在，请注册
                    Toast.offline('账号不存在，请注册', 1);
                    break;
                }
                default:{
                    //错误，服务器
                    console.log(data.data);
                    break;
                }
            }
        })
    }

    render() {
        return (
            <div className='bg_login'> 
                <div className='form_login'>
                    <form>
                        <div className='wraper'>
                            <img src='/images/login/youxiang.png'/>
                            <input type='email' name='email' placeholder='请输入qq邮箱' required class='user'/>
                        </div>
                        <div className='wraper'>
                            <img src='/images/login/mima.png'/>
                            <input type='text' name='password' placeholder='请输入密码' required class='pwd'/>
                        </div>
                        <p>
                        <Link to='/register'><span style={{color:'black'}}>立即注册</span></Link>
                        <Link to='/forgetpwd'><span style={{float:'right',color:'black'}}>忘记密码</span></Link>
                        </p>
                        <div className='sub_btn'>
                            <input type='button' style={{color:'black'}} onClick={(e)=>{this.fetchForm(e)}} value="登录" />
                        </div>
                    </form>
                </div>        
            </div>
        )
    }
}
