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
                            <div style={{width:'94%',marginTop:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',float:'left'}}>
                                        
                                                
                                <div style={{float:'left',width:'94%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',marginBottom:'3%'}}>
                                    <div style={{padding:'2%',float:'left',width:'100%',color:'gray',float:'left'}}>{data.utime}</div>
                                    <div style={{width:'100%',textAlign:'center',paddingLeft:'3%',paddingRight:'3%',color:'#000',fontSize:'150%',float:'left'}}>{data.atitle}</div>
                                    <div style={{width:'100%',height:'50px',overflow:'hidden',paddingLeft:'3%',paddingRight:'3%',color:'#000',fontSize:'120%',float:'left'}}>{data.acontent}</div>
                                    <div style={{padding:'2%',float:'left',width:'100%'}}>#{data.atag}</div><br/>

                                    <Link to={{pathname:'/home/mine/p/fopeople/fowrite/fowrite/article/'+data.aid+'/'+data.uid,state1:data.aid,state:this.props.location.state,state2:data.uid,mtab2:data.mid}} style={{}}>
                                        <a style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</a>
                                    </Link>
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
