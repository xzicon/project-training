import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar,Flex, Toast} from 'antd-mobile';
export default class Fans extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        // let page=this.props.location.state;
        // console.log(page);
        let arr=this.props.location.pathname.split('/');
        fetch('http://116.62.14.0:8402/login/fans/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(){
        // let page=this.props.location.state;
        // console.log(page);
        let arr=this.props.location.pathname.split('/');
        fetch('http://116.62.14.0:8402/login/fans/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchConcern = (e)=>{
        let arr=this.props.location.pathname.split('/');
        let item = e.target.parentNode.parentNode;
        console.log(item);
        console.log(item.children[0].innerHTML);
        let obj = {upid:item.children[0].innerHTML}
        console.log(item.children[1].innerHTML);
        let obj1 = {guanzhu:item.children[1].innerHTML}
        let data = {
            uid:arr[1],
            upid:obj.upid
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/login/userconcern', {
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
                    // obj1.guanzhu ===null ? e.target.value='关注' : e.target.value='已关注';
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
        console.log(this.state.data.length);
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/'+arr[1]+'/mine',state1:this.props.location.state1,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>我的粉丝</NavBar>
                    
                    <div style={{width:'100%',position:'absolute',top:'50px',fontSize:'16px'}}>
                {this.state.data.length!==0?this.state.data.map(data=>(
                    <div>
                        <div style={{width:'96%',height:'80px',backgroundColor:'#fff',padding:'2% 2%',marginBottom:'2%'}}>
                            <div style={{width:'0',display:'none'}}>{data.uid}</div>
                            <div style={{width:'0',display:'none'}}>{data.guanzhu}</div>
                            <div style={{width:'70%',float:'left',marginTop:'1%'}}>
                                    <img src={`http://116.62.14.0:8402/images/${data.uimage}`} style={{width:'55px',height:'55px',borderRadius:'50%',float:'left'}}/>
                                    <div style={{width:'70%',float:'left'}}>
                                        <div style={{float:'left',fontSize:'110%',paddingTop:'3%',paddingLeft:'8%',width:'100%'}}>{data.uname}</div>
                                        <div style={{float:'left',fontSize:'90%',paddingTop:'3%',paddingLeft:'5%',width:'100%'}}>简介：{data.udescribe}</div>
                                    </div>
                                   
                            </div>
                            {data.guanzhu===null ?<div style={{width:'30%',float:'left',marginTop:'5%'}}><input type='button' onClick={(e)=>{this.fetchConcern(e)}} class='follow' value='关注' style={{width:'80px',height:'40px',borderRadius:'20%',backgroundColor:'#fff'}} /></div>:<div style={{width:'30%',float:'left',marginTop:'5%'}}><input type='button' onClick={(e)=>{this.fetchConcern(e)}} class='follow' value='已关注' style={{width:'80px',height:'40px',borderRadius:'20%',backgroundColor:'#fff'}} /></div>}
                        </div>
                    </div>
                    )):<div style={{height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'120%',marginLeft:'3%'}}>你还没有粉丝哦~  </div>                }
                </div>
                
            </div>
        )
    }
}
