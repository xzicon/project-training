import React, { Component } from 'react'
import {NavBar,Icon,TextareaItem,List} from 'antd-mobile';
import {Link} from 'react-router-dom';
var date = new Date();
var Y = date.getFullYear() + '-';
var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
var D = (date.getDate()<10 ? '0'+(date.getDate()) : date.getDate())+' ';
var h = (date.getHours()<10 ? '0'+(date.getHours()) : date.getHours()) + ':';
var m = (date.getMinutes()<10 ? '0'+(date.getMinutes()) : date.getMinutes());
export default class Lcomment extends Component {
    fetchComment=(e)=>{
        let arr=this.props.location.pathname.split('/');
        let data = {
            mccontent:document.getElementsByClassName('pinglun')[0].value,
            uid:arr[1],
            mid:arr[2],
            mctime:Y+M+D+h+m
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/comment/addmaterial', {
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
        console.log(arr.length);
        if(arr.length===4){
            var data1='/'+arr[1]+'/'+arr[2]+'/composition/sdetails/'+arr[2];
        }else if(arr.length===5){
            var data1='/'+arr[1]+'/'+arr[2]+'/composition/label/s/sdetails/'+arr[2];
        }
        else{
            var data1='/'+arr[1]+'/'+arr[2]+'/composition/mdetails/'+arr[2];
        }
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:data1,state:this.props.location.state,mtab2:this.props.location.mtab2}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={<Link to={{pathname:data1,state:this.props.location.state,mtab2:this.props.location.mtab2}}>
                        <input type='button' onClick={(e)=>{this.fetchComment(e)}} style={{color:'#000'}} style={{width:'60px',height:'30px',backgroundColor:'#fff',color:'#000',borderRadius:'15%',outline:'none',border:'1px solid #da4036'}} value='发布'/>
                    </Link>}
                >写评论</NavBar>
                <div style={{float:'left'}}>
                    <List style={{top:'40px',position:'absolute',zIndex:'99',margin:'3% 2% auto',backgroundColor:'#fff',width:'96%',paddingTop:'2%',paddingBottom:'2%'}}>
                        <textarea
                            placeholder="在此输入评论"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none',width:'96%',marginTop:'3%',marginLeft:'1.5%'}}
                            className='pinglun'
                            rows={5}
                        />
                    </List>
                </div>
            </div>
        )
    }
}
