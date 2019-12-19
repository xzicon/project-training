import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom';
import {Icon,SearchBar,NavBar,Tabs, Badge} from 'antd-mobile';
import Source from './Source';
import Model from './Model';
import Technique from './Technique';

const tabs = [
    { title: '素材' },
    { title: '范文' },
    { title: '技法' },
  ];
  
export default class All extends Component {
    constructor(props){
        super(props)
        this.state={
          num:this.props.location.state
        }
        console.log(this.state.num);
      }
      Change1=(e)=>{
        document.getElementById("A1").style.color="red"
        document.getElementById("A1").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A2").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A3").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A2").style.color="#000"
        document.getElementById("A3").style.color="#000"
    }
    Change2=(e)=>{
        document.getElementById("A2").style.color="red"
        document.getElementById("A2").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A1").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A3").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A1").style.color="#000"
        document.getElementById("A3").style.color="#000"
    }
    Change3=(e)=>{
        document.getElementById("A3").style.color="red"
        document.getElementById("A3").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A2").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A1").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A2").style.color="#000"
        document.getElementById("A1").style.color="#000"
    }

    render() {
        let url = this.props.match.url;
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/composition/composition',state1:this.props.location.state1,state:this.props.location.state,state2:this.props.location.state2}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>分类</NavBar>
                <div style={{width:'100%',position:'absolute',top:'50px'}}>
                <div style={{zIndex:'100',top: '7%',position:'absolute',width:'96%',margin:'4% 2% auto',paddingLeft:'2%'}}  style={{backgroundColor:'#fff',height:'35px',lineHeight:'35px'}}>
                    <Link to={{pathname:url,state:this.props.location.state,state1:this.props.location.state1}} style={{color:'red',fontSize:'130%',marginRight:'5%',borderBottom:"4px solid #ffdf41"}} id='A1' onClick={(e)=>{this.Change1(e)}}>素材</Link>
                    <Link to={{pathname:url+'/fanwen',state:this.props.location.state,state1:this.props.location.state1}} style={{color:'#000',fontSize:'130%',marginRight:'5%'}} id='A2' onClick={(e)=>{this.Change2(e)}}>范文</Link>
                    <Link to={{pathname:url+'/jifa',state:this.props.location.state,state1:this.props.location.state1}} style={{color:'#000',fontSize:'130%',marginRight:'5%'}} id='A3' onClick={(e)=>{this.Change3(e)}}>技法</Link>
                </div>
                <div style={{width:'100%',marginTop:'2%'}}>
                    <div>
                    <Route path={`${url}`} exact component={Source}/>
                    <Route path={`${url}/fanwen/`} component={Model}/>
                    <Route path={`${url}/jifa/`} component={Technique}/>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
