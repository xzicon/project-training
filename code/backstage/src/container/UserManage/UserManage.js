import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class UserManage extends Component {
    render() {
        return (
            <div style={{width:'70%',height:'25%',marginTop:'15%',marginLeft:'10%'}}>
                <Link to='/home/stus'><div className='items'>学生用户</div></Link>
                <Link to='/home/teachers'><div className='items'>教师用户</div></Link>
                <Link to='/home/system'><div className='items'>后台管理员</div></Link>
            </div>
        )
    }
}
