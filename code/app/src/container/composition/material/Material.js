import React, { Component } from 'react';
import { NavBar,Tabs,Icon, Flex} from 'antd-mobile';
import {NavLink,Link,Route} from 'react-router-dom';
export default class Material extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    }
    componentDidMount(){
        let mtab1 = this.props.location.mtab1;
        let state = this.props.location.state;
        let id = (this.props.location.search.split('=')[1]=== 'zuire' || this.props.location.search.split('=')[1])? 'zuire/' :'zuixin/';
        console.log(mtab1,id);
        console.log(state);
        fetch('http://116.62.14.0:8402/material/'+id+mtab1)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            let mtab1 = this.props.location.mtab1;
            let id = this.props.location.search.split('=')[1]==='zuire' || this.props.location.search==='' ? 'zuire/':'zuixin/';
            fetch('http://116.62.14.0:8402/material/'+id+mtab1)
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({data:res.data});
                })
        }
    }
    render() {
        let path = this.props.match.path;
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/composition/all',mtab:this.props.location.mtab,state:this.props.location.state,mtab1:this.props.location.mtab1}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>素材</NavBar>
                    
                    <div style={{backgroundColor:'#fff',position:'absolute',top:'50px'}}>
                    <NavLink to={{pathname:`${path}`,search:'?id=zuire',mtab1:this.props.location.mtab1,state:this.props.location.state,state1:this.props.location.state1}}>最热</NavLink>     
                    <NavLink to={{pathname:`${path}`,search:'?id=zuixin',mtab1:this.props.location.mtab1,state:this.props.location.state,state1:this.props.location.state1}}>最新</NavLink>
                    {
                        this.state.data.map(data=>(
                            <div>
                                <div style={{width:'100%'}}>
                        <div>
                            
                        </div>
                    </div>
                                <Link to={{pathname:'/composition/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,state1:this.props.location.state1}}>{data.mtitle}</Link>
                        </div>
                    ))}
                    
                    </div>
            </div>
        )
    }
}
