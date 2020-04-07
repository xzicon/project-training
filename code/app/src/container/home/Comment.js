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
        let arr=this.props.location.pathname.split('/');
        let page1 = this.props.match.params;
        console.log(arr);
        console.log(page1['page']);
        let data = {
            accontent:document.getElementsByClassName('pinglun')[0].value,
            uid:arr[1],
            aid:arr[2],
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
        let arr=this.props.location.pathname.split('/');
        if(arr.length===6){
            var data1='/'+arr[1]+'/home/article/'+arr[2]+'/'+arr[3];
        }else{
            var data1='/'+arr[1]+'/composition/writing/'+arr[2]+'/'+arr[3];
        }
        console.log(data1);
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:data1,state2:this.props.location.state2,state:this.props.location.state,state1:this.props.location.state1,mtab2:this.props.location.mtab2}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={<Link to={{pathname:data1,state:this.props.location.state,state2:this.props.location.state2,state1:this.props.location.state1,mtab2:this.props.location.mtab2}}>
                        <input type='button' onClick={(e)=>{this.fetchComment(e)}} style={{width:'60px',height:'30px',backgroundColor:'#fff',color:'#000',borderRadius:'15%',outline:'none',border:'1px solid #da4036'}} value='发布'/>
                    </Link>}
                >写评论</NavBar>
                <div style={{float:'left'}}>
                    <List style={{top:'40px',position:'absolute',zIndex:'99',margin:'3% 2% auto',backgroundColor:'#fff',width:'96%',paddingTop:'1%'}}>
                        <textarea
                            placeholder="在此输入评论"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none',width:'98%'}}
                            className='pinglun'
                            rows={5}
                        />
                    </List>
                </div>
            </div>
        )
    }
}
