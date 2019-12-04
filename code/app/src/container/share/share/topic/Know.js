import React, { Component } from 'react';
import { NavBar,Icon,Tabs } from 'antd-mobile';

const tabs = [
    { title: '最新' },
    { title: '最热' },
    
  ];

export default class Know extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        
    }
    handleClick(){
        this.props.history.push('/');
    }
    handleClick2(){
        this.props.history.push('/add');
    }

    render() {
        return (
            <div style={{backgroundColor:'#fff'}}>
                <div >
                    <NavBar style={{backgroundColor:'#fff',color:'#000'}}  leftContent={[
                        <img src="./images/share/back.png" style={{width:'20%',height:'40%'}}  onClick={this.handleClick} />
                    ]}>#每日睡眠打卡#</NavBar>
                </div>
                <div>
                    <img src='./images/share/topic.png' style={{width:'100%',height:'100%'}} />
                </div>
                <div >
                        
                    <Tabs tabs={tabs} tabBarTextStyle={{fontSize:'95%'}} initialPage={0}  tabBarBackgroundColor='#fff'  tabBarInactiveTextColor='#000' tabBarActiveTextColor='#000'  tabBarUnderlineStyle={{border:'2px solid #8fa0cb'}} >
                        <div style={{height:'300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <button onClick={this.handleClick2} style={{width:'40px',height:'40px',backgroundColor:'#b8c6fe',color:'#fff',borderRadius:'50%',outline:'none',border:'none'}}>+</button>
                        </div>
                        <div style={{height:'300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <button onClick={this.handleClick2} style={{width:'40px',height:'40px',top:'50%',right:'0',backgroundColor:'#b8c6fe',color:'#fff',borderRadius:'50%',outline:'none',border:'none'}}>+</button>
                        </div>
                    </Tabs>
                </div>
                
                    
                
            </div>
        )
    }
}
