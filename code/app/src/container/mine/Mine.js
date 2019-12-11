import React, { Component } from 'react'
import {Tabs,NavBar,TabBar,Flex,Icon} from 'antd-mobile';
import {Link} from 'react-router-dom';
import Header from './Header';

const font = ['关注','粉丝','获赞','评论'];
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
        fetch('http://116.62.14.0:8402/login/'+uid)
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
                        selected={this.state.selectedTab === '/composition'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/composition',
                            });
                            this.props.history.push({pathname:'/composition',state:this.props.location.state})
                        }}
                        >
                            {/* <div>composition</div> */}
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
                                    <Link to='/home/news'><img src="/images/mine/remind.png" style={{float:'right', width:'100%',marginTop:'8px',marginRight:'8px'}} /></Link>
                                }
                            ></NavBar>
                            <div style={{width:'100%',float:'left',marginBottom:'6%',top:'40px',position:'absolute',zIndex:'99'}}>
                                <div style={{width:'92%',margin:'2% 4% auto'}}>
                                    <Flex>
                                    <div style={{width:'60px',height:'60px'}}>
                                        <img src='images/mine/touxiang.png' style={{border:'0px solid gray',borderRadius:'50%',width:'100%',height:'100%'}}/>
                                    </div>
                                        <div>
                                            <span style={{fontSize:'20px',float:'left',width:'100%',marginBottom:'2%'}}>
                                                {this.state.data.uid}
                                            </span>
                                            <br/>
                                            <span style={{float:'left',width:'100%'}}>
                                                妙笔ID:{this.state.data.uemail}
                                            </span>
                                            <br/>
                                            <span style={{float:'left',width:'100%'}}>
                                                {this.state.data.udescribe}
                                            </span>
                                        </div>
                                    <div style={{float:'right',width:'20%'}}></div>
                                    <div style={{float:'right',width:'20%'}}>
                                        <button style={{color:'#000',border:'1px solid gray',backgroundColor:'#fff',width:'110%',height:'30px'}}>编辑资料</button>
                                    </div>
                                    </Flex>
                                    <div style={{width:'96%',margin:'2% 2% auto'}}>
                                        <Flex>
                                            {
                                            font.map((item)=>(
                                                <div style={{color:'#000',border:'1px solid gray',backgroundColor:'#fff',width:'13%',height:'22px',margin:'2% 6%',fontSize:'16px',textAlign:'center'}}>{item}</div>
                                            ))
                                            }
                                        </Flex>
                                    </div>
                                </div>
                                <div style={{zIndex:'100',top: '23%',position:'fixed',width:'100%',bottom:'0'}}>
                                <div style={{float:'left',lineHeight:'50px'}}>
                                    <Link to={{pathname:'/mine/write'}}>练笔</Link>
                                    <Link to={{pathname:'/mine/collect',state:this.props.location.state}}>收藏</Link>
                                    <Link to={{pathname:'/mine/praise',state:this.props.location.state}}>点赞</Link>
                                    <Link to={{pathname:'/mine/follow',state:this.props.location.state}}>关注</Link>
                                    <Link to={{pathname:'/mine/fans',state:this.props.location.state}}>粉丝</Link>
                                </div>
                                </div>
                            </div>
                            
                        </div>
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}