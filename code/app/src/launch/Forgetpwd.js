import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
export default class Forgetpwd extends Component {
    fetchForm1 = (e)=>{
        let data = {
            uemail:document.getElementsByClassName('user1')[0].value,
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/register/forget', {
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
                case "1":{
                    console.log(data.data);
                    Toast.fail('该邮箱没有注册，请先去注册',1);
                    break;
                }
                case "2":{
                    Toast.success('发送成功', 1);
                    console.log(data.data);
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

            fetchForm2 = (e)=>{
                let data = {
                    uemail:document.getElementsByClassName('user1')[0].value,
                    code:document.getElementsByClassName('code')[0].value
                }
                console.log(data);
                fetch('http://116.62.14.0:8402/register/forgetcode', {
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
                    Toast.success('验证码验证成功', 1);
                    this.props.history.push({pathname:'/modify',state:document.getElementsByClassName('user1')[0].value});
                    break;
                }
                case "1":{
                    Toast.fail('验证码错误，请重新输入',1);
                    console.log(data.data);
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
            <div className='reset_pwd'>
                <div className='form_resetpwd'>
                    <form>
                        <div className='wraper_resetpwd'>
                            <img src='/images/login/youxiang.png'/>
                            <input type='text' name='email' placeholder='请输入注册的qq邮箱' required class='user1'/>
                        </div>
                        <div className='wraper_register'>
                            <input type="button" value="发送验证码" id='btn' onClick={(e)=>{this.fetchForm1(e)}}/>
                            <input type='password' name='code' placeholder='请输入验证码' id='btn' required  class='code'/>
                        </div>
                        <p>
                        <Link to='/register'><span style={{color:'black'}}>没有账号去注册</span></Link>
                        <Link to='/login'><span style={{float:'right',color:'black'}}>知道密码去登录</span></Link>
                        </p>
                        <div className='sub_btn2'>
                            <input type='button' style={{color:'black'}} onClick={(e)=>{this.fetchForm2(e)}} value='验证验证码'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
