import React, { Component } from 'react'
import Mcnew from './Mcnew';
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar} from 'antd-mobile';
export default class Mnew extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/acomment/'+uid)
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
                    onLeftClick={() => console.log('onLeftClick')}>评论</NavBar>
                    <div style={{width:'100%',position:'absolute',top:'50px'}}>
                <Link to={{pathname:'/mine/mnew',state1:this.props.location.state1,state:this.props.location.state}}><span style={{fontSize:'18px'}}>素材评论</span></Link>
                <Link to={{pathname:'/mine/mnew/mcnew',state1:this.props.location.state1,state:this.props.location.state}}><span style={{fontSize:'18px'}}>文章评论</span></Link>
                </div>
                {this.state.data.map(data=>(
                    <div style={{width:'100%',position:'absolute',top:'80px',zIndex:'99'}}>
                    <div style={{width:'90%',margin:'2% 5% auto',backgroundColor:'#fff'}}>在作文--{data.aid}下发表了评论：</div>
                    <div style={{width:'90%',margin:'2% 5% auto',backgroundColor:'#fff'}}>
                        <span style={{fontSize:'16px'}}>{data.accontent}</span>
                        <br/>
                        {data.actime}
                    </div>
                </div>
                ))}
                <div>
                <Route path='/mine/mnew/mcnew' component={Mcnew}/>
                </div>
            
            </div>
        )
    }
}
