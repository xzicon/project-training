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
      
    render() {
        let url = this.props.match.url;
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/composition/composition',state1:this.props.location.state1,state:this.props.location.state,state2:this.props.location.state2}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>分类</NavBar>
                <div style={{width:'100%',position:'absolute',top:'50px'}}>
                <div style={{zIndex:'100',top: '7%',position:'absolute',width:'96%',margin:'4% 2% auto'}}>
                    <Link to={{pathname:url,state:this.props.location.state,state1:this.props.location.state1}}>素材</Link>
                    <Link to={{pathname:url+'/fanwen',state:this.props.location.state,state1:this.props.location.state1}}>范文</Link>
                    <Link to={{pathname:url+'/jifa',state:this.props.location.state,state1:this.props.location.state1}}>技法</Link>
                </div>
                <div style={{width:'100%',marginTop:'100px'}}>
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
