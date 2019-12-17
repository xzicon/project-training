import React, { Component } from 'react'
import {Tabs,NavBar,TabBar,Flex,Icon, WhiteSpace,List} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
import Fowrite from './Fowrite';
import Foshoucang from './Foshoucang';
import Foguanzhu from './Foguanzhu';
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
    fetchConcern = (e)=>{
        let data = {
            uid:this.props.location.state,
            upid:this.props.location.state4
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/login/userconcern', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            switch (data.status) {
                case "0":{
                    console.log(data.data);
                    break;
                }
                default:{
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    render() {
        let url = this.props.match.url;
        console.log(url);
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/home',state4:this.props.location.state4,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000'}}
                    onLeftClick={() => console.log('onLeftClick')}></NavBar>
                    <input type='button' onClick={(e)=>{this.fetchConcern(e)}} class='follow' value='已关注' style={{width:'80px',height:'40px',borderRadius:'20%',backgroundColor:'#fff'}} />
            <div>
                <Link to={{pathname:url,state4:this.props.location.state4,state:this.props.location.state}}>创作</Link>
                <Link to={{pathname:url+'/shoucang',state4:this.props.location.state4,state:this.props.location.state,url:this.props.location.url}}>收藏</Link>
                <Link to={{pathname:url+'/guanzhu',state:this.props.location.state,state2:this.props.location.state2,state4:this.props.location.state4}}>关注</Link>
            </div>
            <div>
                <Route path={`${url}`} exact component={Fowrite}/>
                <Route path={`${url}/shoucang`} component={Foshoucang}/>
                <Route path={`${url}/guanzhu`} component={Foguanzhu}/>
            </div>
        </div>
        )
    }
}
