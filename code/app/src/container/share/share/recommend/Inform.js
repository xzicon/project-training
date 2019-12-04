import React, { Component } from 'react';
import { NavBar,Icon,Tabs, SearchBar } from 'antd-mobile';
const tabs = [
    { title: '通知' },
    { title: '评论' },
    
    
  ];

export default class Inform extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('/share');
    }
    render() {
        return (
            <div style={{backgroundColor:'#fff'}}>
                <div style={{border:'1px solid #d5d5d9',height:'30px'}}>
                    <img src="./images/share/back.png" style={{width:'8%',height:'80%'}}  onClick={this.handleClick} />
                </div>
                <Tabs tabs={tabs}  tabBarTextStyle={{fontSize:'95%'}} initialPage={0}  tabBarBackgroundColor=''  tabBarInactiveTextColor='#8fa0cb' tabBarActiveTextColor='#8fa0cb'  tabBarUnderlineStyle={{border:'2px solid #8fa0cb'}} 
                ></Tabs>
                
            </div>
        )
    }
}
