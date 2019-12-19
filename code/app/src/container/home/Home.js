import React, { Component } from 'react'
import {Carousel,WingBlank,Tabs,SearchBar,TabBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
          selectedTab: '/home',
          selectHome:{
            color:'#d83e34',
            borderBottom:'4px solid #ffdf41'
            },
            selectCreate:{
                color:'#000',
                borderBottom:'1px solid #fff'
            },
            selectFollow:{
                color:'#000',
                borderBottom:'1px solid #fff'
            },
            selectCreateHot:{
                color:'#d83e34',
                borderBottom:'4px solid #ffdf41'
            },
            selectCreateNew:{
                color:'#000',
                borderBottom:'1px solid #fff'
            }
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/article/all')
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
                        }}
                        >
                            <div>
                            <div style={{float:'left'}}>
                                <div style={{position: 'fixed',top: '0',zIndex:'100000',width:'100%',backgroundColor:'#f5f5f9',paddingTop:'2%',paddingBottom:'2%',}}>
                                    <Link to={{pathname:'/home/search',state:this.props.location.state}}><SearchBar style={{width:'86%',backgroundColor:'#f5f5f9',float:'left'}} placeholder="输入关键字搜索作文"/></Link>
                                </div>
                                <div style={{zIndex:'100',top: '8%',position:'absolute',width:'100%',backgroundColor:'#fff',paddingTop:'2%',paddingBottom:'3%'}}>
                                    <Link to={{pathname:'/home/follow/'+this.props.location.state,state:this.props.location.state,state4:this.props.location.state4}} style={{color:this.state.selectFollow.color,borderBottom:this.state.selectFollow.borderBottom,fontSize:'16px',marginLeft:'10px'}}>关注</Link>
                                    <Link to={{pathname:'/home',state:this.props.location.state}} style={{color:this.state.selectHome.color,borderBottom:this.state.selectHome.borderBottom,fontSize:'24px',marginLeft:'10px'}}>推荐</Link>
                                </div>
                                <div style={{zIndex:'100',top: '14%',position:'absolute',width:'100%',backgroundColor:'#fff',paddingTop:'1%',paddingBottom:'3%'}}>
                                    <Link to={{pathname:'/home',state:this.props.location.state}}  style={{color:this.state.selectCreateHot.color,borderBottom:this.state.selectCreateHot.borderBottom,fontSize:'16px',marginLeft:'10px'}}>最热</Link>
                                    <Link to={{pathname:'/home/Crnew',state:this.props.location.state}}  style={{color:this.state.selectCreateNew.color,borderBottom:this.state.selectCreateNew.borderBottom,fontSize:'16px',marginLeft:'10px'}}>最新</Link>
                                </div>
                            </div>
                            <div style={{marginTop:'125px'}}></div>
                {this.state.data.map(data=>(
                    <div style={{width:'100%',whiteSpace:"pre-wrap"}}>
                        <div style={{width:'94%',marginTop:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',float:'left',paddingBottom:'2%',height:'250px'}}>
                        
                            <div style={{float:'left',width:'100%',color:'#000',float:'left',marginTop:'3%'}}>
                                <Link to={{pathname:'/home/fopeople',state:this.props.location.state,state4:data.uid}}><img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'55px',height:'55px',marginLeft:'2%',marginRight:'3%',borderRadius:'50%',float:'left'}} /></Link>
                                <div style={{float:'left',paddingTop:'2%',width:'70%'}}>
                                    <div style={{float:'left',width:'100%',marginBottom:'3%'}}><a style={{fontSize:'120%'}}>{data.uname}</a></div>
                                                        
                                    <div style={{float:'left'}}><a style={{fontSize:'100%',color:'gray'}}>{data.utime}</a></div>
                                </div>
                            </div>
                            <div style={{float:'left',width:'90%',marginLeft:'5%',marginRight:'5%'}}>
                                                    <div style={{textAlign:'center',color:'#000',fontSize:'150%',marginTop:'3%',marginBottom:'3%'}}>{data.atitle}</div>
                                                    <div style={{height:'70px',overflow:'hidden',color:'#000',fontSize:'120%',marginBottom:'5%'}}>{data.acontent}</div>
                                                    <div style={{color:'#000',fontSize:'120%',marginBottom:'3%'}}>#{data.atag}</div>
                                                    <Link to={{pathname:'/home/article/'+data.aid+'/'+data.uid,state1:data.aid,state:this.props.location.state,state2:data.uid}}>
                                                        <a style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</a>
                                                    </Link>
                                                </div>
                        </div>
                    </div>
                ))}
                                <Link to={{pathname:'/home/write',state:this.props.location.state}}>
                                <div style={{width:'50px',height:'50px',color:'#fff',fontSize:'58px',textAlign:'center',lineHeight:'36px',borderRadius:'50%',backgroundColor:'#d83e34',position:'fixed',zIndex:'10000',right:'8%',top:'80%'}}>
                                        +
                                    </div>
                                </Link>
                            </div>
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
                        selected={this.state.selectedTab === '/composition/composition'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/composition',
                            });
                            this.props.history.push({pathname:'/composition/composition',state:this.props.location.state})
                        }}
                        >
                            {/* <Composition/> */}
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
                            this.props.history.push({pathname:'/mine',state:this.props.location.state,state1:this.props.location.state1,state2:this.props.location.state2})
                        }}
                        >
                            {/* <Mine/> */}
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}
