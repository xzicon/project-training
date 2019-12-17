import React, { Component } from 'react'
import {Icon,NavBar,List} from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Praise extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state;
        console.log(uid);
        fetch('http://116.62.14.0:8402/message/zan/'+uid)
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
                    icon={<Link to={{pathname:'/home/news',state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                >点赞</NavBar>
                <br/>
                <div style={{top:'56px',position:'absolute',zIndex:'99',width:'100%',textAlign:'center',backgroundColor:'#fff'}}>
                {this.state.data.length!==0?this.state.data.map(data=>(
                    <div>
                        <br/>{data.uname}<br/>
                    </div>
                )):<div>无赞</div>}
                </div>
            </div>
        )
    }
}
