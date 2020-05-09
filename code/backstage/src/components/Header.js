import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <span style={{float:'left',fontSize:'28px',color:'#fff',lineHeight:'65px',marginLeft:'30px'}}>
                    妙笔作文后台管理系统
                </span>
                <Link to='/home/message'>
                    <span style={{float:'right',fontSize:'16px',color:'#fff',lineHeight:'65px',marginRight:'30px'}}>消息管理</span>
                    <img src='./images/msg.png' style={{position:'absolute',width:'25px',height:'25px',right:'100px',top:'20px',color:'#fff'}}/>
                </Link>
            </div>
        )
    }
}
