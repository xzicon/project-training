import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar,Flex,Toast} from 'antd-mobile';

export default class Follow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let page=this.props.location.state;
        console.log(page);
        fetch('http://116.62.14.0:8402/login/userconcern/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
        console.log(this.state.data.uid);
    }
    // componentDidUpdate(){
    //     let page=this.props.location.state;
    //     console.log(page);
    //     fetch('http://116.62.14.0:8402/login/userconcern/'+page)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //         console.log(res.data);
    //     })
    // }
    fetchConcern = (e)=>{
        let item = e.target.parentNode.parentNode;
        console.log(item);
        console.log(item.children[0].innerHTML);
        let obj = {upid:item.children[0].innerHTML}
        let data = {
            uid:this.props.location.state,
            upid:obj.upid
        }
        console.log(data.upid);
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
                    Toast.success('关注成功', 1);
                    console.log(data.data);
                    break;
                }
                case "0":{
                    Toast.success('取消关注成功', 1);
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
        console.log(this.state.data);
        return (
            <div>
                    <div>
                <NavBar
                    icon={<Link to={{pathname:'/mine',state1:this.props.location.state1,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>我的关注</NavBar>
                <div style={{width:'100%',position:'absolute',top:'50px',fontSize:'16px'}}>
                {this.state.data.length!==0?this.state.data.map(data=>(
                    <div style={{width:'96%',margin:'2% 2% auto',height:'60px',backgroundColor:'#fff',marginTop:'10px',padding:'4% 4%'}}>
                        <Flex>
                        <div style={{width:'0'}}>{data.uid}</div>
                            <div style={{marginRight:'10%'}}><img src={`http://116.62.14.0:8402/images/${data.uimage}`} style={{height:'60px'}}/></div>
                            <div style={{marginRight:'22%'}}>{data.uname}</div>
                            <div><input type='button' onClick={(e)=>{this.fetchConcern(e)}} class='follow' value='已关注' style={{width:'80px',height:'40px',borderRadius:'20%',backgroundColor:'#fff'}} /></div>
                        </Flex>
                    </div>
                    )):<div>你还没有关注任何人哦</div>}
                </div>
                </div>
                
            </div>
        )
    }
}
