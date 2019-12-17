import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <span style={{float:'left',fontSize:'28px',color:'#fff',lineHeight:'65px',marginLeft:'30px'}}>
                    妙笔作文后台管理系统
                </span>
            </div>
        )
    }
}
