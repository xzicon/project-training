import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar,Icon } from 'antd-mobile';

export default class Fensi extends Component {
    
    constructor(){
        super();
        
        this.state = {
            data:[
                {
                    pic:'头像 男孩.png',
                    name:'奋发向上的好孩子',
                    time:'5小时前',
                    follow:'关注',
                    isFollow:false,
                    
                },
                {
                    pic:'头像 女孩.png',
                    name:'我爱学习',
                    time:'23分钟前',
                    follow:'关注',
                    isFollow:false,
                    
                },
                {
                    pic:'头像 男孩.svg',
                    name:'我今天一定要写作',
                    time:'55分钟前',
                    follow:'关注',
                    isFollow:false,
                    
                },
                {
                    pic:'头像 女孩 (1).png',
                    name:'ARBITRARY ',
                    time:'15分钟前',
                    follow:'关注',
                    isFollow:false,
                    
                } ,
                {
                    pic:'头像 女孩 (2).png',
                    name:'神奇海螺',
                    time:'23分钟前',
                    follow:'关注',
                    isFollow:false,
                    
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
    
   
    render() {
        
        return (
        <div> 
            <div>
                <NavBar icon={<Link to='/mine'><Icon  type="left" /></Link>} style={{backgroundColor:'rgb(231, 231, 231)',color:'black'}} onLeftClick={() => console.log('onLeftClick')}>
                    关注我的人
                </NavBar>
            </div>
                {
                    this.state.data.map((item,idx)=>(
                        <div key={idx} style={{maxHeight:'200px',float:'left',overflow:'hidden', backgroundColor: '#fff',marginBottom:'5%',overflow:'hidden',float:'left',width:"100%"}}>
                            <div >
                                <div style={{width:'65%',float:'left',marginTop:'3%',marginLeft:'3%'}}>
                                    <img src={'./images/apptab/'+item.pic} style={{width:'60px',height:'60px',borderRadius:'50%',float:'left'}} />
                                    <div >
                                        <a style={{width:'60%', float:'left',marginLeft:'5%',marginTop:'3%'}}>{item.name}</a>
                                        <a style={{fontSize:'80%',float:'left',color:'#968696',marginLeft:'5%',marginTop:'5%'}}>{item.time}</a>
                                    </div>
                                </div>
                                <div style={{width:'25%',float:'right',marginTop:'5%'}}>
                                    <button   onClick={()=>this.follow(idx)} style={{width:'80%',border:'1px solid #d3d3d3',outline:'none',borderRadius:'10%',backgroundColor:'#fff',paddingTop:'5%',paddingBottom:'5%',fontSize:'90%'}} >{item.follow}</button>
                                </div>
                            </div>
                           
                        </div>
                    ))
                }
            </div>
        )
    }
}

