import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <p style={{fontSize:'30px',color:'#fff',lineHeight:'60px',marginLeft:'20px'}}>
                    后台管理系统
                </p>
            </div>
        )
    }
}
