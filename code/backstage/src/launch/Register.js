import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './launch.css';

export default class Register extends Component {
    render() {
        return (
            <div className='bg_register'>
                <div className='form_register'>
                    <form>
                        <div className='wraper_register'>
                            <img src='/images/appstart/phone.png' alt='phone'/>
                            <input type='text' name='phone' placeholder='请输入您的手机号码' required/>
                        </div>
                        <div className='wraper_register'>
                            <img src='/images/appstart/sure.png' alt='phone'/>
                            <input type='text' name='phone' placeholder='请输入您的密码' required/>
                        </div>
                        <div className='wraper_register'>
                            <img src='/images/appstart/pwd.png' alt='password'/>
                            <input type='text' name='password' placeholder='请再次确认密码' required/>
                        </div>
                        <div className='sub_btn2'>
                            <Link to='/login'><button type='submit' style={{color:'black'}}>立即注册</button></Link>
                            <p>
                            <input name='agree' type="checkbox"/><label>我已阅读并同意<span style={{color:'blue'}}>简眠服务声明</span></label>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
