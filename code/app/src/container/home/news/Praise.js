import React, { Component } from 'react'
import {Icon,NavBar,List} from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Praise extends Component {
    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to='/home/news'><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                >点赞</NavBar>
                <br/>
                <div style={{top:'56px',position:'absolute',zIndex:'99',width:'100%',textAlign:'center',backgroundColor:'#fff'}}>
                    <img src="/images/home/tongzhi.png" style={{width:'30%'}}/>
                    <div style={{width:'100%',textAlign:'center'}}>这里空空如也，去看看别的</div>
                </div>
            </div>
        )
    }
}
