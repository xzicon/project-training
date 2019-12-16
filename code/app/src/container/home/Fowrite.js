import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Fowrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state4;
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
                        <div style={{width:'93%',backgroundColor:'#f1edea'}}>
                        {this.state.data.length!==0?this.state.data.map(data=>(
                               <div>              
                            <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                                <img src={`http://116.62.14.0:8402/images/1.png`} style={{height:'90%',marginLeft:'2%',marginTop:'1%',marginRight:'1%'}} />
                                {data.utime}
                            </div>
                            <h2 style={{textAlign:'center',color:'#000'}}>{data.atitle}</h2>
                            <div style={{height:'100px',color:'#000'}}>{data.acontent}<br/></div>
                            <br/><div>#{data.atag}</div>
                            </div>
                            )):<div>他还没有发表过文章</div>}
                        </div>
                    
                </div>
        )
    }
}
