import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/article/'+uid)
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
                    onLeftClick={() => console.log('onLeftClick')}>我创作的</NavBar>
                <div style={{width:'100%'}}>
                    {this.state.data.map(data=>(
                        <div style={{width:'93%',margin:'0 3.4% auto',backgroundColor:'#f1edea'}}>                      
                            <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                                <img src={`http://116.62.14.0:8402/images/1.png`} style={{height:'90%',marginLeft:'2%',marginTop:'1%',marginRight:'1%'}} />
                                {data.utime}
                            </div>
                            <h2 style={{textAlign:'center',color:'#000'}}>{data.atitle}</h2>
                            <div style={{height:'100px',overflow:'hidden',color:'#000'}}>{data.acontent}<br/></div>
                            <Link to={{pathname:'/mine/marticle/'+data.aid,state3:data.aid,state:this.props.location.state}}>
                                <span style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</span>
                            </Link>
                            <br/>#{data.atag}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
