import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Tabs, WhiteSpace } from 'antd-mobile';
const tabs = [
    { title: '课程' },
    { title: '动态' },
];
export default class Me extends Component {
    constructor(){
        super();
        this.state={
            users:[
                {
                    title:'我今天一定要早睡',
                    sex:'女',
                    age:'20岁'
                }
            ],
            count:[
                {
                    follow:3,
                    fans:2,
                    hide:3
                }
            ]
        }
    }
    render() {
        return (
            <div style={{width:'100%',height:'100%',float:'left'}}>
                <div style={{width:'100%',height:'28%',float:'left',position:'relative',backgroundColor:'#fff'}}>
                    <div style={{width:'100%',height:'86%',overflow:'hidden'}}>
                    <img src='/images/my/head.jpg' 
                      style={{width:'100%'}}
                    />
                    </div>
                    <Link to='/mydetail'>
                    <div style={{width:'68px',height:'68px',position:'absolute',top:'60%',left:'7%'}}>
                     <img src='images/my/head.jpg' style={{border:'1px solid gray',borderRadius:'50%',width:'100%',height:'100%'}}/>
                    </div>
                    </Link>
                    <img src='images/my/settings.png'
                     style={{width:'25px',height:'25px',position:'absolute',top:'7%',right:'5%'}}
                    />
                </div>
                <div style={{width:'100%',height:'17%',float:'left',padding:'2% 2%',borderBottom:'1px solid gray',backgroundColor:'#fff'}}>
                    <span style={{fontSize:'16px',float:'left'}}>
                        {this.state.users[0].title}
                        </span>
                    <span style={{backgroundColor:'rgb(211, 209, 209)',marginLeft:'5%',float:'left'}}>
                        {this.state.users[0].age}
                        </span>
                    <div style={{width:'15%',height:'80%',float:'right',marginRight:'5%'}}>
                        <img style={{marginLeft:'10%'}} src='/images/my/vip.png'/>
                        <p style={{marginLeft:'15%',marginTop:0}}>会员</p>
                    </div>
                    <div style={{width:'50%',height:'75%',margin:'10% 0'}}>
                        <ul style={{width:'100%',height:'100%',padding:0}}>
                            <li style={{width:'20%',height:'100%',float:'left',listStyle:'none'}}>
                                <p style={{textAlign:'center',margin:0}}>{this.state.count[0].follow}</p>
                                <p style={{textAlign:'center'}}>关注</p>
                            </li>
                            <li style={{width:'20%',height:'100%',float:'left',listStyle:'none'}}>
                                <p style={{textAlign:'center',margin:0}}>{this.state.count[0].fans}</p>
                                <p style={{textAlign:'center'}}>粉丝</p>
                            </li>
                            <li style={{width:'20%',height:'100%',float:'left',listStyle:'none'}}>
                                <p style={{textAlign:'center',margin:0}}>{this.state.count[0].hide}</p>
                                <p style={{textAlign:'center'}}>收藏</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{width:'100%',height:'55%'}}>
                <WhiteSpace />
                <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
             
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
             
                    </div>
                </Tabs>
                <WhiteSpace />
                </div>
            </div>
        )
    }
}
