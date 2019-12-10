import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Write extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('/word');
    }
    render() {
        return (
            <div>
                <NavBar mode="light" icon={<Icon type="left" style={{color:'#000'}} />} onLeftClick={() => this.handleClick()}></NavBar>
                <div style={{float:'left',borderBottom:'1px dashed #000'}}>
                    <div style={{margin:'3%',paddingBottom:'5%',float:'left',backgroundColor:'#fff'}}>
                        <a style={{fontSize:'150%', float:'left',color:'#000',marginTop:'5%',marginLeft:'10%',marginRight:'10%',textAlign:'center'}}>愿你精致到老，眼里长着太阳，笑里全是坦荡</a>
                        <a style={{fontSize:'130%',float:'left',color:'#000',marginTop:'5%'}}>&nbsp;&nbsp;&nbsp;&nbsp;这篇文章，我想送给所有的女孩子。希望它可以为你带来力量，愿你任何时候都不缺从头再来的勇气。愿你所到之处，遍地阳光
                            愿你梦的远方，温暖为向
                            愿你成为一个简单、清澈、温暖而有力量的人，像星星一样努力发光
                            愿你眼中总有光芒，活成你想要的模样
                            愿你今后得之皆为所想，所想皆已得之
                            愿你轻松时别忘了努力，忙碌时别忘了梦想
                            愿你人间走一遭，圆满了三界六道，看透了是非善恶;从此福来心至，皆是逍遥
                            愿你有诗，有梦，有坦荡荡的远方，敬往事一杯酒，过去不回头，未来不将就
                            愿你梦的远方，温暖为向
                            愿你成为一个简单、清澈、温暖而有力量的人，像星星一样努力发光
                            愿你眼中总有光芒，活成你想要的模样
                            愿你今后得之皆为所想，所想皆已得之
                            愿你轻松时别忘了努力，忙碌时别忘了梦想
                            愿你人间走一遭，圆满了三界六道，看透了是非善恶;从此福来心至，皆是逍遥
                            愿你有诗，有梦，有坦荡荡的远方，敬往事一杯酒，过去不回头，未来不将就
                            愿你梦的远方，温暖为向
                            愿你成为一个简单、清澈、温暖而有力量的人，像星星一样努力发光
                            愿你眼中总有光芒，活成你想要的模样
                            愿你今后得之皆为所想，所想皆已得之
                            愿你轻松时别忘了努力，忙碌时别忘了梦想
                            愿你人间走一遭，圆满了三界六道，看透了是非善恶;从此福来心至，皆是逍遥
                            愿你有诗，有梦，有坦荡荡的远方，敬往事一杯酒，过去不回头，未来不将就
                        </a>

                        <div style={{float:'left',marginTop:'5%',paddingTop:'3%',paddingBottom:'3%',backgroundColor:'#e0e1f4',}}>
                            <a style={{float:'left',color:'#000',fontSize:'130%'}}>世界上只有一种真正的英雄主义，那就是在看清生活的真相之后，依然热爱生活。</a>                                           
                            <a style={{float:'right',color:'gray',marginTop:'3%',fontSize:'110%'}}>— —罗曼·罗兰</a>
                        </div>
                        <div style={{float:'left',marginTop:'5%',paddingTop:'3%',backgroundColor:'#fff',width:'100%',borderTop:'1px dashed #000'}}>
                            <Link to='/word' >
                                <a style={{color:'gray',fontSize:'110%'}}>更多作品</a>
                                <img src='./images/write/right.png' style={{width:'4%',height:'4%',float:'right'}} />
                            </Link>
                        </div>
                        
                    </div>
                </div>

                <div style={{float:'left',marginTop:'3%',marginLeft:'3%',marginRight:'3%',marginBottom:'15%'}}>
                    
                    <a style={{width:'100%',fontSize:'130%',paddingLeft:'5%',float:'left'}}> 热门评论</a>


                </div>

                <div style={{backgroundColor:'#fff',bottom:0,float:'left',width:'100%',position:'fixed',paddingLeft:'5%'}}>
                    <div style={{float:'left',width:'30%',textAlign:'center'}}>
                        <div style={{height:'80%'}}>
                            <img src='./images/write/zan1.png' style={{width:'23%',height:'23%'}}/>
                        </div>
                        
                        <a style={{}}>点赞</a>
                    </div>
                    <div style={{float:'left',width:'30%',textAlign:'center'}}>
                        <div style={{height:'80%'}}>
                            <img src='./images/write/collect1.png' style={{width:'23%',height:'23%'}}/>
                        </div>
                        
                        <a style={{}}>收藏</a>
                    </div>
                    <div style={{float:'left',width:'30%',textAlign:'center'}}>
                        
                        <div style={{height:'80%'}}>
                            <img src='./images/write/say.png' style={{width:'23%',height:'23%',}}/>
                        </div>
                        <a style={{color:'#000'}}>评论</a>
                                       
                    </div>
                    
                </div>
            </div>
        )
    }
}
