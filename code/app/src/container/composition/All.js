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
                    icon={<Link to={{pathname:'/composition/composition/'+this.props.location.state,state1:this.props.location.state1,state:this.props.location.state,state2:this.props.location.state2}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>分类</NavBar>
                <div style={{width:'100%',position:'absolute',top:'50px'}}>
                <div style={{zIndex:'100',top: '7%',position:'absolute',width:'96%',margin:'4% 2% auto'}}>
                    <Link to={{pathname:url,state:this.props.location.state}}>素材</Link>
                    <Link to={{pathname:url+'/fanwen',state:this.props.location.state}}>范文</Link>
                    <Link to={{pathname:url+'/jifa',state:this.props.location.state}}>技法</Link>
                </div>
                <div style={{width:'100%',marginTop:'100px'}}>
                    <div>
                    <Route path={`${url}`} exact component={Source}/>
                    <Route path={`${url}/fanwen/`} component={Model}/>
                    <Route path={`${url}/jifa/`} component={Technique}/>
                    </div>
                </div>
                {/* <Tabs tabs={tabs} tabBarTextStyle={{fontSize:'95%'}} initialPage={0}  tabBarBackgroundColor=''  tabBarInactiveTextColor='#8fa0cb' tabBarActiveTextColor='#8fa0cb'  tabBarUnderlineStyle={{border:'2px solid #8fa0cb'}} >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Source state={this.state.num} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Model state={this.props.location.state} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Technique state={this.props.location.state} />
                </div>
                </Tabs> */}
                </div>
                {/* <div style={{backgroundColor:'#fff',marginBottom:'2%'}}>
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',paddingLeft:'5%',}}> 素材</a>
                    <div style={{marginTop:'3%',marginLeft:'3%',marginRight:'3%'}}>
                        {
                            this.state.tabs.map((item,idx)=>(
                                
                                <Link to='/composition/material'  ><button style={{width:'15%',borderRadius:'10%',outline:'none',border:'1px solid #000',backgroundColor:'#fff',fontSize:'120%',paddingTop:'1%',paddingBottom:'1%',marginRight:'5%',marginBottom:'3%'}}>{item.title}</button></Link>
                                
                                
                            ))
                        }
                    </div>
                </div>
                <div style={{backgroundColor:'#fff',marginBottom:'2%'}}>
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',paddingLeft:'5%',}}> 范文</a>
                    <div style={{marginTop:'3%',marginLeft:'3%',marginRight:'3%'}}>
                        {
                            this.state.tabs.map((item,idx)=>(
                                
                                <Link to='./essay'  ><button style={{width:'15%',borderRadius:'10%',outline:'none',border:'1px solid #000',backgroundColor:'#fff',fontSize:'120%',paddingTop:'1%',paddingBottom:'1%',marginRight:'5%',marginBottom:'3%'}}>{item.title}</button></Link>
                                
                                
                            ))
                        }
                    </div>
                </div>
                <div style={{backgroundColor:'#fff',marginBottom:'2%'}}>
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',paddingLeft:'5%',}}> 技法</a>
                    <div style={{marginTop:'3%',marginLeft:'3%',marginRight:'3%'}}>
                        {
                            this.state.tabs2.map((item,idx)=>(
                                
                                <Link to='./skill'  ><button style={{width:'15%',borderRadius:'10%',outline:'none',border:'1px solid #000',backgroundColor:'#fff',fontSize:'120%',paddingTop:'1%',paddingBottom:'1%',marginRight:'5%',marginBottom:'3%'}}>{item.title}</button></Link>
                                
                            ))
                        }
                    </div>
                </div> */}
            </div>
        )
    }
}
