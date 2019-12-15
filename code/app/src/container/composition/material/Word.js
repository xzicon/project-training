import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import {Link,Route,NavLink,Redirect} from 'react-router-dom';

export default class Word extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        
    }
    componentDidMount(){
        let mtab2 = this.props.location.mtab2;
        let id = this.props.location.search.split('=')[1] ? '':'new/';

        console.log(mtab2,id);
        fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/'+id+mtab2)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            let mtab2 = this.props.location.mtab2;
            let id = this.props.location.search.split('=')[1] ? '':'new/';
            fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/'+id+mtab2)
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({data:res.data});
                })
        }
    }
    fetchGood = (e)=>{
        let data = {
            uid:this.props.location.state,
            aid:this.props.location.state1
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/likes/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }
    render() {
        let path = this.props.match.path;
        // var u=this.props.location.search.split("=")[]
        console.log(path);
        return (
            <div style={{backgroundColor:'red',height:'300px'}}>
                <div>
                    <NavLink to={{pathname:`${path}`,search:'',mtab2:this.props.location.mtab2,state1:this.props.location.state1}}>最热</NavLink>
                    
                    <NavLink to={{pathname:`${path}`,search:'?id=new',mtab2:this.props.location.mtab2,state1:this.props.location.state1}}>最新</NavLink>
                    <div>
                    
                    </div>
                </div>
                <div style={{width:'100%'}}>
                    <div>
                    <div>
                    </div>
                    </div>
                </div>
                <div>
                {
                        this.state.data.map(data=>(
                            <div>
                                <br/>
                                <Link to={{pathname:'/composition/writing/'+data.aid,mtab2:data.mid,state1:data.aid,state:this.props.location.state}}>{data.atitle}</Link>
                                <br/>
                                {data.aid}
                                <br/>
                                <br/>
                                <div  onClick={(e)=>{this.fetchGood(e)}}>点赞</div>
                                {data.alikes}
                            </div>
                ))}
                </div>
            </div>
        )
    }
}
