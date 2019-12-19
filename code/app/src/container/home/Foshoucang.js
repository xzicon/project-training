import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar} from 'antd-mobile';
export default class Foshoucang extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state4;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/materialcollection/'+uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    // componentDidUpdate(){
    //     let uid=this.props.location.state4;
    //     console.log(uid);
    //     fetch('http://116.62.14.0:8402/login/materialcollection/'+uid)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //         console.log(res.data);
    //     })
    // }
    render() {
        return (
            <div>
                <div style={{width:'100%'}}>
                    
                    {this.state.data.length!==0?this.state.data.map(data=>(
                        <Link to={{pathname:'/home/f/s/tdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,state4:this.props.location.state4}}>
                        <div style={{width:'93%',marginBottom:'2%',backgroundColor:'#fff',padding:'3%',float:'left'}}>                      
                                <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                                    {data.mtime}
                                </div>
                                <div style={{width:'100%',color:'#000',fontSize:'130%',float:'left',fontWeight:'bold'}}>{data.mtitle}</div>
                                <div style={{width:'100%',color:'#000',fontSize:'100%',float:'left',marginTop:'2%',textAlign:'right'}}>{data.mlocal}</div>
                                {/* <div style={{width:'100%',color:'gray',fontSize:'110%',float:'left',marginTop:'2%'}}>{data.manalyse}</div> */}
                                {/* <div style={{width:'100%',color:'#000',fontSize:'120%',float:'left',marginTop:'2%',paddingBottom:'3%'}}>{data.mcontent}</div> */}
                            </div>
                        </Link>
                    )):<div>他还没有收藏~</div>}
                    
                </div>
            </div>
        )
    }
}
