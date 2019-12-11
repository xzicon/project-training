import React, { Component } from 'react'
import {Icon,NavBar,Tabs,Flex} from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Collection extends Component {
    renderContent = item =>
    (<div style={{width:'100%',float:'left'}}>
    <Flex>
    {
        <Link to='/home/essay'>
        <div style={{width:'32%',position:'relative',marginBottom:'10px',marginTop:'10px',marginRight:'2%',color:'#000',backgroundColor:'#fff'}}>
            <img src={`/images/home/`+item.img} style={{width:'100%'}}/>
            <div style={{width:'47%',position:'absolute',top:'30%',fontSize:'160%',color:'#000',marginLeft:'26%',textAlign:'center',border:'1px solid #fff',borderRadius:'50%',backgroundColor:'#fff'}}>{item.name}</div>
            <div style={{width:'100%',top:'74%',fontSize:'14px',color:'#000',marginLeft:'4%',backgroundColor:'#fff'}}>{item.title1}</div>
        </div>
        </Link>
    }
    </Flex>
</div>);
    render() {
        const tabs=[
            {
                title:'推荐',
                name:'典故',
                title1:'寻找经典素材',
                img:'diangu.png'
            },
            {
                title:'人物',
                name:'诗词',
                title1:'古今诗词巨匠',
                img:'shici.png'
            },
            {
                title:'时事',
                name:'时政',
                title1:'透过热词看时政',
                img:'shizheng.png'
            }
        ];
        return (
            <div>
                <NavBar
                    icon={<Link to='/home'><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000'}}
                    onLeftClick={() => console.log('onLeftClick')}
                >素材合集</NavBar>
                <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} tabBarActiveTextColor='#d83e34' tabBarUnderlineStyle={{border:'0px solid #d83e34'}} />}>
                    {this.renderContent}
                </Tabs>
            </div>
        )
    }
}