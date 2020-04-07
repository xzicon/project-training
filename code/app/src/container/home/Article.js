import React, { Component } from 'react'
import {Icon,NavBar, Toast} from 'antd-mobile';
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
        // let page = this.props.location.state1;
        let state = this.props.location.state;
        let arr=this.props.location.pathname.split('/');
        let arr1 = arr.reverse();
        console.log(arr1);
        // console.log(page);
        let page1 = this.props.match.params;
        console.log(page1['page1']);
        fetch('http://116.62.14.0:8402/article/xiang/'+arr1[1]+'/'+arr1[0])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(){
        // let page = this.props.location.state1;
        let state = this.props.location.state;
        let arr=this.props.location.pathname.split('/');
        let arr1 = arr.reverse();
        // console.log(page);
        let page1 = this.props.match.params;
        console.log(page1.page1);
        console.log(this.props.match.params);
        fetch('http://116.62.14.0:8402/article/xiang/'+arr1[1]+'/'+arr1[0])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchGood = (e)=>{
        let arr=this.props.location.pathname.split('/');
        // let arr1 = arr.reverse();
        let page1 = this.props.match.params;
        console.log(page1);
        let data = {
            uid:arr[1],
            // aid:this.props.location.state1
            aid: page1['page']
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
        let arr=this.props.location.pathname.split('/');
        // let arr1 = arr.reverse();
        let page1 = this.props.match.params;
        let data = {
            uid:arr[1],
            // upid:this.props.location.state2
            upid:page1['page1']
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
        console.log(url);
        let arr=this.props.location.pathname.split('/');
        // let arr1 = arr.reverse();
        let page1 = this.props.match.params;
        console.log(page1);
        if(arr.length===6){
            var data1='/'+arr[1]+'/home';
        }else if(arr.length===7){
            var data1='/'+arr[1]+'/home/follow';
        }else if(arr.length===8){
            var data1='/'+arr[1]+'/home/crnew';
        }else if(arr.length===9){
            var data1='/'+arr[1]+'/home/search';
        }else if(arr.length===10){
            var data1='/'+arr[1]+'/'+page1['page']+'/'+page1['page1']+'/home/fopeople';
        }else if(arr.length===11){
            var data1='/'+arr[1]+'/mine/praise'
        }else{
            var data1='/'+arr[1]+'/mine/mcnew'
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
    <div style={{position:'relative',position:'fixed',top:'0',width:'100%',height:'50px',backgroundColor:'#fff'}}> 
                            <Link to={{pathname:data1,state1:this.props.location.state1,state:this.props.location.state,state2:this.props.location.state2,state4:this.props.location.state4}}>
                                <img src='/images/write/left.png' style={{width:'8%',height:'45%',position:'absolute',top:'27%',left:'2%',}} />
                                
                            </Link>
                            <div style={{width:'80%',zIndex:'9',color:'#000',height:'100%',textAlign:'center',float:'right',marginRight:'10%'}}>
                                <Link to={{pathname:'/'+arr[1]+'/'+page1['page']+'/'+page1['page1']+'/home/a/a/a/home/home/article/fopeople',state:this.props.location.state,state4:data.uid,state1:this.props.location.state1}} style={{width:'100%',height:'100%',color:'#000'}}>
                                    <img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'40px',height:'40px',marginLeft:'2%',marginTop:'2%',marginRight:'5%',borderRadius:'50%',float:'left',textAlign:'center',}} />
                                </Link>
                                <div style={{fontSize:'120%',float:'left',marginTop:'5%',textAlign:'center',}}>{data.uname}</div>
                            </div>
                            
                        </div>
                <div style={{float:'left',zIndex:'99',width:'100%',marginTop:'15%'}}>
                            {data.mid===null?
                                <div style={{margin:'3% 3% auto',backgroundColor:'#fff',whiteSpace:"pre-wrap",float:'left',width:'94%'}}>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%',color:'gray'}}>{data.utime}</div>
                                    <h2 style={{textAlign:'center'}}>{data.atitle}</h2>
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',width:'90%'}}>{data.acontent}</div>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'90%'}}>{data.atag}</div><br/>
                                    {data.aimage===''?<div></div>:<div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'94%'}}><img src={'http://116.62.14.0:8402/images/'+data.aimage} style={{width:'100%',height:'150px',marginTop:'1%',float:'left',backgroundPosition:'cover'}} /></div>}
                                </div>
                            :
                                <div style={{margin:'3% 3% auto',backgroundColor:'#fff',whiteSpace:"pre-wrap",float:'left',width:'94%'}}>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'94%',color:'gray'}}>{data.utime}</div>
                                    <h2 style={{textAlign:'center'}}>{data.atitle}</h2>
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',fontSize:'120%',lineHeight:'150%',width:'94%'}}>{data.acontent}</div>
                                    <div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'94%'}}>#{data.atag}</div><br/>
                                    {data.aimage===''?<div></div>:<div style={{marginLeft:'3%',marginRight:'3%',paddingTop:'2%',paddingBottom:'2%',float:'left',width:'94%'}}><img src={'http://116.62.14.0:8402/images/'+data.aimage} style={{width:'100%',height:'150px',marginTop:'1%',float:'left',backgroundPosition:'cover'}} /></div>}
                                    
                                    <Link to={{pathname:'/'+arr[1]+'/'+data.mid+'/composition/article/sucai/s/s/s/s/s/sdetails/'+data.mid,state1:this.props.location.state1,state2:this.props.location.state2,mtab2:data.mid,state:this.props.location.state}}>
                                    <div style={{float:'left',marginLeft:'3%',marginRight:'3%',marginBottom:'3%',fontSize:'120%',lineHeight:'150%',paddingTop:'3%',paddingBottom:'3%',borderTop:'1px dashed gray',width:'94%',color:'#000',backgroundColor:'#bcc2d7'}}>
                                        <div style={{display:'none'}}>{data.mid}</div>
                                        <div>{data.mtitle}</div>
                                    </div>
                                    </Link>
                                </div>
                            }
                        </div>

                        <div style={{marginTop:'2% ',marginLeft:'2%',marginRight:'2%',width:'96%',float:'left',marginBottom:'15%'}}>
                            <hr/>
                            <Link to={{pathname:url,state1:page1['page'],state:this.props.location.state}}><span style={{fontSize:'18px',color:'#000'}}>精彩评论</span></Link>
                            <Route path={`${url}`} component={Commentzuire} />
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
                                <Link to={{pathname:'/'+arr[1]+'/'+page1['page']+'/'+page1['page1']+'/home/comment',state1:this.props.location.state1,state2:this.props.location.state2,state:this.props.location.state}}>
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