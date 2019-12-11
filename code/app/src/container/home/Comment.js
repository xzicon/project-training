import React, { Component } from 'react'
import {NavBar,Icon,TextareaItem,List} from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Comment extends Component {
    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to='/home/article'><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={<Link to='/home/article'>
                        <p style={{color:'#000'}}>发布</p>
                    </Link>}
                >写评论</NavBar>
                <div>
                    <List style={{top:'40px',position:'absolute',zIndex:'99',margin:'2% 2% auto',backgroundColor:'#fff',height:'100px',width:'96%'}}>
                        <TextareaItem
                            placeholder="在此输入评论"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none'}}
                        />
                    </List>
                </div>
            </div>
        )
    }
}
