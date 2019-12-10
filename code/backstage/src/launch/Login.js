import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './launch.css';
export default class Login extends Component {
    render() {
        return (
            <div className='bg_login'> 
                <div className='form_login'>
                    <form>
                        <div className='wraper'>
                            <img src='/images/appstart/phone.png' alt='phone'/>
                            <input type='text' name='phone' placeholder='请输入注册手机号' required/>
                        </div>
                        <div className='wraper'>
                            <img src='/images/appstart/pwd.png' alt='password'/>
                            <input type='text' name='password' placeholder='请输入密码' required/>
                        </div>
                        <p>
                        <Link to='/register'><span style={{color:'black'}}>立即注册</span></Link>
                        <Link to='/forgetpwd'><span style={{float:'right',color:'black'}}>忘记密码</span></Link>
                        </p>
                        <div className='sub_btn'>
                            <Link to='/tab'><button type='submit' style={{color:'black'}}>立即登录</button></Link>
                            {/* <button type='submit' style={{color:'black'}}>立即登录</button> */}
                        </div>
                    </form>
                </div>        
            </div>
        )
    }
}
