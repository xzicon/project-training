import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Forgetpwd extends Component {
    render() {
        return (
            <div className='reset_pwd'>
                <div className='form_resetpwd'>
                    <form>
                        <div className='wraper_resetpwd'>
                            <img src='/images/appstart/phone.png' alt='phone'/>
                            <input type='text' name='phone' placeholder='请输入注册手机号' required/>
                        </div>
                        <div className='wraper_resetpwd'>
                            <img src='/images/appstart/pwd.png' alt='password'/>
                            <input type='text' name='password' placeholder='请输入新的密码' required/>
                        </div>
                        <div className='sub_btn'>
                            <Link to='/login'><button type='submit' style={{color:'black'}}>保存</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
