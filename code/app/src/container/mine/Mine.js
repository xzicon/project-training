import React, { Component } from 'react'
import {Tabs,NavBar,TabBar,Flex,Icon, WhiteSpace,List,Button} from 'antd-mobile';
import {Link} from 'react-router-dom';
const Item = List.Item;
export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: '/mine',
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/me/'+uid+'/'+uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    
    render() {
        console.log(this.state.data);
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
                            this.props.history.push({pathname:'/home',state:this.props.location.state,state4:this.props.location.state4})
                        }}
                        >
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
                            selectedTab: '/composition/composition',
                            });
                            this.props.history.push({pathname:'/composition/composition',state:this.props.location.state})
                        }}
                        >
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
                        }}
                        >
                            <div>
                                <NavBar
                                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                                    onLeftClick={() => console.log('onLeftClick')}
                                    rightContent={
                                        <Link to={{pathname:'/home/news',state:this.props.location.state}}><img src="/images/home/remind.png" style={{float:'right', width:'100%',marginTop:'8px',marginRight:'8px'}} /></Link>
                                }></NavBar>
        
                                <div style={{width:'96%',marginLeft:'2%',marginRight:'2%',marginBottom:'2%',backgroundColor:'#fff',marginTop:'54px',fontSize:'16px',paddingBottom:'3%'}}>
                                    
                                    <Flex >
                                        {/* <div style={{position:'relative',height:'200px',width:'100%'}}> */}
                                            {/* <div style={{float:'left',width:'100%',height:'100%'}}>
                                                <img style={{width:'100%',height:'100%'}} src={'http://116.62.14.0:8402/images/'+this.state.data.uimage}/>
                                            </div> */}
                                            <div style={{float:'left',width:'100%',marginTop:'3%',marginLeft:'3%'}}>
                                                <Link to={{pathname:'/mine/m/m/m/m/m/mine/com/com/com/mine/fopeople',state:this.props.location.state,state4:this.state.data.uid}} style={{float:'left',width:'20%',height:'20%'}}><img style={{marginLeft:'2%',marginTop:'2%',borderRadius:'50%',width:'70px',height:'70px'}} src={'http://116.62.14.0:8402/images/'+this.state.data.uimage}/></Link>
                                                <div style={{width:'80%',float:'right',paddingTop:'2%',paddingLeft:'2%'}}>
                                                    <div style={{float:'left',width:'60%'}}>
                                                        <a style={{float:'left',width:'100%'}}>{this.state.data.uname}</a>
                                                        <a style={{float:'left',width:'100%',marginTop:'7%'}}>签名：{this.state.data.udescribe}</a>
                                                    </div>
                                                    
                                                    <Link to={{pathname:'/mine/personal',state:this.state.data.uid,uname:this.state.data.uname,udescribe:this.state.data.udescribe,uimage:this.state.data.uimage}}>
                                                        <button style={{backgroundColor:'white',border:'0.2px solid black',height:'30px',float:'right',marginRight:'4%'}}>编辑资料</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        
                                    </Flex>

                                    <Flex style={{marginTop:'5%',marginBottom:'3%'}}>
                                
                                        <div style={{width:'30%',marginLeft:'14%',color:'#000'}}>
                                            <Link to={{pathname:'/mine/follow/'+this.props.location.state,state:this.props.location.state,state2:this.props.location.state2}} style={{color:'#000'}}>
                                                关注
                                            </Link>
                                        </div>
                                        <div style={{width:'30%',marginLeft:'4%'}}>
                                            <Link to={{pathname:'/mine/mpraise',state:this.props.location.state}} style={{color:'#000'}}>
                                                获赞
                                            </Link>
                                        </div>              
                                        <div style={{width:'30%',marginLeft:'4%'}}>
                                            <Link to={{pathname:'/mine/fans/'+this.props.location.state,state:this.props.location.state,state2:this.props.location.state2}} style={{color:'#000'}}>
                                                {this.state.data.ufans}粉丝
                                            </Link>
                                        </div>  
                                    </Flex>
                                </div> 
                    
                                <div style={{width:'96%',margin:'2% 2% auto',backgroundColor:'#fff',paddingBottom:'3%',fontSize:'120%'}}>
                                    <br/>
                                    <Flex> 
                                        <div style={{width:'20%',marginLeft:'4%',textAlign:'center'}}>
                                            <Link to={{pathname:'/mine/collect',state:this.props.location.state}}>
                                            <img src='/images/mine/sc.png' style={{width:'50%',height:'10%'}} />
                                                <div style={{marginTop:'3%',color:'#000'}}>收藏</div>
                                            </Link>
                                        </div>    
                                        <div style={{width:'20%',textAlign:'center'}}>
                                            <Link to={{pathname:'/mine/write/'+this.props.location.state,state:this.props.location.state}} style={{color:'#000'}}>
                                            <img src='/images/mine/cz.png' style={{width:'38%',height:'10%'}} />
                                                <div  style={{marginTop:'2%'}}>创作</div>
                                            </Link>
                                        </div>   
                                        <div style={{width:'25%',textAlign:'center'}}>
                                            <Link to={{pathname:'/mine/praise/',state:this.props.location.state}} style={{color:'#000'}}>
                                            <img src='/images/mine/zan.png' style={{width:'29%',height:'10%'}} />
                                                <div  style={{marginTop:'3%'}}>我赞过的</div>
                                            </Link>
                                        </div>                    
                                        <div style={{width:'25%',textAlign:'center'}}>
                                            <Link to={{pathname:'/mine/mnew',state:this.props.location.state}} style={{color:'#000'}}>
                                            <img src='/images/mine/say.png' style={{width:'29%',height:'10%'}} />
                                                <div  style={{marginTop:'3%'}}>我评论的</div>
                                            </Link>
                                        </div>                    
                                    </Flex>
                                </div>

                                <div style={{width:'96%',backgroundColor:'#fff',margin:'3% 2% auto'}}>
                                    {/* <Link to={{pathname:'/',state:this.props.location.state}}> */}
                                        <List>
                                            <Item arrow="horizontal" multipleLine>
                                                关于我们
                                            </Item>
                                            <Link to={{pathname:'/mine/question',state:this.props.location.state}} style={{color:'#000'}}>
                                                <Item arrow="horizontal" multipleLine>常见问题</Item>
                                            </Link>
                                            <Item arrow="horizontal" multipleLine>
                                                帮助
                                            </Item>
                                            <Link to={{pathname:'/mine/feedback',state:this.props.location.state}} style={{color:'#000'}}>
                                            <Item arrow="horizontal" multipleLine>
                                                    意见反馈
                                            </Item>                                            
                                            </Link>
                                            <Link to={{pathname:'/mine/myset',state:this.props.location.state}} style={{color:'#000'}}>
                                                <Item arrow="horizontal" multipleLine>设置</Item>
                                            </Link>
                                        </List>
                                    
                                </div>
                            </div>
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}