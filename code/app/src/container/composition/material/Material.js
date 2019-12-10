import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import Character from './mkind/Character';

const tabs = [
    { title: '个性' },
    { title: '自律' },
    { title: '成长' },
    { title: '匠心' },
    { title: '自信' },
    { title: '坚持' },
    { title: '梦想' },
    { title: '热爱' },
    { title: '亲情' },
    { title: '友谊' },
  ];

export default class Material extends Component {
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
                
                <NavBar mode="light" icon={<Icon type="left" style={{color:'#000'}} />} onLeftClick={() => this.handleClick()}>素材</NavBar>
               
                <Tabs tabs={tabs} tabBarTextStyle={{fontSize:'95%'}} initialPage={0}  tabBarBackgroundColor='#fff'  tabBarInactiveTextColor='gray' tabBarActiveTextColor='red'  tabBarUnderlineStyle={{border:'2px solid red'}} >

                    
                        <Character />
                    
                </Tabs>

            </div>
        )
    }
}
