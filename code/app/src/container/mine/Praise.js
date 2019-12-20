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
                    {this.state.data.length!==0?this.state.data.map(data=>(
                        <div style={{width:'100%',whiteSpace:"pre-wrap"}}>
                            <div style={{width:'94%',marginTop:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',float:'left'}}>
                                        
                                                
                                <div style={{float:'left',width:'94%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',marginBottom:'3%'}}>
                                    <div style={{padding:'2%',float:'left',width:'96%',color:'gray',float:'left'}}>{data.utime}</div>
                                    <div style={{width:'94%',textAlign:'center',padding:'3%',color:'#000',fontSize:'150%',float:'left'}}>{data.atitle}</div>
                                    <div style={{width:'94%',height:'55px',overflow:'hidden',paddingLeft:'3%',paddingRight:'3%',color:'#000',fontSize:'120%',float:'left'}}>{data.acontent}</div>
                                    <div style={{padding:'3%',float:'left',width:'94%'}}>#{data.atag}</div><br/>

                                    <Link to={{pathname:'/home/mine/p/fopeople/fowrite/fowrite/article/'+data.aid+'/'+data.uid,state1:data.aid,state:this.props.location.state,state2:data.uid,mtab2:data.mid}} style={{}}>
                                        <a style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</a>
                                    </Link>
                                </div>
                                                
                            </div>
                        </div>
                    )):<div style={{height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'120%',marginLeft:'3%'}}>你还没有赞过别人哦~  </div>
                }
                </div>
            </div>
        )
    }
}
