import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

const items=[
    {
        title:'账号管理',
        key:'1'
    },
    {
        title:'账号安全',
        key:'2'
    },
    {
        title:'通用',
        key:'3'
    },
    {
        title:'缓存清理',
        key:'4'
    },
    {
        title:'关于简眠',
        key:'5'
    },
    {
        title:'帮助反馈',
        key:'6'
    }
];

export default class Mysettings extends Component {
    render() {
        return (
            <div>
                <div>
                <NavBar
                    icon={<Link to='mysettings'><Icon type="left" /></Link>}
                    style={{backgroundColor:'rgb(231, 231, 231)',color:'#000',borderBottom:'1px solid gray'}}
                    onLeftClick={() => console.log('onLeftClick')}
                >设置</NavBar>
                </div>
                <div>
                    {
                        items.map((item)=>(
                            <div key={item.key} style={{width:'100%',height:'45px',fontSize:'16px',borderBottom:'1px solid gray',padding:'0 0 0 5%',lineHeight:'45px'}}>
                                {item.title}
                                <img src='/images/my/go.png' style={{width:'25px',height:'25px',float:'right',margin:'2% 7% 0 0',}}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
