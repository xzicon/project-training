import React, { Component } from 'react'
import {Icon,NavBar,Toast} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
import Lcommentzuire from '../Lcommentzuire';
export default class Writing extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        let arr=this.props.location.pathname.split('/');
        // let page = this.props.location.state1;
        // let state = this.props.location.state;
        let page1 = this.props.match.params;
        console.log(page1);
        // console.log(page,state);
        fetch('http://116.62.14.0:8402/article/xiang/'+page1['page']+'/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchConcern = (e)=>{
        let arr=this.props.location.pathname.split('/');
        let page1 = this.props.match.params;
        console.log(page1);
        let data = {
            uid:arr[1],
            upid:page1['page']
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
                    
                    
                    // imgObj.src=Flag?"/images/zan1.png":"/images/home/zan.png";
                    break;
                }
                default:{
                    console.log(data.data);
                    break;
                }
            }
        })
        var Obj = document.getElementById(e.target.id);
        var Flag=(Obj.getAttribute("value",2)=="关注");
        Obj.value=Flag?"已关注":"关注";
    }
    componentDidUpdate(){
        let arr=this.props.location.pathname.split('/');
        // let page = this.props.location.state1;
        // let state = this.props.location.state;
        let page1 = this.props.match.params;
        console.log(page1);
        // console.log(page,state);
        fetch('http://116.62.14.0:8402/article/xiang/'+page1['page']+'/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchGood = (e)=>{
        let arr=this.props.location.pathname.split('/');
        let page1 = this.props.match.params;
        console.log(page1);
        let data = {
            uid:arr[1],
            aid:page1['page']
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
            switch (data.status) {
                case "0":{
                    console.log(data.data);
                    Toast.success('点赞成功',1)
                    
                    // imgObj.src=Flag?"/images/zan1.png":"/images/home/zan.png";
                    break;
                }
                case "1":{
                    console.log(data.data);
                    Toast.success('取消点赞成功',1)
                    
                    // imgObj.src=Flag?"/images/zan1.png":"/images/home/zan.png";
                    break;
                }
                default:{
                    console.log(data.data);
                    break;
                }}
        })
        
        var imgObj = document.getElementById(e.target.id);
        var Flag=(imgObj.getAttribute("src",2)=="/images/home/zan.png");
        imgObj.src=Flag?"/images/home/zan1.png":"/images/home/zan.png";
    }
    change=(e)=>{
        var imgObj = document.getElementById(e.target.id);
        var Flag=(imgObj.getAttribute("src",2)=="/images/home/zan.png");
        imgObj.src=Flag?"/images/home/zan1.png":"/images/home/zan.png";
    }
    render() {
        let url = this.props.match.url;
        let arr=this.props.location.pathname.split('/');
        let page1 = this.props.match.params;
        console.log(page1);
        return (
            <div>
                {this.state.data.map(data=>(
                    <div>
                        <div style={{position:'relative',top:'0',position:'fixed',width:'100%',height:'50px',backgroundColor:'#fff'}}> 
                            <Link to={{pathname:'/'+arr[1]+'/'+data.mid+'/composition/label/s/sdetails/'+data.mid,state:this.props.location.state,mtab2:this.props.location.mtab2}}>
                                <img src='/images/write/left.png' style={{width:'8%',height:'45%',position:'absolute',top:'27%',left:'2%',}} />
                                
                            </Link>
                            <div style={{width:'80%',zIndex:'9',color:'#000',height:'100%',textAlign:'center',float:'right',marginRight:'10%'}}>
                                <Link to={{pathname:'/'+arr[1]+'/'+data.aid+'/'+data.uid+'/com/w/w/w/w/com/com/com/writing/fopeople',state:this.props.location.state,state4:data.uid,state1:this.props.location.state1,mtab2:this.props.location.mtab2}} style={{width:'100%',height:'100%',color:'#000'}}>
                                <img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{height:'40px',width:'40px',marginLeft:'2%',marginTop:'2%',marginRight:'5%',borderRadius:'50%',float:'left',textAlign:'center',}} />
                                </Link>
                                <div style={{fontSize:'120%',float:'left',marginTop:'5%',textAlign:'center',}}>{data.uname}</div>
                            </div>
                            
                        </div>
                <div style={{float:'left',zIndex:'99',width:'100%',marginTop:'15%'}}>
                            {data.mid===null?
                                <div style={{margin:'3% 3% auto',backgroundColor:'#fff',whiteSpace:"pre-wrap",float:'left',width:'94%'}}>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%',color:'gray'}}>{data.utime}</div>
                                    <div style={{textAlign:'center',float:'left',fontSize:'150%',fontWeight:'600',width:'100%',marginTop:'3%',marginBottom:'3%'}}>{data.atitle}</div>
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',width:'90%'}}>{data.acontent}</div>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%'}}>{data.atag}</div><br/>
                                    {data.aimage===''?<div></div>:<div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'94%'}}><img src={'http://116.62.14.0:8402/images/'+data.aimage} style={{width:'100%',height:'150px',marginTop:'1%',float:'left',backgroundPosition:'cover'}} /></div>}
                                </div>
                            :
                                <div style={{margin:'3% 3% auto',backgroundColor:'#fff',whiteSpace:"pre-wrap",float:'left',width:'94%'}}>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'94%',color:'gray'}}>{data.utime}</div>
                                    <div style={{textAlign:'center',float:'left',fontSize:'150%',fontWeight:'600',width:'100%',marginTop:'3%',marginBottom:'3%'}}>{data.atitle}</div>
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',width:'94%'}}>{data.acontent}</div>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%'}}>{data.atag}</div><br/>
                                    {data.aimage===''?<div></div>:<div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'94%'}}><img src={'http://116.62.14.0:8402/images/'+data.aimage} style={{width:'100%',height:'150px',marginTop:'1%',float:'left',backgroundPosition:'cover'}} /></div>}
                                    
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',paddingTop:'3%',paddingBottom:'3%',borderTop:'1px dashed gray',width:'90%'}}>
                                        <div style={{display:'none'}}>{data.mid}</div>
                                        <div>{data.mtitle}</div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div style={{marginTop:'2% ',marginLeft:'2%',marginRight:'2%',width:'96%',float:'left',marginBottom:'15%'}}>
                            <hr/>
                            <Link to={{pathname:url,state1:this.props.location.state1,state:this.props.location.state}}><span style={{fontSize:'18px',color:'#000'}}>精彩评论</span></Link>
                            <Route path={`${url}`} component={Lcommentzuire} />
                        </div>
                    
                        {/* state:uid */}
                        <div style={{backgroundColor:'#fff',bottom:0,float:'left',width:'100%',position:'fixed',height:'45px',paddingTop:'1%'}}>
                            <div style={{float:'left',width:'40%',textAlign:'center',marginLeft:'5%'}}>
                                <div style={{height:'60%'}}>
                                    {data.look===null?<img src='/images/home/zan.png' id='zan' onClick={(e)=>{this.fetchGood(e)}} style={{width:'15%',height:'15%'}}/>:<img src='/images/home/zan1.png' id='zan' onClick={(e)=>{this.fetchGood(e)}} style={{width:'15%',height:'15%'}}/>}
                                </div>
                                    
                                {data.look===null?<a style={{}} >点赞&nbsp;&nbsp;{data.alikes}</a>:<a style={{}} >已点赞&nbsp;&nbsp;{data.alikes}</a>}
                            </div>
                                    
                            <div style={{float:'left',width:'40%',textAlign:'center'}}>
                                <Link to={{pathname:'/'+arr[1]+'/'+page1['page']+'/'+page1['page1']+'/composition/writin/comment',state1:this.props.location.state1,state:this.props.location.state,mtab2:this.props.location.mtab2}}>
                                    <div style={{height:'60%'}}>
                                        <img src='/images/write/say.png' style={{width:'15%',height:'15%'}}/>
                                    </div>
                                    <a style={{color:'#000'}}>评论&nbsp;&nbsp;{data.acomment}</a>
                                </Link>      
                            </div>               
                        </div>
                         </div>   
                    ))
                }
            </div>
        )
    }
}