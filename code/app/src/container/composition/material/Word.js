import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Word extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state={
            write:[
                {
                    pic:'cat.jpg',
                    name:'中也',
                    time:'2019-10-14',
                    title:'愿你精致到老，眼里长着太阳，笑里全是坦荡',
                    body:'这篇文章，我想送给所有的女孩子。希望它可以为你带来力量，愿你任何时候都不缺从头再来的勇气。',

                },
                {
                    pic:'cat.jpg',
                    name:'中也',
                    time:'2019-10-14',
                    title:'愿你精致到老，眼里长着太阳，笑里全是坦荡',
                    body:'这篇文章，我想送给所有的女孩子。希望它可以为你带来力量，愿你任何时候都不缺从头再来的勇气。',

                },
                
            ]
        }
        
    }
    handleClick(){
        this.props.history.push('/composition');
    }
    render() {
        return (
            <div >
                <NavBar mode="light" icon={<Icon type="left" style={{color:'#000'}} />} onLeftClick={() => this.handleClick()}></NavBar>
                <div style={{float:'left',marginBottom:'3%'}}>
                    <div style={{marginTop:'5%',marginLeft:'3%',marginRight:'3%',float:'left'}}>
                        <a style={{float:'left',color:'#000',fontSize:'150%'}}>世界上只有一种真正的英雄主义，那就是在看清生活的真相之后，依然热爱生活。</a>
                                            
                        <a style={{float:'right',color:'gray',marginTop:'3%',fontSize:'110%'}}>— —罗曼·罗兰</a>
                    </div>

                    <div style={{marginTop:'5%',marginLeft:'3%',marginRight:'3%',float:'left'}}>
                        <a style={{float:'left',color:'#000',fontSize:'110%'}}>适用主题：</a>
                        <a style={{float:'left',color:'#000',fontSize:'110%'}}>坚定信念，拥抱生活，追求理想，拼搏的青春，调整心态，热爱生命等作文立意。如2015年北京卷《深入灵魂的热爱》，2015年江苏卷《智慧》。</a>
                    </div>

                    <div style={{marginTop:'5%',marginLeft:'3%',marginRight:'3%',paddingBottom:'5%',float:'left',borderBottom:'1px dashed #000'}}>
                        <a style={{float:'left',color:'#000',fontSize:'110%'}}>示例：</a>
                        <a style={{float:'left',color:'#000',fontSize:'110%'}}>生活总给我们以困境和挫折，平庸的人便开始厌弃生活，自暴自弃，而真正强大的人，会将这些苦难都当作生活的馈赠，磨砺自己的内心。罗曼·罗兰曾说：“世界上只有一种真正的英雄主义，那就是在看清生活的真相之后，依然热爱生活。”历经艰险而对生活怀有赤诚的热爱，这才是真正的强大，真正豁达的英雄主义。</a>
                        
                    </div>
                </div>

                <div style={{float:'left',marginLeft:'3%',marginRight:'3%'}}>
                    
                    <a style={{width:'100%',borderLeft:'5px  solid red',fontSize:'130%',paddingLeft:'5%',float:'left'}}> 热门练笔</a>
                    <div style={{float:'left',marginTop:'3%',marginBottom:'15%'}}>
                        {
                            this.state.write.map((item,idx)=>(
                                <Link to='/write' key={idx} style={{height:'250px',float:'left',marginBottom:'2%',backgroundColor:'#fff'}}>
                                    <div style={{float:'left',marginTop:'3%',marginLeft:'3%'}}>
                                        <img src={'./images/write/'+item.pic} style={{width:'15%',height:'15%',borderRadius:'50%',float:'left'}} />
                                        <div style={{float:'left',marginLeft:'3%'}}>
                                            <a style={{width:'60%', float:'left',color:'#000',marginLeft:'5%',marginTop:'3%'}}>{item.name}</a>
                                            <a style={{fontSize:'80%',float:'left',color:'#968696',marginLeft:'5%',marginTop:'5%'}}>{item.time}</a>
                                        </div>
                                        <div style={{float:'left',width:'100%',height:'140px'}}>
                                            <a style={{width:'100%',fontSize:'150%', float:'left',color:'#000',marginTop:'3%',textAlign:'center'}}>{item.title}</a>
                                            <a style={{fontSize:'120%',float:'left',color:'#000',marginTop:'3%'}}>&nbsp;&nbsp;&nbsp;&nbsp;{item.body}</a>
                                        </div>
                                        <div style={{float:'left',marginTop:'3%'}}>
                                            <img src='./images/write/zan1.png'   style={{width:'7%',height:'7%',marginRight:'2%'}} /><a style={{color:'#000',fontSize:'120%',marginRight:'10%'}}>赞同</a>
                                            <img src='./images/write/collect1.png'   style={{width:'7%',height:'7%',marginRight:'2%'}} /><a style={{color:'#000',fontSize:'120%',marginRight:'10%'}}>收藏</a>
                                            <img src='./images/write/say.png'  style={{width:'8%',height:'8%',marginRight:'2%'}}  /><a style={{color:'#000',fontSize:'120%'}}>评论</a>
                                    
                                        </div>
                                    </div>
                                    
                                    
                                </Link>
                            ))
                        }
                    </div>
                    
                </div>

                <div style={{backgroundColor:'#fff',bottom:0,float:'left',width:'100%',position:'fixed'}}>
                    <div style={{float:'left',textAlign:'center'}}>
                        <div style={{height:'80%'}}>
                            <img src='./images/write/collect1.png' style={{width:'15%',height:'15%'}}/>
                        </div>
                        
                        <a style={{}}>收藏</a>
                    </div>
                    <div style={{float:'left',textAlign:'center'}}>
                        <Link to='/writing'>
                            <div style={{height:'80%'}}>
                                <img src='./images/write/write.png' style={{width:'15%',height:'15%',}}/>
                            </div>
                            <a style={{color:'#000'}}>练笔</a>
                        </Link>
                    
                    </div>
                    
                </div>
                
            </div>
        )
    }
}
