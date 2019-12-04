import React, { Component } from 'react';
import { NavBar,Icon,Tabs, SearchBar } from 'antd-mobile';
import Recommend from './share/Recommend';
import Topic from './share/Topic';
import Follow from './share/Follow';
import {Link} from 'react-router-dom';
const tabs = [
    { title: '推荐' },
    { title: '专题' },
    { title: '关注' },
    
  ];
export default class Share extends Component {
    
    render() {
        return (
            <div >
                <div>
                    <div >
                        <SearchBar style={{width:'74%',height:'75%',backgroundColor:'#f5f5f9',float:'left',textAlign:'left'}} placeholder="输入关键字搜索"/>
                        <Link to='/inform'><img src='./images/share/inform.png' style={{float:'right',width:'7%',height:'7%',marginTop:'3%',marginRight:'4%'}} /></Link>
                        <Link to='/add'><img src='./images/share/jia.png' style={{float:'right',width:'7%',height:'8%',marginTop:'3%',marginRight:'3%'}} /></Link>
                    </div>
                    <div style={{marginRight:'2%'}}>
                        
                        <Tabs tabs={tabs} tabBarTextStyle={{fontSize:'95%'}} initialPage={0}  tabBarBackgroundColor=''  tabBarInactiveTextColor='#8fa0cb' tabBarActiveTextColor='#8fa0cb'  tabBarUnderlineStyle={{border:'2px solid #8fa0cb'}} >

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Recommend />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Topic />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Follow />
                            </div>
                        </Tabs>
                        
                    </div>
                </div>

                
            </div>
        )
    }
}
