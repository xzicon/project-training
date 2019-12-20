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
                 <div style={{width:'100%',position:'absolute',top:'50px',zIndex:'99'}}>
                    {this.state.data.length!==0?this.state.data.map(data=>(
                        <div style={{width:'100%',whiteSpace:"pre-wrap"}}>
                            <div style={{width:'94%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',float:'left'}}>
                                <div style={{float:'left',backgroundColor:'#cfc5bb',width:'100%',marginTop:'2%'}}>
                                    <div style={{float:'left',width:'100%',color:'#000',float:'left'}}>
                                        <img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'50px',height:'50px',marginLeft:'2%',marginTop:'1%',marginRight:'3%',borderRadius:'50%',float:'left'}} />
                                        <div style={{float:'left',paddingTop:'2%',width:'80%'}}>
                                            <div style={{float:'left',width:'100%',marginBottom:'2%',textAlign:'left'}}><a style={{fontSize:'110%'}}>{data.uname}</a></div>   
                                        </div>
                                                        
                                    </div>
                                    <div style={{float:'left',fontSize:'130%',margin:'3%',color:'#000',width:'96%',textAlign:'left'}}>点赞了&nbsp;&nbsp;&nbsp;&nbsp;{data.atitle}</div>
                                    
                                    
                                </div>
                                                
                            </div>
                        </div>
                    )):<div style={{height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'120%',marginLeft:'3%'}}>还没有人赞过你哦~  </div>
                }
                </div>
            </div>
        )
    }
}
