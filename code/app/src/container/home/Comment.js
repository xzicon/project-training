import React, { Component } from 'react'
import {NavBar,Icon,TextareaItem,List} from 'antd-mobile';
import {Link} from 'react-router-dom';
var date = new Date();
var Y = date.getFullYear() + '-';
var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
var D = (date.getDate()<10 ? '0'+(date.getDate()) : date.getDate())+' ';
var h = (date.getHours()<10 ? '0'+(date.getHours()) : date.getHours()) + ':';
var m = (date.getMinutes()<10 ? '0'+(date.getMinutes()) : date.getMinutes());
export default class Comment extends Component {
    fetchComment=(e)=>{
        let data = {
            accontent:document.getElementsByClassName('pinglun')[0].value,
            uid:this.props.location.state,
            aid:this.props.location.state1,
            actime:Y+M+D+h+m
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/comment/addarticle ', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json()).then(data=>{
              console.log(data);
          })
    }
    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/home/article/'+this.props.location.state1,state:this.props.location.state,state1:this.props.location.state1}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={<Link to={{pathname:'/home/article/'+this.props.location.state1,state:this.props.location.state,state1:this.props.location.state1}}>
                        <input type='button' onClick={(e)=>{this.fetchComment(e)}} style={{color:'#000'}} value='发布'/>
                    </Link>}
                >写评论</NavBar>
                <div>
                    <List style={{top:'40px',position:'absolute',zIndex:'99',margin:'2% 2% auto',backgroundColor:'#fff',height:'100px',width:'96%'}}>
                        <textarea
                            placeholder="在此输入评论"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none'}}
                            className='pinglun'
                        />
                    </List>
                </div>
            </div>
        )
    }
}
