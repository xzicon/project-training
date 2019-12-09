import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';

const tabs = [
    { title: '高中' },
    { title: '初中' },
    { title: '小学' },
];

export default class Skill extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
    }
    handleClick(){
        this.props.history.push('/composition');
    }
    render() {
        return (
            <div>

                <NavBar mode="light" icon={<Icon type="left" style={{color:'#000'}} />} onLeftClick={() => this.handleClick()}>技法</NavBar>
                
                <Tabs tabs={tabs} tabBarTextStyle={{fontSize:'95%'}} initialPage={0}  tabBarBackgroundColor='#fff'  tabBarInactiveTextColor='gray' tabBarActiveTextColor='red'  tabBarUnderlineStyle={{border:'2px solid red'}} >

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        
                    </div>
                </Tabs>
            </div>
        )
    }
}
