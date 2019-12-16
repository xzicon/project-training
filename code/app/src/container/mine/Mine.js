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
        fetch('http://116.62.14.0:8402/login/me/'+uid)
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
        
          <div style={{width:'96%',margin:'2% 2% auto',backgroundColor:'#fff',marginTop:'54px',fontSize:'16px'}}>
              <Flex>
            <img style={{marginLeft:'10px',marginTop:'10px',borderRadius:'100%',width:'24%'}} src={`http://116.62.14.0:8402/images/`+this.state.data.uimage}/>
            <div style={{width:'80%',float:'right',backgroundColor:'white',paddingLeft:'2%',paddingTop:'2%'}}>
                <a>昵称：{this.state.data.uname}</a>
              <Link to={{pathname:'/mine/personal',state:this.state.data.uid,uname:this.state.data.uname,udescribe:this.state.data.udescribe}}>
              <button style={{backgroundColor:'white',border:'0.2px solid black',height:'30px',float:'right',marginRight:'4%'}}>编辑资料</button>
              </Link>
           </div>
              
              </Flex>
              <div style={{margin:'2% 5% auto',width:'90%'}}>
                <p>邮箱：{this.state.data.uemail}</p>
            <p>签名：{this.state.data.udescribe}</p>
            </div>
            
          </div> 
          
            <div style={{width:'96%',margin:'2% 2% auto',backgroundColor:'#fff',marginTop:'10px',fontSize:'16px'}}>
                <Flex>
                    
                    <div style={{width:'30%',marginLeft:'14%'}}>
                    <Link to={{pathname:'/mine/follow/'+this.props.location.state,state:this.props.location.state,state2:this.props.location.state2}}>
                        关注
                        </Link>
                    </div>
                    <div style={{width:'30%',marginLeft:'4%'}}>
                    <Link to={{pathname:'/mine/mpraise',state:this.props.location.state}}>
                        获赞
                        </Link>
                    </div>              
                    <div style={{width:'30%',marginLeft:'4%'}}>
                        <Link to={{pathname:'/mine/fans/'+this.props.location.state,state:this.props.location.state,state2:this.props.location.state2}}>
                            {this.state.data.ufans}
                            <br/>
                        粉丝
                        </Link>
                    </div>  
                </Flex>
                <br/>
                <Flex> 
                    <div style={{width:'20%',marginLeft:'5%'}}>
                    <Link to={{pathname:'/mine/collect',state:this.props.location.state}}>
                        收藏
                        </Link>
                    </div>    
                    <div style={{width:'20%'}}>
                    <Link to={{pathname:'/mine/write/'+this.props.location.state,state:this.props.location.state}}>
                        创作
                        </Link>
                    </div>   
                    <div style={{width:'20%'}}>
                        <Link to={{pathname:'/mine/praise/',state:this.props.location.state}}>
                        我赞过的
                        </Link>
                    </div>                    
                    <div style={{width:'20%',marginLeft:'10%'}}>
                    <Link to={{pathname:'/mine/mnew',state:this.props.location.state}}>
                        我评论的
                        </Link>
                    </div>  
                             
                </Flex>
            </div>
            <div style={{width:'96%',backgroundColor:'#fff',margin:'2% 2% auto'}}>
                <Link to={{pathname:'/',state:this.props.location.state}}>
                    <List>
                        <Item arrow="horizontal" multipleLine>
                            <Link to={{pathname:'/mine/feedback',state:this.props.location.state}}>意见反馈</Link>
                        </Item>
                        <Item arrow="horizontal" multipleLine>
                            设置
                        </Item>
                    </List>
                    </Link>
            </div>
        </div>
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}