import React, { Component } from 'react'
import {Tabs,SearchBar,TabBar} from 'antd-mobile';
import {HashRouter as Router,Link,Route} from 'react-router-dom';
import Material from './material/Material'
export default class Composition extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: '/composition/composition/'+this.props.location.state,
          data:[]
        };
    }
    componentDidMount(){
        let state = this.props.location.state;
        console.log(state);
        fetch('http://116.62.14.0:8402/usort/msid/'+state)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                <div style={{ 
                position: 'fixed',
                height: '100%', 
                width: '100%', 
                top: 0 
                }}>
                    <TabBar
                        unselectedTintColor="#2c2c2c"
                        tintColor="#da4036"
                        barTintColor="white"
                    >
                        <TabBar.Item
                        title="作文"
                        key="Home"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(images/apptab/home.png) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(images/apptab/home1.png) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selected={this.state.selectedTab === '/home'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/home',
                            });
                            this.props.history.push({pathname:'/home',state:this.props.location.state})
                        }}
                        >
                            {/* <Home/> */}
                        </TabBar.Item>
                        <TabBar.Item
                        icon={
                            <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(images/apptab/composition.png) center center /  21px 21px no-repeat' }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(images/apptab/composition1.png) center center /  21px 21px no-repeat' }}
                            />
                        }
                        title="素材"
                        key="Composition"
                        selected={this.state.selectedTab === '/composition/composition/'+this.props.location.state}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/composition/composition/'+this.props.location.state,
                            });
                            
                        }}
                        >
                            <div >
                                <div style={{position: 'fixed',top: '0',zIndex:'100000',width:'96%',margin:'2% 2% auto',backgroundColor:'#f5f5f9'}}>
                                    <Link to={{pathname:'/composition/all',state:this.props.location.state,state1:this.props.location.state1}}><img src='/images/write/all.png' style={{float:'left',width:'8%',height:'8%',marginTop:'2%',marginLeft:'2%'}} /></Link>
                                    <Link to='/composition/csearch'><img src='/images/write/all.png' style={{float:'right',width:'8%',height:'8%',marginTop:'2%',marginLeft:'2%'}} /></Link>
                                </div>
                                <div style={{position:'absolute',top: '50px',zIndex:'99',width:'96%',margin:'2% 2% auto',backgroundColor:'#fff'}}>
                                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',marginTop:'5%',paddingLeft:'5%'}}> 素材</a>
                                    <Link to={{pathname:'/composition/material',mtab:'sucai',state:this.props.location.state}}><button  style={{backgroundColor:'#fff',color:'#8fa0cb',borderRadius:'15%',outline:'none',border:'1px solid #8fa0cb',paddingTop:'2%',paddingBottom:'2%',marginRight:'5%'}} >查看更多</button></Link>
                                    <br/>
                                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',marginTop:'2%',paddingLeft:'5%',marginBottom:'2%'}}> 范文</a>
                                    <Link to={{pathname:'/composition/material',mtab:'fanwen',state:this.props.location.state}}><button  style={{backgroundColor:'#fff',color:'#8fa0cb',borderRadius:'15%',outline:'none',border:'1px solid #8fa0cb',paddingTop:'2%',paddingBottom:'2%',marginRight:'5%'}} >查看更多</button></Link>
                                    <br/>
                                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',marginTop:'2%',paddingLeft:'5%',marginBottom:'2%'}}> 技法</a>
                                    <Link to={{pathname:'/composition/material',mtab:'jifa',state:this.props.location.state}}><button  style={{backgroundColor:'#fff',color:'#8fa0cb',borderRadius:'15%',outline:'none',border:'1px solid #8fa0cb',paddingTop:'2%',paddingBottom:'2%',marginRight:'5%'}} >查看更多</button></Link>
                                </div>
                                <div>
                                {this.state.data.map(data => (
                                    <div>{data.msname}</div>
                                ))}
                                </div>
                            </div>
                        </TabBar.Item>
                        <TabBar.Item
                        icon={{ uri: 'images/apptab/mine.png' }}
                        selectedIcon={{ uri: 'images/apptab/mine1.png' }}
                        title="我的"
                        key="Mine"
                        selected={this.state.selectedTab === '/mine'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/mine',
                            });
                            this.props.history.push({pathname:'/mine',state:this.props.location.state})
                        }}
                        >
                        </TabBar.Item>
                    </TabBar>
                </div>
                
            </div>
        )
    }
}