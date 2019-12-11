import React, { Component } from 'react'
import {Icon,NavBar,List} from 'antd-mobile';
import {Link} from 'react-router-dom';
const Item = List.Item;
export default class News extends Component {
    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to='/home'><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                >消息通知</NavBar>
                <div style={{top:'40px',position:'absolute',zIndex:'99',margin:'2% 0% auto',width:'100%'}}>
                    <Link to='/home/praise'>
                    <List>
                        <Item arrow="horizontal" multipleLine>
                            <img src="/images/home/zan1.png" />    点赞
                        </Item>
                    </List>
                    </Link>
                    <div style={{backgroundColor:'#fff',width:'100%',fontSize:'17px',margin:'2% 0% auto',padding:'2% 2%'}}>
                        <img src="/images/home/pinglun1.png" />  回复列表
                        <br/>
                        <div style={{width:'100%',textAlign:'center'}}>
                            <img src="/images/home/tongzhi.png" style={{width:'30%'}}/>
                            <div style={{width:'100%',textAlign:'center'}}>暂无消息通知</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
