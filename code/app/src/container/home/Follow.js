import React, { Component } from 'react'
import {Carousel,WingBlank,Tabs,SearchBar,TabBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Create extends Component {
    constructor(props) {
        let arr = props.location.pathname.split('/');
        super(props);
        this.state = {
          selectedTab: '/'+arr[1]+'/home',
          selectHome:{
            color:'#000',
            borderBottom:'1px solid #fff'
        },
        selectCreate:{
            color:'#000',
            borderBottom:'1px solid #fff'
        },
        selectFollow:{
            color:'#d83e34',
            borderBottom:'4px solid #ffdf41'
        },
        data: [],
            
        };
    }
    componentDidMount(){
        let page = this.props.match.params;
        let arr = this.props.location.pathname.split('/');
        console.log(this.props.match.params);
        fetch('http://116.62.14.0:8402/article/uconcern/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        let arr = this.props.location.pathname.split('/');
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
                        title="首页"
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
                        selected={this.state.selectedTab === '/'+arr[1]+'/home'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/'+arr[1]+'/home',
                            });
                        }}
                        > 
                            <div>
                            <div style={{float:'left'}}>
                                <div style={{position: 'fixed',top: '0',zIndex:'100000',width:'100%',backgroundColor:'#f5f5f9',paddingTop:'2%',paddingBottom:'2%'}}>
                                <Link to={{pathname:'/'+arr[1]+'/home/search/follow',state:this.props.location.state}}><SearchBar style={{width:'100%',backgroundColor:'#f5f5f9',float:'left'}} placeholder="输入关键字搜索作文"/></Link>
                                </div>
                                <div style={{zIndex:'100',top: '8%',position:'absolute',width:'100%',backgroundColor:'#fff',paddingTop:'2%',paddingBottom:'3%'}}>
                                    <Link to={{pathname:'/'+arr[1]+'/home/follow',state:this.props.location.state}} style={{color:this.state.selectFollow.color,borderBottom:this.state.selectFollow.borderBottom,fontSize:'24px',marginLeft:'10px'}}>关注</Link>
                                    {/* <Link to={`/home/create`} style={{color:this.state.selectCreate.color,borderBottom:this.state.selectCreate.borderBottom,fontSize:'16px',marginLeft:'10px'}}>创作</Link> */}
                                    <Link to={{pathname:'/'+arr[1]+'/home',state:this.props.location.state}} style={{color:this.state.selectHome.color,borderBottom:this.state.selectHome.borderBottom,fontSize:'16px',marginLeft:'10px'}}>推荐</Link>
                                    </div>
                                </div>
                                <div style={{width:'100%',float:'left',marginTop:'95px'}}></div>
                                <div style={{float:'left'}}>
                                {this.state.data.length!==0?this.state.data.map(data=>(
                    <div style={{width:'100%',whiteSpace:"pre-wrap",float:'left'}}>
                        <div style={{width:'94%',marginTop:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',float:'left',paddingBottom:'2%',height:'250px'}}>
                        
                            <div style={{float:'left',width:'100%',color:'#000',float:'left',marginTop:'3%'}}>
                            <Link to={{pathname:'/'+arr[1]+'/'+data.aid+'/'+data.upid+'/home/f/fopeople/follow',state:this.props.location.state,state4:data.upid}}><img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'55px',height:'55px',marginLeft:'2%',marginRight:'3%',borderRadius:'50%',float:'left'}} /></Link>
                            <div style={{float:'left',paddingTop:'2%',width:'70%'}}>
                                <div style={{float:'left',width:'100%',marginBottom:'3%'}}><a style={{fontSize:'120%'}}>{data.uname}</a></div>
                                                        
                                <div style={{float:'left'}}><a style={{fontSize:'100%',color:'gray'}}>{data.utime}</a></div>
                            </div>
                        </div>
                            
                        <div style={{float:'left',width:'90%',marginLeft:'5%',marginRight:'5%'}}>
                            <Link to={{pathname:'/'+arr[1]+'/home/article/follow/'+data.aid+'/'+data.upid,state1:data.aid,state:this.props.location.state,state2:data.upid}}>
                                <div style={{textAlign:'center',color:'#000',fontSize:'150%',marginTop:'3%',marginBottom:'3%'}}>{data.atitle}</div>
                                <div style={{height:'75px',overflow:'hidden',color:'#000',fontSize:'120%',marginBottom:'5%'}}>{data.acontent}</div>
                            </Link>
                            <div style={{color:'#000',fontSize:'110%',marginBottom:'3%'}}>#{data.atag}</div>
                            <Link to={{pathname:'/'+arr[1]+'/home/follow/article/'+data.aid+'/'+data.upid,state1:data.aid,state:this.props.location.state,state2:data.upid}}>
                                <a style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</a>
                            </Link>
                        </div>
                        </div>
                    </div>
                )):<div style={{width:'100%',float:'left',height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'120%',marginLeft:'3%'}}>你还没有关注过别人哦~</div>}
                </div>
                                <Link to={{pathname:'/'+arr[1]+'/home/write/follow',state:this.props.location.state}}>
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
                        title="作文"
                        key="Composition"
                        selected={this.state.selectedTab === '/'+arr[1]+'/composition/composition'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/'+arr[1]+'/composition',
                            });
                            this.props.history.push({pathname:'/'+arr[1]+'/composition/composition',state:this.props.location.state})
                        }}
                        >
                            {/* <Composition/> */}
                        </TabBar.Item>
                        <TabBar.Item
                        icon={{ uri: 'images/apptab/mine.png' }}
                        selectedIcon={{ uri: 'images/apptab/mine1.png' }}
                        title="我的"
                        key="Mine"
                        selected={this.state.selectedTab === '/'+arr[1]+'/mine'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/'+arr[1]+'/mine',
                            });
                            this.props.history.push({pathname:'/'+arr[1]+'/mine',state:this.props.location.state})
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
