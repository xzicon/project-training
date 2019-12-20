import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Marticle extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        let page = this.props.location.state3;
        console.log(page);
        fetch('http://116.62.14.0:8402/article/xiangqing/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    // componentDidUpdate(){
    //     let page = this.props.location.state3;
    //     console.log(page);
    //     fetch('http://116.62.14.0:8402/article/xiangqing/'+page)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //         console.log(res.data);
    //     })
    // }
    fetchDelete = (e)=>{
        let data = {
            aid:this.props.location.state3
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/aud/delarticle', {
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
                    this.props.history.push({pathname:'/mine/write',state:this.props.location.state,state3:this.props.location.state3})
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
        return (
            <div>
                {this.state.data.map(data=>(
                    <div>
                        <NavBar
                            icon={<Link to={{pathname:'/mine/write',state1:this.props.location.state1,state:this.props.location.state,state3:this.props.location.state3}}><Icon type="left" style={{color:'#000'}}/></Link>}
                            style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                            onLeftClick={() => console.log('onLeftClick')}
                            >{data.atitle}</NavBar>
                        <div style={{marginTop:'15%',marginLeft:'3%',marginRight:'3%',marginBottom:'3%',backgroundColor:'#fff',whiteSpace:"pre-wrap",float:'left',width:'94%'}}>
                            <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%',color:'gray'}}>{data.utime}</div>
                            <h2 style={{textAlign:'center'}}>{data.atitle}</h2>
                            <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',width:'94%'}}>{data.acontent}</div>
                            <div style={{margin:'3%',float:'left',width:'94%',fontSize:'100%'}}>{data.atag}</div><br/>
                            {data.aimage===''?<div></div>:<div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'94%'}}><img src={'http://116.62.14.0:8402/images/'+data.aimage} style={{width:'100%',height:'150px',marginTop:'1%',float:'left',backgroundPosition:'cover'}} /></div>}
                            <div style={{float:'left',width:'100%',paddingBottom:'3%'}}>
                                <input type='button' onClick={(e)=>{this.fetchDelete(e)}}  style={{width:'60px',height:'30px',color:'#000',border:'none',backgroundColor:'#fff',border:'1px solid #da4036',borderRadius:'15%',float:'right',marginRight:'5%'}} value='删除' class='delete'/>
                                <Link to={{pathname:'/mine/edit',state3:data.aid,atitle1:data.atitle,acontent1:data.acontent,atag1:data.atag,state:this.props.location.state,aimge:data.aimge}}><input type='button' style={{width:'60px',height:'30px',color:'#000',border:'none',backgroundColor:'#fff',borderRadius:'15%',border:'1px solid #da4036',float:'right',marginRight:'8%'}} value='编辑' class='edit'/></Link>
                                
                            </div>
                        </div>
                        
                        
                    </div>
                ))}
            </div>
        )
    }
}
