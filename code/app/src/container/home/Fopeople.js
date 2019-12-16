import React, { Component } from 'react'
import {Tabs,NavBar,TabBar,Flex,Icon, WhiteSpace,List} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
import Fowrite from '../mine/Fowrite';
export default class Fopeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: '/mine',
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state4;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/me/'+uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        let url = this.props.match.url;
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/home',state4:this.props.location.state4,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}></NavBar>
          <div style={{width:'96%',margin:'2% 2% auto',backgroundColor:'#fff',marginTop:'54px',fontSize:'16px'}}>
              <Flex>
            <img style={{marginLeft:'10px',marginTop:'10px',borderRadius:'100%',width:'24%'}} src='/images/apptab/inform (2).png'/>
            <div style={{width:'80%',float:'right',backgroundColor:'white',paddingLeft:'2%',paddingTop:'2%'}}>
                <a>昵称：{this.state.data.uname}</a>
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
                    
                    </div>
                    <div style={{width:'30%',marginLeft:'4%'}}>
                    
                    </div>              
                    <div style={{width:'30%',marginLeft:'4%'}}>
                        
                    </div>  
                </Flex>
                <br/>
                <Flex> 
                    <div style={{width:'20%',marginLeft:'5%'}}>
                    <Link to={{pathname:'/mine/collect',state4:this.props.location.state4,state:this.props.location.state}}>
                        收藏
                        </Link>
                    </div>    
                    <div style={{width:'20%'}}>
                    <Link to={{pathname:'/mine/follow/'+this.props.location.state4,state:this.props.location.state,state2:this.props.location.state2,state4:this.props.location.state4}}>
                        关注
                        </Link>
                    </div>   
                    <div style={{width:'20%'}}>
                    <Link to={{pathname:'/mine/fans/'+this.props.location.state4,state4:this.props.location.state4,state2:this.props.location.state2,state:this.props.location.state}}>
                            {this.state.data.ufans}
                            <br/>
                        粉丝
                        </Link>
                    </div>                    
                    <div style={{width:'20%',marginLeft:'10%'}}>
                    <Link to={{pathname:'/mine/mpraise',state4:this.props.location.state4,state:this.props.location.state}}>
                        获赞
                        </Link>
                    </div>             
                </Flex>
            </div>
            <div><Link to={{pathname:url+this.props.location.state4,state4:this.props.location.state4,state:this.props.location.state}}>
                        创作
                        </Link></div>
            <div><Route path={`${url}`} component={Fowrite} /></div>
        </div>
        )
    }
}
