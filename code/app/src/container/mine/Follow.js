import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar,Flex} from 'antd-mobile';
export default class Follow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let state=this.props.location.state;
        console.log(state);
        fetch('http://116.62.14.0:8402/login/userconcern/'+state)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(){
        let state = this.props.location.state;
        fetch('http://116.62.14.0:8402/login/userconcern/'+state)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
        })
    }
    fetchConcern = (e)=>{
        let data = {
            uid:this.props.location.state,
            upid:this.props.location.state2
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
                {this.state.data.map(data=>(
                    <div>
                <NavBar
                
                    icon={<Link to={{pathname:'/mine',state1:this.props.location.state1,state:this.props.location.state,state4:data.uid}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>我的关注</NavBar>
                <div style={{width:'100%',position:'absolute',top:'50px',fontSize:'16px'}}>
                    
                    <div style={{width:'96%',margin:'2% 2% auto',height:'60px',backgroundColor:'#fff',marginTop:'10px',padding:'4% 4%'}}>
                        <Flex>
                            <div style={{marginRight:'10%'}}><img src={`http://116.62.14.0:8402/images/${data.uimage}`} style={{height:'60px'}}/></div>
                            <div style={{marginRight:'22%'}}>{data.uname}</div>
                            <div><input type='button' onClick={(e)=>{this.fetchConcern(e)}} class='follow' value='已关注' style={{width:'80px',height:'40px',borderRadius:'20%',backgroundColor:'#fff'}} /></div>
                        </Flex>
                    </div>
                    
                </div>
                </div>
                ))}
            </div>
        )
    }
}
