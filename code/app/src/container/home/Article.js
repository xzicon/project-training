import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
import Commentzuire from './Commentzuire';
export default class Article extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    }
    
    componentDidMount(){
        let page = this.props.location.state1;
        let state2 = this.props.location.state2;
        console.log(page);
        console.log(this.props.match.params);
        fetch('http://116.62.14.0:8402/article/xiang/'+page+'/'+state2)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    // componentDidUpdate(){
    //     let page = this.props.location.state1;
    //     fetch('http://116.62.14.0:8402/article/xiangqing/'+page)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //     })
    // }
    fetchGood = (e)=>{
        let data = {
            uid:this.props.location.state,
            aid:this.props.location.state1
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
                case "-1":{
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
        var imgObj = document.getElementById(e.target.id);
        var Flag=(imgObj.getAttribute("src",2)=="/images/home/zan.png");
        imgObj.src=Flag?"/images/home/zan1.png":"/images/home/zan.png";
    }
    fetchConcern = (e)=>{
        let data = {
            uid:this.props.location.state,
            upid:this.props.location.state2
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
    change=(e)=>{
        var imgObj = document.getElementById(e.target.id);
        var Flag=(imgObj.getAttribute("src",2)=="/images/home/zan.png");
        imgObj.src=Flag?"/images/home/zan1.png":"/images/home/zan.png";
    }
    render() {
        let url = this.props.match.url;
        let arr=this.props.location.pathname.split('/');
        if(arr.length===5){
            var data1='/home';
        }else if(arr.length===6){
            var data1='/home/follow/'+this.props.location.state;
        }else if(arr.length===7){
            var data1='/home/crnew';
        }else if(arr.length===8){
            var data1='/home/search';
        }else if(arr.length===9){
            var data1='/home/fopeople';
        }else{
            var data1='/mine/praise'
        }
        console.log(data1);
        return (
            <div>
                {this.state.data.map(data=>(
                    <div>
                {/* <NavBar
                    icon={<Link to={{pathname:data1,state1:this.props.location.state1,state:this.props.location.state,state2:this.props.location.state2,state4:this.props.location.state4}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    // rightContent={
                    //     <input type='button' onClick={(e)=>{this.fetchConcern(e)}} style={{backgroundColor:'#fff',fontSize:'90',color:'#da4036',border:'1px solid #da4036',width:'70px',height:'30px',borderRadius:'15%'}} value='关注' class='concern'/>
                    // }
    ><Link to={{pathname:'/home/home/home/article/fopeople',state:this.props.location.state,state4:data.uid,state1:this.props.location.state1}} style={{width:'100%',height:'100%',color:'#000'}}><img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{height:'80%',marginLeft:'2%',marginTop:'5%',marginRight:'5%',borderRadius:'50%',float:'left'}} /><div style={{float:'left',marginTop:'15%',fontSize:'90%'}}>{data.uname}</div></Link></NavBar>      */}
    <div style={{position:'relative',top:'0',width:'100%',height:'50px',backgroundColor:'#fff'}}> 
                            <Link to={{pathname:data1,state1:this.props.location.state1,state:this.props.location.state,state2:this.props.location.state2,state4:this.props.location.state4}}>
                                <img src='/images/write/left.png' style={{width:'8%',height:'45%',position:'absolute',top:'27%',left:'2%',}} />
                                
                            </Link>
                            <div style={{width:'80%',zIndex:'9',color:'#000',height:'100%',textAlign:'center',float:'right'}}>
                            <Link to={{pathname:'/home/a/a/a/home/home/article/fopeople',state:this.props.location.state,state4:data.uid,state1:this.props.location.state1}} style={{width:'100%',height:'100%',color:'#000'}}>
                                <img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{height:'80%',marginLeft:'2%',marginTop:'2%',marginRight:'5%',borderRadius:'50%',float:'left'}} />
                                </Link>
                                <div style={{fontSize:'120%',float:'left',marginTop:'5%'}}>{data.uname}</div>
                            </div>
                            
                        </div>
                <div style={{float:'left',zIndex:'99',width:'100%',marginTop:'3%'}}>
                            {data.mid===null?
                                <div style={{margin:'3% 3% auto',backgroundColor:'#fff',whiteSpace:"pre-wrap",float:'left',width:'94%'}}>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%',color:'gray'}}>{data.utime}</div>
                                    <h2 style={{textAlign:'center'}}>{data.atitle}</h2>
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',width:'90%'}}>{data.acontent}</div>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%'}}>{data.atag}</div><br/>
                                    {data.aimage===''|| '{}'?<div></div>:<div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%'}}><img src={'http://116.62.14.0:8402/images/'+data.aimage} style={{width:'90%',height:'150px',marginLeft:'2%',marginTop:'1%',marginRight:'3%',float:'left'}} /></div>}
                                </div>
                            :
                                <div style={{margin:'3% 3% auto',backgroundColor:'#fff',whiteSpace:"pre-wrap",float:'left',width:'94%'}}>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%',color:'gray'}}>{data.utime}</div>
                                    <h2 style={{textAlign:'center'}}>{data.atitle}</h2>
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',width:'90%'}}>{data.acontent}</div>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%'}}>#{data.atag}</div><br/>
                                    {data.aimage===''|| '{}'?<div></div>:<div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%'}}><img src={'http://116.62.14.0:8402/images/'+data.aimage} style={{width:'90%',height:'150px',marginLeft:'2%',marginTop:'1%',marginRight:'3%',float:'left'}} /></div>}
                                    <Link to={{pathname:'/composition/article/sucai/s/s/s/s/s/sdetails/'+data.mid,state1:this.props.location.state1,state2:this.props.location.state2,mtab2:data.mid,state:this.props.location.state}}>
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',paddingTop:'3%',paddingBottom:'3%',borderTop:'1px dashed gray',width:'90%',color:'#000'}}>
                                        <div style={{display:'none'}}>{data.mid}</div>
                                        <div>{data.mtitle}</div>
                                    </div>
                                    </Link>
                                </div>
                            }
                        </div>

                        <div style={{marginTop:'2% ',marginLeft:'2%',marginRight:'2%',width:'96%',float:'left',marginBottom:'15%'}}>
                            <hr/>
                            <Link to={{pathname:url,state1:this.props.location.state1,state:this.props.location.state}}><span style={{fontSize:'18px',color:'#000'}}>精彩评论</span></Link>
                            <Route path={`${url}`} component={Commentzuire} />
                        </div>
                    
                        {/* state:uid */}
                        <div style={{backgroundColor:'#fff',bottom:0,float:'left',width:'100%',position:'fixed',height:'45px',paddingTop:'1%'}}>
                            <div style={{float:'left',width:'40%',textAlign:'center',marginLeft:'5%'}}>
                                <div style={{height:'60%'}}>
                                    {data.look===null?<img src='/images/home/zan.png' id='zan' onClick={(e)=>{this.fetchGood(e)}} style={{width:'15%',height:'15%'}}/>:<img src='/images/home/zan1.png' id='zan' onClick={(e)=>{this.fetchGood(e)}} style={{width:'15%',height:'15%'}}/>}
                                </div>
                                    
                                <a style={{}} >点赞&nbsp;&nbsp;{data.alikes}</a>
                            </div>
                                    
                            <div style={{float:'left',width:'40%',textAlign:'center'}}>
                                <Link to={{pathname:'/home/comment',state1:this.props.location.state1,state2:this.props.location.state2,state:this.props.location.state}}>
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