import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
const tabs=[
    {title:'文字素材'},
    {title:'人物素材'}
]

export default class Character extends Component {
    render() {
        return (
            <div>
                 <Tabs tabs={tabs} tabBarTextStyle={{fontSize:'95%'}} initialPage={0}  tabBarBackgroundColor='#fff'  tabBarInactiveTextColor='gray' tabBarActiveTextColor='#000'  tabBarUnderlineStyle={{border:'2px solid #000'}} ></Tabs>
            </div>
        )
    }
}
