import React, { Component } from 'react'
import {Tabs,NavBar,Icon, Toast} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
import Fowrite from './Fowrite';
import Foshoucang from './Foshoucang';
import Foguanzhu from './Foguanzhu';
export default class Fopeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        // let uid=this.props.location.state4;
        // let look=this.props.location.state;
        let page1 = this.props.match.params;
        console.log(page1['page']);
        let arr = this.props.location.pathname.split('/');
        fetch('http://116.62.14.0:8402/login/me/'+page1['page']+'/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(){
        // let uid=this.props.location.state4;
        // let look=this.props.location.state;
        // console.log(uid);
        let page1 = this.props.match.params;
        console.log(page1);
        let arr = this.props.location.pathname.split('/');
        fetch('http://116.62.14.0:8402/login/me/'+page1['page']+'/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchConcern = (e)=>{
        let page1 = this.props.match.params;
        console.log(page1);
        let arr = this.props.location.pathname.split('/');
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
                    Toast.success('关注成功',1);
                    break;
                }
                default:{
                    console.log(data.data);
                    Toast.info('取关成功',1);
                    break;
                }
            }
        })
        // var Obj = document.getElementById(e.target.id);
        // var Flag=(Obj.getAttribute("value",2)=="关注");
        // Obj.value=Flag?"已关注":"关注";
    }
    Change10=(e)=>{
        document.getElementById("A10").style.color="red"
        document.getElementById("A10").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A11").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A12").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A11").style.color="#000"
        document.getElementById("A12").style.color="#000"
    }
    Change11=(e)=>{
        document.getElementById("A11").style.color="red"
        document.getElementById("A11").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A10").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A12").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A10").style.color="#000"
        document.getElementById("A12").style.color="#000"
    }
    Change12=(e)=>{
        document.getElementById("A12").style.color="red"
        document.getElementById("A12").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A11").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A10").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A11").style.color="#000"
        document.getElementById("A10").style.color="#000"
    }
    render() {
        let page1 = this.props.match.params;
        let url = this.props.match.url;
        console.log(url);
        let arr=this.props.location.pathname.split('/');
        console.log(arr.length);
        if(arr.length===6 || arr.length===7){
            var data1='/'+arr[1]+'/home';
        }else if(arr.length===8 || arr.length===9){
            var data1='/'+arr[1]+'/home/follow';
        }else if(arr.length===10 || arr.length===11){
            var data1='/'+arr[1]+'/home/crnew';
        }else if(arr.length===12 || arr.length===13){
            var data1='/'+arr[1]+'/home/article/'+arr[2]+'/'+page1['page'];
        }else if(arr.length===14 || arr.length===15){
            var data1='/'+arr[1]+'/composition/writing/'+arr[2]+'/'+page1['page'];
        }else{
            var data1='/'+arr[1]+'/mine';
        }
        console.log(data1);
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:data1,state4:this.props.location.state4,mtab2:this.props.location.mtab2,state:this.props.location.state,state2:this.props.location.state2,state1:this.props.location.state1}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={
                        // this.state.data.map(data=>(
                            this.state.data.look===null?<input type='button' onClick={(e)=>{this.fetchConcern(e)}}style={{backgroundColor:'#fff',fontSize:'90',color:'#da4036',border:'1px solid #da4036',width:'70px',height:'30px',borderRadius:'15%'}} value='关注' id='guanzhu' class='concern'/>
                            :(this.state.data.look!==this.state.data.uid?<input type='button' onClick={(e)=>{this.fetchConcern(e)}} style={{backgroundColor:'#fff',fontSize:'90',color:'#da4036',border:'1px solid #da4036',width:'70px',height:'30px',borderRadius:'15%'}} value='已关注' id='guanzhu' class='concern'/>
                            :<div style={{display:'none'}}></div>)
                    } 
                    // ))}
                    >主页</NavBar>
                <div style={{width:'96%',margin:'2% 2% auto',backgroundColor:'#fff',marginTop:'54px',fontSize:'16px'}}>
                        
                        <img style={{marginLeft:'40%',marginTop:'10px',borderRadius:'50%',width:'60px',height:'60px'}} src={'http://116.62.14.0:8402/images/'+this.state.data.uimage}/>
                        <div style={{width:'96%',textAlign:'center',backgroundColor:'white',paddingLeft:'2%',paddingTop:'2%',marginTop:'2%',paddingBottom:'5%'}}>
                            <div style={{width:'100%'}}>昵称：{this.state.data.uname}</div>
                            <div style={{width:'100%',marginTop:'5%',}}>签名：{this.state.data.udescribe}</div>
                        </div>
                </div> 
                <div style={{backgroundColor:'#fff',marginTop:'3%',paddingTop:'2%',paddingBottom:'2%'}}>
                    <Link id='A10' onClick={(e)=>{this.Change10(e)}} to={{pathname:url,state4:this.props.location.state4,state:this.props.location.state,state1:this.props.location.state1,mtab2:this.props.location.mtab2}} style={{color:'red',fontSize:'120%',marginLeft:'5%',borderBottom:"4px solid #ffdf41"}}>
                    创作</Link>
                    <Link id='A11' onClick={(e)=>{this.Change11(e)}} to={{pathname:url+'/shoucang',state4:this.props.location.state4,state:this.props.location.state,state1:this.props.location.state1,mtab2:this.props.location.mtab2}} style={{color:'#000',fontSize:'120%',marginLeft:'5%'}}>收藏</Link>
                    <Link id='A12' onClick={(e)=>{this.Change12(e)}} to={{pathname:url+'/guanzhu',state:this.props.location.state,state2:this.props.location.state2,state4:this.props.location.state4,state1:this.props.location.state1,mtab2:this.props.location.mtab2}} style={{color:'#000',fontSize:'120%',marginLeft:'5%'}}>关注</Link>
                </div>
                <div style={{width:'96%',margin:'2% 2% auto'}}>
                    <Route path={`${url}`} exact component={Fowrite}/>
                    <Route path={`${url}/shoucang`} component={Foshoucang}/>
                    <Route path={`${url}/guanzhu`} component={Foguanzhu}/>
                </div>
            </div>
        )
    }
}
