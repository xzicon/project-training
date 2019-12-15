import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
import Smcomment from './Smcomment';
import Word from './material/Word';
// import Rword from '../../Rword';

export default class Sdetails extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    }
    
    componentDidMount(){
        let page = this.props.location.mtab2;
        console.log(page);
        fetch('http://116.62.14.0:8402/material/xiangqing/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    // componentDidUpdate(){
    //     let page = this.props.location.mtab2;
    //     fetch('http://116.62.14.0:8402/material/xiangqing/'+page)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //     })
    // }
    fetchGood = (e)=>{
        let data = {
            uid:this.props.location.state,
            mid:this.props.location.mtab2
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/likes/material', {
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
        return (
            <div>
                {this.state.data.map(data=>(
                <div>
                    <NavBar
                        icon={<Link to={{pathname:'/composition/material/'+data.msid,mtab1:data.msid,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                        style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                        onLeftClick={() => console.log('onLeftClick')}></NavBar>     
                    <div style={{top:'40px',position:'absolute',zIndex:'99',width:'100%'}}>
                    
                        <div>{data.mtitle}</div>
                        
                    </div>
                </div>
                ))}
                <div style={{zIndex:'100',top: '7%',position:'absolute',width:'96%',margin:'4% 2% auto'}}>
                    <Link to={{pathname:url,mtab2:this.props.location.mtab2,state:this.props.location.state}}>练笔</Link>
                    <Link to={{pathname:url+'/pinglun',mtab2:this.props.location.mtab2,state:this.props.location.state}}>评论</Link>
                </div>
                <div style={{marginTop:'100px'}}></div>
                <div style={{width:'100%'}}>
                    {/* <div>
                        <Link to={{pathname:'/composition/word/'+this.props.location.mtab2,mtab2:this.props.location.mtab2}}>最热</Link>
                        <Link to={{pathname:'/composition/xword/'+this.props.location.mtab2,mtab2:this.props.location.mtab2}}>最新</Link>
                    </div> */}
                    <div>
                    <Route path={`${url}`} exact component={Word}/>
                    <Route path={`${url}/pinglun/`} component={Smcomment}/>
                        {/* <Route path='/composition/word' component={Word}/>
                        <Route path='/composition/xword' component={Xword}/>  */}
                    </div>
                </div>
                <div style={{backgroundColor:'#fff',bottom:0,float:'left',width:'100%',position:'fixed'}}>
                    <div style={{float:'left',width:'40%',textAlign:'center'}}>
                        <div style={{height:'80%'}}>
                            <img src='/images/write/collect1.png' style={{width:'15%',height:'15%'}}/>
                        </div>
                        
                        <a style={{}} onClick={(e)=>{this.fetchGood(e)}}>收藏</a>
                    </div>
                    <div style={{float:'left',width:'40%',textAlign:'center'}}>
                        <Link to={{pathname:'/composition/lwrite',state:this.props.location.state,mtab2:this.props.location.mtab2}}>
                            <div style={{height:'80%'}}>
                                <img src='/images/write/write.png' style={{width:'15%',height:'15%'}}/>
                            </div>
                            <a style={{color:'#000'}}>练笔</a>
                        </Link>      
                    </div>         
                    <div style={{float:'left',width:'40%',textAlign:'center'}}>
                        <Link to={{pathname:'/composition/lcomment',state:this.props.location.state,mtab2:this.props.location.mtab2}}>
                            <div style={{height:'80%'}}>
                                <img src='/images/write/write.png' style={{width:'15%',height:'15%'}}/>
                            </div>
                            <a style={{color:'#000'}}>评论</a>
                        </Link>      
                    </div>               
                </div>
            </div>
        )
    }
}
