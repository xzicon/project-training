import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar} from 'antd-mobile';
export default class Collect extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state;
        let upid = this.props.location.state4;
        let id = (upid===2)? uid : upid;
        console.log(uid,upid,id);
        fetch('http://116.62.14.0:8402/login/materialcollection/'+id)
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
                    onLeftClick={() => console.log('onLeftClick')}>收藏</NavBar>
                <div style={{width:'100%'}}>
                    
                    {this.state.data.map(data=>(
                        <Link to={{pathname:'/composition/mdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state}}>
                        <div style={{width:'93%',margin:'0 3.4% auto',backgroundColor:'#f1edea'}}>                      
                            <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                                {data.mtime}
                            </div>
                            <h2 style={{textAlign:'center',color:'#000'}}>{data.mtitle}</h2>
                    <div style={{height:'100px',overflow:'hidden',color:'#000'}}>{data.mlocal}<br/>{data.manalyse}<br/></div>
                            <br/>{data.mcontent}
                        </div>
                        </Link>
                    ))}
                    
                </div>
            </div>
        )
    }
}
