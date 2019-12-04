import React, { Component } from 'react'
import storage from './storage';
export default class Follow extends Component {
    constructor(){
        super();
        
        this.state = {
            data:[
                {
                    pic:'logo.png',
                    name:'简眠官方',
                    time:'5小时前',
                    follow:'关注',
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
                    pic:'logo.png',
                    name:'简眠官方',
                    time:'5小时前',
                    follow:'关注',
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
                    pic:'logo.png',
                    name:'简眠官方',
                    time:'5小时前',
                    follow:'关注',
                    isFollow:false,
                    article:'早安，今天你睡的好吗？今日睡眠小知识：睡前一杯温牛奶有助于睡眠哦！',
                    tag:'#早安##睡眠小知识#',
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
            <div>
             {
                    this.state.data.map((item,idx)=>(
                        <div key={idx} style={{maxHeight:'200px',float:'left', backgroundColor: '#fff',marginBottom:'2%',overflow:'hidden'}}>
                            <div >
                                <div style={{width:'65%',float:'left',marginTop:'3%',marginLeft:'3%'}}>
                                    <img src={'./images/share/'+item.pic} style={{width:'60px',height:'60px',borderRadius:'50%',float:'left'}} />
                                    <div >
                                        <a style={{width:'60%', float:'left',marginLeft:'5%',marginTop:'3%'}}>{item.name}</a>
                                        <a style={{fontSize:'80%',float:'left',color:'#968696',marginLeft:'5%',marginTop:'5%'}}>{item.time}</a>
                                    </div>
                                </div>
                                {/* <div style={{width:'100%',float:'left',marginTop:'5%',marginLeft:'3%'}}>
                                    <img src='./images/share/logo.png' style={{width:'18%',height:'18%',borderRadius:'50%',float:'left'}} />
                                    <div >
                                        <a style={{float:'left',marginLeft:'10%',marginTop:'3%'}}>简眠官方</a>
                                        <a style={{fontSize:'80%',float:'left',color:'#968696',marginLeft:'10%',marginTop:'3.5%'}}>5小时前</a>
                                    </div>
                                </div> */}
                                {/* <div style={{width:'25%',float:'right',marginTop:'10%'}}>
                                    <button  onClick={()=>this.follow(idx)} style={{width:'85%',border:'1px solid #d3d3d3',outline:'none',borderRadius:'10%',backgroundColor:'#fff',paddingTop:'8%',paddingBottom:'8%',fontSize:'80%'}}>{this.state.follow}</button>
                                    
                                </div> */}
                            </div>
                            <div style={{float:'left',fontSize:'90%',marginLeft:'3%'}}>
                                <a style={{lineHeight:'200%'}}>早安，今天你睡的好吗？</a><br/>
                                <a style={{lineHeight:'200%'}}>今日睡眠小知识:</a><br/>
                                <a style={{lineHeight:'200%'}}>睡前一杯温牛奶有助于睡眠哦！</a>
                            </div>
                            <div style={{float:'left',color:'#8fa0cb'}}>
                                {/* <div style={{width:'50%',marginTop:'3%',marginLeft:'3%',fontSize:'90%',float:'left'}}>
                                    <a>#早安#</a>
                                    <a>#睡眠小知识#</a>
                                </div> */}
                                <div style={{width:'40%',marginTop:'2%',float:'left',marginLeft:'10px'}}>
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

