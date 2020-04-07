import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import {Link,Route,NavLink,Redirect} from 'react-router-dom';

export default class Word extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        
    }
    componentDidMount(){
        // let mtab2 = this.props.location.mtab2;
        let page1 = this.props.match.params;
        console.log(page1);
        let id = this.props.location.search.split('=')[1] ? 'new/':'';
        let arr=this.props.location.pathname.split('/');
        var arr1=arr.reverse();
        console.log(arr1);
        // console.log(mtab2,id);
        fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/'+id+arr1[0])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            let mtab2 = this.props.location.mtab2;
            let page1 = this.props.match.params;
            let id = this.props.location.search.split('=')[1] ? 'new/':'';
            let arr=this.props.location.pathname.split('/');
            var arr1=arr.reverse();
            console.log(arr1);
            // console.log(mtab2,id);
            fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/'+id+arr1[0])
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({data:res.data});
                })
        }
    }
    fetchGood = (e)=>{
        let arr=this.props.location.pathname.split('/');
        var arr1=arr.reverse();
        let data = {
            uid:arr[1],
            aid:arr[2]
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/likes/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }
    Change3=(e)=>{
        document.getElementById("A3").style.color="red"
        document.getElementById("A3").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A4").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A4").style.color="#000"
    }
    Change4=(e)=>{
        document.getElementById("A4").style.color="red"
        document.getElementById("A4").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A3").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A3").style.color="#000"
    }
    render() {
        let path = this.props.match.path;
        let arr=this.props.location.pathname.split('/');
        console.log(path);
        return (
            <div>
                <div style={{backgroundColor:'#fff',marginTop:'2%'}}>
                    <NavLink to={{pathname:`${path}`,search:'',mtab2:this.props.location.mtab2,state1:this.props.location.state1,state:this.props.location.state}} style={{color:'red',fontSize:'110%',marginLeft:'8%',height:'35px',lineHeight:'35px',borderBottom:"4px solid #ffdf41"}} id='A3' onClick={(e)=>{this.Change3(e)}}>最热</NavLink> 
                    <NavLink to={{pathname:`${path}`,search:'?id=new',mtab2:this.props.location.mtab2,state1:this.props.location.state1,state:this.props.location.state}} style={{color:'#000',fontSize:'110%',marginLeft:'8%',height:'35px',lineHeight:'35px'}} id='A4' onClick={(e)=>{this.Change4(e)}}>最新</NavLink>
                </div>
                <div>
                {
                        this.state.data.length!==0?this.state.data.map(data=>(
                                
                                <div>
                                    <Link to={{pathname:'/'+arr[1]+'/composition/writing/'+data.aid+'/'+data.uid,state2:data.uid,mtab2:data.mid,state1:data.aid,state:this.props.location.state}}>
                                        <div style={{width:'94%',marginTop:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#f5f1e8',float:'left',paddingBottom:'1%',height:'200px',marginBottom:'2%'}}>
                                                
                                                <div style={{float:'left',width:'100%',color:'#000',float:'left',marginTop:'3%'}}>
                                                    <Link to={{pathname:'/'+arr[1]+'/home/fopeople',state:this.props.location.state,state4:data.uid}}><img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'50px',height:'50px',marginLeft:'2%',marginTop:'1%',marginRight:'3%',borderRadius:'50%',float:'left'}} /></Link>
                                                    <div style={{float:'left',paddingTop:'2%',width:'70%'}}>
                                                        <div style={{float:'left',width:'100%',marginBottom:'3%'}}><a style={{fontSize:'120%'}}>{data.uname}</a></div>
                                                        
                                                        <div style={{float:'left'}}><a style={{fontSize:'100%',color:'gray'}}>{data.utime}</a></div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div style={{float:'left',width:'90%',marginLeft:'5%',marginRight:'5%'}}>
                                                    
                                                        <div style={{textAlign:'center',color:'#000',fontSize:'150%',marginTop:'2%',marginBottom:'2%'}}>{data.atitle}</div>
                                                        <div style={{height:'55px',overflow:'hidden',color:'#000',fontSize:'120%',marginBottom:'3%'}}>{data.acontent}</div>
                                                        <a style={{display:'none'}}>{data.aid}</a>
                                                    <div style={{color:'#000',fontSize:'100%',marginBottom:'3%'}}>{data.atag}</div>
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
