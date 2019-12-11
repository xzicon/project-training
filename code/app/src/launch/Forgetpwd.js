import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
                    
                    break;
                }
                case "2":{
                    
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
                    this.props.history.push({pathname:'/modify',state:document.getElementsByClassName('user1')[0].value});
                    break;
                }
                case "1":{
                    
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
                        <div className='sub_btn2'>
                            <input type='button' style={{color:'black'}} onClick={(e)=>{this.fetchForm2(e)}} value='验证验证码'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
