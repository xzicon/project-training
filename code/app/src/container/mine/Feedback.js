import React, { Component } from 'react'
import {NavBar,Icon,TextareaItem,List, Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';
var date = new Date();
var Y = date.getFullYear() + '-';
var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
var D = date.getDate()+' ';
var h = date.getHours() + ':';
var m = date.getMinutes();
export default class Feedback extends Component {
    fetchFeedback = (e)=>{
        let arr=this.props.location.pathname.split('/');
        let data = {
            fcontent:document.getElementsByClassName('fankui')[0].value,
            ftime:Y+M+D+h+m,
            uid:arr[1]
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            switch (data.status) {
                case "0":{
                    console.log(data.data);
                    Toast.success('反馈成功');
                    this.props.history.push({pathname:'/'+arr[1]+'/mine',state:this.props.location.state})
                    break;
                }
                default:{
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    render() {
        let arr=this.props.location.pathname.split('/');
        return (
            <div>
                <NavBar
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    leftContent={<Link to={{pathname:'/'+arr[1]+'/mine',state:this.props.location.state}}>
                        <p style={{color:'#000'}}>取消</p>
                    </Link>}
                    rightContent={
                        <input type='button' onClick={(e)=>{this.fetchFeedback(e)}} style={{backgroundColor:'#fff',color:'#000',outline:'none',border:'1px solid #da4036',width:'70px',height:'30px',borderRadius:'15%'}} value='反馈'/>
                    }
                ></NavBar>
                <div>
                    <List style={{whiteSpace:"pre-wrap",top:'40px',position:'absolute',zIndex:'99',margin:'2% 2% auto',backgroundColor:'#fff',width:'96%'}}>
                        <textarea
                            placeholder="请输入反馈内容"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none',width:'100%'}}
                            className='fankui'
                            type='text'
                            rows={15}
                        />
                    </List>
                </div>
            </div>
        )
    }
}
