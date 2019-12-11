import React, { Component } from 'react'
import {Carousel,WingBlank,Tabs,SearchBar,TabBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '/home',
            data:[],
            selectHome:{
                color:'#000',
                borderBottom:'1px solid #fff'
            },
            selectCreate:{
                color:'#d83e34',
                borderBottom:'4px solid #ffdf41'
            },
            selectFollow:{
                color:'#000',
                borderBottom:'1px solid #fff'
            },
        };
    }
    componentDidMount(){
        // let page = this.props.location.search;
        // console.log(page);
        fetch('http://116.62.14.0:8402/article')
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
                                <div style={{position: 'fixed',top: '0',zIndex:'100000',width:'96%',margin:'2% 2% auto',backgroundColor:'#f5f5f9'}}>
                                    <SearchBar style={{width:'86%',backgroundColor:'#f5f5f9',float:'left'}} placeholder="输入关键字搜索"/>
                                    <Link to='/home/news'><img src="./images/home/remind.png" style={{float:'right', width:'8%',marginTop:'8px',marginRight:'8px'}} /></Link>
                                </div>
                                <div style={{zIndex:'100',top: '7%',position:'absolute',width:'96%',margin:'4% 2% auto'}}>
                                    <Link to={`/home/follow`} style={{color:this.state.selectFollow.color,borderBottom:this.state.selectFollow.borderBottom,fontSize:'16px',marginLeft:'10px'}}>关注</Link>
                                    <Link to={`/home/create`} style={{color:this.state.selectCreate.color,borderBottom:this.state.selectCreate.borderBottom,fontSize:'24px',marginLeft:'10px'}}>创作</Link>
                                    <Link to={`/home`} style={{color:this.state.selectHome.color,borderBottom:this.state.selectHome.borderBottom,fontSize:'16px',marginLeft:'10px'}}>素材</Link>
                                    
                                </div>
                                <div style={{marginTop:'100px'}}>
                </div>
                                {this.state.data.map(data=>(
                    <div style={{width:'100%'}}>
                        <div style={{width:'93%',margin:'0 3.4% auto',backgroundColor:'#f1edea'}}>
                        
                            <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                                <img src="images/home/touxiang.png" style={{height:'80%',marginLeft:'2%',marginTop:'1%',marginRight:'1%'}} />
                                两朵小花
                            </div>
                            
                            <div></div>
                            <h2 style={{textAlign:'center',color:'#000'}}>{data.uname}</h2>
                            <div style={{height:'160px',overflow:'hidden',color:'#000'}}>{data.acontent}<br/>{data.atag}</div>
                            <Link to={{pathname:'/home/article/'+data.aid,state1:data.aid}}>
                                <span style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</span>
                            </Link>
                        </div>
                    </div>
                ))}
                                <Link to='/home/write'>
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
                        selected={this.state.selectedTab === '/composition'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/composition',
                            });
                            this.props.history.push('/composition')
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
                            this.props.history.push({pathname:'/mine',state:this.props.location.state})
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
