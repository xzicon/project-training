import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    fetchForm = (e)=>{
        let msg = {
            maname:document.getElementById('username').value,
            mapassword:document.getElementById('pwd').value
        }
        // console.log(msg);
        fetch('http://116.62.14.0:8402/loginback',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(msg)
        }).then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
            switch(data.status){
                case '0':
                    console.log('登陆成功！');
                    this.props.history.push('/home');
                    break;
                case '1':
                    alert('密码输入错误');
                    document.getElementById('pwd').value='';
                    break;
                case '2':
                    alert('用户不存在');
                    break;
                default:
                    break;
            }
        })
    }
    render() {
        return (
            <div style={{width:'100%',height:'500px',float:'left'}}>
                <div className='login_form'>
                <form>
                    <div className='item'>
                        <img src='./images/user.png' alt=''/>
                        <input type='text' placeholder='请输入用户名' id='username'/>
                    </div>
                    <div className='item'>
                        <img src='./images/pwd.png' alt=''/>
                        <input type='password' placeholder='请输入密码' id='pwd'/>
                    </div>
                    <Link to='/forgetpwd'>
                        <p style={{float:'right',color:'black'}}>忘记密码</p>
                    </Link>
                    <button className='login_btn' type='button' onClick={(e)=>{this.fetchForm(e)}}>登录</button>
                </form>
                </div>
            </div>
        )
    }
}
