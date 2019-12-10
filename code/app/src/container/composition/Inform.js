import React, { Component } from 'react';
import { NavBar,Icon,Tabs, SearchBar } from 'antd-mobile';


export default class Inform extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('/composition');
    }
    render() {
        return (
            <div style={{backgroundColor:'#fff'}}>
            
            <NavBar mode="light" icon={<Icon type="left" style={{color:'#000'}} />} onLeftClick={() => this.handleClick()}>消息中心</NavBar>
                
            
            </div>
        )
    }
}