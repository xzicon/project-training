import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Marticle extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        let page = this.props.location.state3;
        console.log(page);
        fetch('http://116.62.14.0:8402/article/xiangqing/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchDelete = (e)=>{
        let data = {
            aid:this.props.location.state3
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/aud/delarticle', {
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
                    this.props.history.push({pathname:'/mine/write',state:this.props.location.state,state3:this.props.location.state3})
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
        return (
            <div>
                {this.state.data.map(data=>(
                    <div>
                <NavBar
                    icon={<Link to={{pathname:'/mine/write',state1:this.props.location.state1,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={
                        <input type='button' onClick={(e)=>{this.fetchDelete(e)}} style={{backgroundColor:'#da4036',fontSize:'18px',color:'#fff',border:'1px solid #da4036'}} value='删除' class='delete'/>
                    }>{data.atitle}</NavBar>
                <div style={{width:'100%'}}>
                    
                        <div style={{width:'93%',margin:'0 3.4% auto',backgroundColor:'#f1edea'}}>                      
                            <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                                <img src={`http://116.62.14.0:8402/images/1.png`} style={{height:'90%',marginLeft:'2%',marginTop:'1%',marginRight:'1%'}} />
                                {data.utime}
                            </div>
                            <h2 style={{textAlign:'center',color:'#000'}}>{data.atitle}</h2>
                            <div style={{height:'100px',overflow:'hidden',color:'#000'}}>{data.acontent}<br/></div>
                            <br/>#{data.atag}
                        </div>
                    
                </div>
                </div>
                ))}
            </div>
        )
    }
}
