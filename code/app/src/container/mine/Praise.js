import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar,Flex} from 'antd-mobile';
export default class Praise extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state;
        let aid = this.props.location.state1;
        console.log(uid);
        console.log(aid);
        fetch('http://116.62.14.0:8402/login/marticlelikes/'+uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/mine',state1:this.props.location.state1,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>我赞过的</NavBar>
                    <div style={{width:'100%',position:'absolute',top:'50px',zIndex:'99'}}>
                    {this.state.data.map(data=>(
                    <div style={{width:'93%',margin:'0 3.4% auto',backgroundColor:'#f1edea'}}>                      
                        <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                            {data.utime}
                        </div>
                        <h2 style={{textAlign:'center',color:'#000'}}>{data.atitle}</h2>
                        <div style={{height:'100px',overflow:'hidden',color:'#000'}}>{data.acontent}<br/></div>
                        <br/>#{data.atag}
                    </div>
                ))}
                </div>
            </div>
        )
    }
}
