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
        this.state = {
            data:[
                {
                    pic:'inform2.png',
                    name:'专注睡眠一百年',
                    date:'11-27',
                    time:'02:32',
                    comment:'评论：好好睡觉'
                },
                {
                    pic:'inform2.png',
                    name:'专注睡眠一百年',
                    date:'11-27',
                    time:'02:32',
                    comment:'动态：熬夜的危害'
                },
            ]
        }
    }
    handleClick(){
        this.props.history.push('/share');
    }
    render() {
        return (
            <div style={{backgroundColor:'#fff'}}>
                <NavBar style={{backgroundColor:'#fff',border:'1px solid #d8d8d8'}}  leftContent={[
                            <img src="./images/share/back.png" style={{width:'15%',height:'40%'}}  onClick={this.handleClick} />
                ]}>
                    <Tabs tabs={tabs}  tabBarTextStyle={{fontSize:'95%'}} initialPage={0}  tabBarBackgroundColor=''  tabBarInactiveTextColor='#8fa0cb' tabBarActiveTextColor='#8fa0cb'  tabBarUnderlineStyle={{border:'2px solid #8fa0cb'}} >
                        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            通知
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            评论
                        </div> */}
                    </Tabs>
                </NavBar>
                <div>
                    {
                        this.state.data.map((item,idx)=>(
                            <div style={{backgroundColor:'#fff',float:'left',marginBottom:'1px',width:'100%',maxHeight:'60px'}}>
                                <div style={{marginTop:'1%',marginBottom:'1%'}}>
                                    <img src={'./images/share/'+item.pic} style={{width:'50px',height:'50px',borderRadius:'50%',float:'left'}} />
                                    
                                    <a style={{paddingtop:'5px',marginLeft:"5px"}}>
                                        {item.name}
                                    </a> 
                                    <a style={{fontSize:'60%',color:'gray',marginLeft:'15px'}}>
                                        赞了你
                                    </a>
                                    <a style={{fontSize:'60%',color:'gray',marginLeft:'50px'}}>
                                        {item.date} {item.time}
                                    </a><br/>
                                    <a style={{fontSize:"90%",marginLeft:'5px'}}>
                                      {item.comment}
                                    </a>
                               </div>
                               
                            </div>
                        ))
                    }
                </div>
                
                
            </div>
        )
    }
}