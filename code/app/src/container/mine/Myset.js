import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar,Icon,Tabs,WhiteSpace } from 'antd-mobile';
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
        title:'清除缓存',
        key:'4'
    },
    {
        title:'检查更新',
        key:'5'
    },
    
];
export default class Myset extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }

    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/mine',state1:this.props.location.state1,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>设置</NavBar>

                <div style={{backgroundColor:'#fff',marginTop:'13%',float:'left',width:'100%'}}> 
                    {
                        items.map((item)=>(
                            <div key={item.key} style={{width:'100%',height:'50px',fontSize:'115%',borderBottom:'1px solid gray',padding:'0 0 0 5%',lineHeight:'45px'}}>
                                {item.title}
                                <img src='/images/write/right.png' style={{width:'6%',height:'40%',float:'right',margin:'3% 7% 0 0',}}/>
                            </div>
                        ))
                    }
                </div>

                <div style={{float:'left',marginTop:'8%',width:'100%'}}>
                    {/* <Link to='/'><button style={{width:'50%',height:'50px',backgroundColor:'red',color:'#fff',border:'none',outline:'none',borderRadius:'8%',fontSize:'125%',marginLeft:'25%'}}>退出登录</button></Link> */}
                    <Link to='/'><div style={{width:'100%',height:'50px',backgroundColor:'#fff',color:'#000',border:'none',outline:'none',borderRadius:'8%',fontSize:'125%',textAlign:'center',lineHeight:'50px'}}>退出登录</div></Link>
                </div>
            </div>
        )
    }
}
