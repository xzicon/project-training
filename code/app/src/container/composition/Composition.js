import React, { Component } from 'react';
import { NavBar,Icon,Tabs, SearchBar } from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Composition extends Component {
    constructor(){
        super();
        //this.handleClick = this.handleClick.bind(this);
        this.state={
            
            essay:[
                {
                    title:'青年应识时变通',
                    article:'时代在变，物质在变，思潮在变，推动着人类无法抗拒地发生变化。作为时代先锋者的年轻人，无疑是变化最大的一代，他们越变越具有丰沛的活力与改造的能力，发挥着举足轻重的作用。',
                    collect:'collect1.png',
                    isCollect:false,
                    say:'say.png'
                },
                {
                    title:'大道万千，素履之往，独行其愿',
                    article:'什么是生命，是万人要将其消灭却仍兀自燃烧的焰火，是这江水留不住的春骄阳握不住的泉，亦或是那成全沧海显示生灵的妩媚青山',
                    collect:'collect1.png',
                    isCollect:false,
                    say:'say.png'
                }
            ]

        }
        
    }
    render() {
        return (
            
            <div >
                <div >
                    <Link to='/all'><img src='./images/write/all.png' style={{float:'left',width:'8%',height:'8%',marginTop:'2%',marginLeft:'2%'}} /></Link>
                    <SearchBar style={{width:'65%',height:'75%',backgroundColor:'#f5f5f9',float:'left',textAlign:'left'}} placeholder="输入关键字搜索"/>
                    <Link to='/inform'><img src='./images/write/inform.png' style={{float:'right',width:'7%',height:'7%',marginTop:'3%',marginRight:'4%'}} /></Link>
                    <Link to='/add'><img src='./images/write/jia.png' style={{float:'right',width:'7%',height:'8%',marginTop:'3%',marginRight:'3%'}} /></Link>
                </div>
                
                <div style={{backgroundColor:'#fff',float:'left',marginBottom:'3%',paddingBottom:'3%'}}>
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',marginTop:'5%',paddingLeft:'5%'}}> 素材</a>
                    <Link to='/material'><button  style={{float:'right',backgroundColor:'#fff',color:'#8fa0cb',borderRadius:'15%',outline:'none',border:'1px solid #8fa0cb',paddingTop:'2%',paddingBottom:'2%',marginRight:'5%'}} >查看更多</button></Link>
                    <div style={{marginTop:'3%'}}>
                        
                            <Link to='/word'  style={{height:'200px',float:'left',marginLeft:'5%',marginRight:'5%',marginBottom:'2%',paddingTop:'10%',backgroundColor:'#e0e1f4'}}>
                                
                                <a style={{float:'left',color:'#000',fontSize:'170%'}}>世界上只有一种真正的英雄主义，那就是在看清生活的真相之后，依然热爱生活。</a>
                                        
                                <a style={{float:'right',color:'gray',marginTop:'3%',fontSize:'130%'}}>— —罗曼·罗兰</a>
                               
                            </Link>

                            <Link to='/figure' style={{height:'200px',float:'left',marginLeft:'5%',marginRight:'5%',marginBottom:'2%',paddingTop:'2%',paddingBottom:'2%',backgroundColor:'#fff',position:'relative'}}>
                                        
                                <img src='./images/write/kh.jpg' style={{width:'100%',height:'fixheight'}} />
                                    
                                <a style={{color:'#fff',zIndex:'5',position:'absolute',left:'3%',bottom:'2%',fontSize:'140%'}}>康辉：主持界的大佬，网红界的清流</a>
                                    
                            </Link>

                        
                    </div>
                    
                </div>
                   
                    
                
                <div style={{backgroundColor:'#fff',float:'left',marginBottom:'3%'}}>
                    
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',marginTop:'2%',paddingLeft:'5%',marginBottom:'2%'}}> 范文</a>
                    <Link to='/essay'><button  style={{float:'right',backgroundColor:'#fff',color:'#8fa0cb',borderRadius:'15%',outline:'none',border:'1px solid #8fa0cb',paddingTop:'2%',paddingBottom:'2%',marginRight:'5%'}} >查看更多</button></Link>
                    <div style={{marginTop:'5%'}}>
                        {
                            this.state.essay.map((item,idx)=>(
                                <Link to='' style={{height:'200px',float:'left',marginLeft:'3%',marginRight:'3%',marginBottom:'2%',paddingTop:'8%',borderTop:'2px dashed #000'}}>
                                    <div style={{float:'left'}}>
                                        <img src='./images/write/fw1.jpg' style={{width:'40%',height:'fixheight',float:'left'}} />
                                        <div >
                                            <a style={{color:'#000',fontSize:'140%'}}>2016年全国I卷高考作文</a>
                                            <br />
                                            <a style={{color:'gray',fontSize:'130%',paddingTop:'5%'}}>分析:</a>
                                            <br/>
                                            <a style={{color:'#000',fontSize:'110%'}}>解读1：唯分论英雄 功利何其重 </a>
                                        </div>
                                    </div>
                                    
                                    <div style={{width:'35%',float:'right'}}>
                                        <img src={'./images/write/'+item.collect}   style={{width:'23%',height:'23%',marginLeft:'5%',marginRight:'25%'}} />
                                        <img src={'./images/write/'+item.say}  style={{width:'25%',height:'25%'}}  />
                                    </div>
                                    
                                </Link>
                            ))
                        }
                            
                        
                        
                    </div>
                </div>

                <div style={{width:'100%',backgroundColor:'#fff',float:'left',marginBottom:'3%'}}>
                    
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',marginTop:'2%',paddingLeft:'5%',marginBottom:'2%'}}> 技法</a>
                    <Link to='/skill'><button  style={{float:'right',backgroundColor:'#fff',color:'#8fa0cb',borderRadius:'15%',outline:'none',border:'1px solid #8fa0cb',paddingTop:'2%',paddingBottom:'2%',marginRight:'5%'}} >查看更多</button></Link>
                    <div style={{marginTop:'5%'}}>
                        
                                <Link to='' style={{height:'200px',width:'90%',float:'left',marginLeft:'5%',marginRight:'5%',marginBottom:'2%',paddingTop:'2%',paddingBottom:'2%'}}>
                                
                                    <a style={{float:'left',color:'#000',fontSize:'130%'}}>高中：如何写提纲</a>
                                    <br/><br/>
                                    <a style={{float:'left',color:'gray'}}>胸中有提纲，笔下出美章</a>
                                    
                                </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}
