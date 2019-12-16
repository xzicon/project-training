import React, { Component } from 'react';
import { NavBar,Tabs,Icon, Flex} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';

export default class Character extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    }
    
    componentDidMount(){
        let mtab1 = this.props.location.mtab1;
        console.log(mtab1);
        fetch('http://116.62.14.0:8402/material/zuixin/'+mtab1)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    
    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/composition/all',mtab1:this.props.location.mtab1,mtab:this.props.location.mtab}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>素材</NavBar>
                    
                    <div style={{backgroundColor:'#fff',position:'absolute',top:'50px'}}>
                    
                    {
                        this.state.data.map(data=>(
                            <div>
                                <div style={{width:'100%'}}>
                        <div>
                            <Link to={{pathname:'/composition/material/'+this.props.location.mtab1,mtab1:this.props.location.mtab1,state:this.props.location.state}}>最热</Link>
                            <Link to={{pathname:'/composition/character/'+this.props.location.mtab1,state:this.props.location.state}}>最新</Link>
                        </div>
                    </div>
                                {data.mtitle}
                        </div>
                    ))}
                    </div>
            </div>
        )
    }
}