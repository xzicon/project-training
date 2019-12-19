import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import {Link,Route,NavLink,Redirect} from 'react-router-dom';

export default class Mword extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        
    }
    componentDidMount(){
        let mtab2 = this.props.location.mtab2;
        let id = this.props.location.search.split('=')[1] ? '':'new/';

        console.log(mtab2,id);
        fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/'+id+mtab2)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            let mtab2 = this.props.location.mtab2;
            let id = this.props.location.search.split('=')[1] ? '':'new/';
            fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/'+id+mtab2)
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({data:res.data});
                })
        }
    }
    render() {
        let path = this.props.match.path;
        // var u=this.props.location.search.split("=")[]
        return (
            <div style={{}}>
                <div style={{backgroundColor:'#fff'}}>
                    <NavLink to={{pathname:`${path}`,search:'',mtab2:this.props.location.mtab2}} style={{color:'#000',fontSize:'110%',marginLeft:'8%',height:'35px',lineHeight:'35px'}}>最热</NavLink>
                    
                    <NavLink to={{pathname:`${path}`,search:'?id=new',mtab2:this.props.location.mtab2}} style={{color:'#000',fontSize:'110%',marginLeft:'8%',height:'35px',lineHeight:'35px'}}>最新</NavLink>
                </div>
                <div>
                    {
                        this.state.data.length!==0?this.state.data.map(data=>(
                                
                                <div>
                                    <Link to={{pathname:'/composition/writing/'+data.aid,mtab2:data.mid,state1:data.aid,state:this.props.location.state}}>
                                        <div style={{width:'94%',marginTop:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#f5f1e8',float:'left',paddingBottom:'1%',height:'220px',marginBottom:'2%'}}>
                                                
                                                <div style={{float:'left',width:'100%',color:'#000',float:'left',marginTop:'3%'}}>
                                                    <Link to={{pathname:'/home/fopeople',state:this.props.location.state,state4:data.uid}}><img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'50px',height:'50px',marginLeft:'2%',marginTop:'1%',marginRight:'3%',borderRadius:'50%',float:'left'}} /></Link>
                                                    <div style={{float:'left',paddingTop:'2%',width:'70%'}}>
                                                        <div style={{float:'left',width:'100%',marginBottom:'3%'}}><a style={{fontSize:'120%'}}>{data.uname}</a></div>
                                                        
                                                        <div style={{float:'left'}}><a style={{fontSize:'100%',color:'gray'}}>{data.utime}</a></div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div style={{float:'left',width:'90%',marginLeft:'5%',marginRight:'5%'}}>
                                                    
                                                        <div style={{textAlign:'center',color:'#000',fontSize:'150%',marginTop:'2%',marginBottom:'2%'}}>{data.atitle}</div>
                                                        <div style={{height:'50px',overflow:'hidden',color:'#000',fontSize:'120%',marginBottom:'3%'}}>{data.acontent}</div>
                                                        <a style={{color:'f5f1e8',float:'right'}}>{data.aid}</a>
                                                    <div style={{color:'#000',fontSize:'120%',marginBottom:'3%'}}>#{data.atag}</div>
                                                </div>

                                                <div onClick={(e)=>{this.fetchGood(e)}} style={{float:'left',width:'100%'}}>
                                                    <div style={{color:'#000',float:'right',marginRight:'10%',fontSize:'120%',marginTop:'2%'}}>{data.alikes}</div>
                                                    <img src='/images/write/zan1.png' style={{width:'7%',height:'7%',float:'right',marginRight:'3%'}} />
                                                </div>
                                        </div>
                                        
                                    </Link>
                                </div>
                                
                    )):<div style={{height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'120%',marginLeft:'3%'}}>当前还没有练笔哦~快来试试吧  </div>
                }
                </div>
            </div>
        )
    }
}