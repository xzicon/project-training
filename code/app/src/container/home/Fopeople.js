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
    render() {
        let url = this.props.match.url;
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/home',state4:this.props.location.state4,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000'}}
                    onLeftClick={() => console.log('onLeftClick')}></NavBar>
            <div>
                <Link to={{pathname:url,state4:this.props.location.state4,state:this.props.location.state}}>创作</Link>
                <Link to={{pathname:url+'/shoucang',state4:this.props.location.state4,state:this.props.location.state}}>收藏</Link>
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
