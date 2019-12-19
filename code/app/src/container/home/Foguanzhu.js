import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar,Flex} from 'antd-mobile';
export default class Foguanzhu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let page=this.props.location.state4;
        let page1=this.props.location.state;
        console.log(page,page1);
        fetch('http://116.62.14.0:8402/login/guanzhu/'+page+'/'+page1)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    // componentDidUpdate(){
    //     let page=this.props.location.state4;
    //     console.log(page);
    //     fetch('http://116.62.14.0:8402/login/userconcern/'+page)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //         console.log(res.data);
    //     })
    // }
    fetchConcern = (e)=>{
        let data = {
            uid:this.props.location.state,
            upid:this.props.location.state4
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/login/userconcern', {
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
        return (
            <div>
                
                <div style={{width:'100%',fontSize:'16px'}}>
                    {this.state.data.length!==0?this.state.data.map(data=>(
                        <div>
                            <div style={{width:'96%',height:'70px',backgroundColor:'#fff',padding:'2% 2%',marginBottom:'2%'}}>
                                <div style={{width:'70%',float:'left',marginTop:'1%'}}>
                                    <img src={`http://116.62.14.0:8402/images/${data.uimage}`} style={{width:'55px',height:'55px',borderRadius:'50%',float:'left'}}/>
                                    <div style={{width:'70%',float:'left'}}>
                                        <div style={{float:'left',fontSize:'110%',paddingTop:'3%',paddingLeft:'8%',width:'100%'}}>{data.uname}</div>
                                        <div style={{float:'left',fontSize:'90%',paddingTop:'3%',paddingLeft:'5%',width:'100%'}}>简介：{data.udescribe}</div>
                                    </div>
                                   
                                </div>
                                {data.woid===null?<div style={{width:'20%',float:'left',marginTop:'3%',marginLeft:'5%'}}><input type='button' onClick={(e)=>{this.fetchConcern(e)}} class='follow' value='关注' style={{width:'75px',height:'35px',borderRadius:'20%',backgroundColor:'#fff',outline:'none'}} /></div>:
                                <div style={{width:'20%',float:'left',marginTop:'3%',marginLeft:'5%'}}><input type='button' onClick={(e)=>{this.fetchConcern(e)}} class='follow' value='已关注' style={{width:'75px',height:'35px',borderRadius:'20%',backgroundColor:'#fff',outline:'none'}} /></div>} 
                            </div>
                        </div>
                    )):<div>他还没有关注过任何人</div>}
                </div>
            </div>
        )
    }
}