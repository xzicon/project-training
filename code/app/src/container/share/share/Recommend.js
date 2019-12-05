import React, { Component } from 'react';
import storage from './storage';

export default class Recommend extends Component {
    
    constructor(){
        super();
        
        this.state = {
            data:[
                {
                    pic:'logo.png',
                    name:'简眠官方',
                    time:'5小时前',
                    follow:'已关注',
                    isFollow:false,
                    article:'早安，今天你睡的好吗？今日睡眠小知识：睡前一杯温牛奶有助于睡眠哦！',
                    tag:'#早安##睡眠小知识#',
                    heart:'heart1.png',
                    isLove:false,
                    say:'say.png',
                    collect:'collect1.png',
                    isCollect:false,
                },
                {
                    pic:'cat.jpg',
                    name:'我今天一定要早睡',
                    time:'23分钟前',
                    follow:'关注',
                    isFollow:false,
                    article:'1.熬夜影响一个人的正常身体功能，这很容易影响健康。2.熬夜也对消化系统有危害。长时间熬夜会导致胃肠危机。',
                    tag:'#失眠##再不睡觉头就要秃了#',
                    heart:'heart1.png',
                    isLove:false,
                    say:'say.png',
                    collect:'collect1.png',
                    isCollect:false,
                }
            ]
            
        }
    }
    follow =(idx)=>{
        var data = [...this.state.data];
        if(!data[idx].isFollow){
            
            data[idx].isFollow=!data[idx].isFollow;
            data[idx].follow='已关注'
            this.setState({
                data
            },()=>{
                localStorage.setItem('data',this.state.data);
            })      
            
        }else{
            data[idx].isFollow=!data[idx].isFollow;
            data[idx].follow='关注'; 
            this.setState({
                data
            },()=>{
                localStorage.setItem('data',this.state.data);
            })  
        }
    }
    change1 = (idx)=>{
        var data = [...this.state.data];
        if(!data[idx].isLove){
            
            data[idx].isLove=!data[idx].isLove;
            data[idx].heart='heart2.png'
            this.setState({
                data
            },()=>{
                localStorage.setItem('data',this.state.data);
            })      
            
        }else{
            data[idx].isLove=!data[idx].isLove;
            data[idx].heart='heart1.png'
            this.setState({
                data
            },()=>{
                localStorage.setItem('data',this.state.data);
            })  
        }
    }
    change2 = (idx)=>{
        var data = [...this.state.data];
        if(!data[idx].isCollect){
            
            data[idx].isCollect=!data[idx].isCollect;
            data[idx].collect='collect2.png'
            this.setState({
                data
            },()=>{
                localStorage.setItem('data',this.state.data);
            })      
            
        }else{
            data[idx].isCollect=!data[idx].isCollect;
            data[idx].collect='collect1.png'
            this.setState({
                data
            },()=>{
                localStorage.setItem('data',this.state.data);
            })  
        }
    }
    render() {
        
        return (
            <div >
                {
                    this.state.data.map((item,idx)=>(
                        <div key={idx} style={{maxHeight:'180px',float:'left',overflow:'hidden', backgroundColor: '#fff',marginBottom:'2%',overflow:'hidden'}}>
                            <div >
                                <div style={{width:'65%',float:'left',marginTop:'3%',marginLeft:'3%'}}>
                                    <img src={'./images/share/'+item.pic} style={{width:'60px',height:'60px',borderRadius:'50%',float:'left'}} />
                                    <div >
                                        <a style={{width:'60%', float:'left',marginLeft:'5%',marginTop:'3%'}}>{item.name}</a>
                                        <a style={{fontSize:'80%',float:'left',color:'#968696',marginLeft:'5%',marginTop:'5%'}}>{item.time}</a>
                                    </div>
                                </div>
                                <div style={{width:'25%',float:'right',marginTop:'5%'}}>
                                    <button   onClick={()=>this.follow(idx)} style={{width:'80%',border:'1px solid #d3d3d3',outline:'none',borderRadius:'10%',backgroundColor:'#fff',paddingTop:'5%',paddingBottom:'5%',fontSize:'90%'}} >{item.follow}</button>
                                    
                                </div>
                            </div>
                            <div style={{maxHeight:'50px',float:'left',fontSize:'98%',marginTop:'3%',marginLeft:'3%',overflow:'hidden'}}>
                                <a >{item.article}</a><br/>
                            </div>
                            <div style={{float:'left',color:'#8fa0cb'}}>
                                <div style={{width:'60%',marginTop:'3%',marginLeft:'3%',fontSize:'95%',float:'left'}}>
                                    <a>{item.tag}</a>
                                    
                                </div>
                                <div style={{width:'37%',float:'right',marginTop:'3%'}}>
                                    <img src={'./images/share/'+item.heart}  onClick={()=>this.change1(idx)} style={{width:'15%',height:'15%',marginLeft:'5%',marginRight:'18%'}} />
                                    <img src={'./images/share/'+item.say} style={{width:'15%',height:'15%',marginRight:'18%'}}  />
                                    <img src={'./images/share/'+item.collect} onClick={()=>this.change2(idx)} style={{width:'15%',height:'15%'}}  />
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    ))
                }




            </div>
        )
    }
}

