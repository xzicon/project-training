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
        console.log(page);
        fetch('http://116.62.14.0:8402/login/userconcern/'+page)
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
                
                    <div>
                <div style={{width:'100%',position:'absolute',top:'50px',fontSize:'16px'}}>
                {this.state.data.length!==0?this.state.data.map(data=>(
                    <div style={{width:'96%',margin:'2% 2% auto',height:'60px',backgroundColor:'#fff',marginTop:'10px',padding:'4% 4%'}}>
                        <Flex>
                            <div style={{marginRight:'10%'}}><img src={`http://116.62.14.0:8402/images/${data.uimage}`} style={{height:'60px'}}/></div>
                            <div style={{marginRight:'22%'}}>{data.uname}</div>
                            <div><input type='button' onClick={(e)=>{this.fetchConcern(e)}} class='follow' value='已关注' style={{width:'80px',height:'40px',borderRadius:'20%',backgroundColor:'#fff'}} /></div>
                        </Flex>
                    </div>
                    )):<div>他还没有关注过任何人</div>}
                </div>
                </div>
                
            </div>
        )
    }
}