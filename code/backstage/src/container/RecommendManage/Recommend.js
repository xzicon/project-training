import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Recommend extends Component {
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/groom/all')
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.data);
            this.setState({
                data:res.data
            })
        })
    }
    render() {
        return (
            <div style={{width:'90%',height:'100%',margin:'2%'}}>
                <Link to='/home/material/sucai'>
                    <button className='recbtn' >添加推荐</button>
                </Link>
                <div style={{width:'100%',height:'92%'}}>
                    <ul className='works_title' style={{width:'100%',height:'50px'}}>
                        <li style={{fontWeight:'bold'}}>推送素材id</li>
                        <li style={{fontWeight:'bold'}}>推荐日期</li>
                        <li style={{fontWeight:'bold'}}>素材标题</li>
                        <li style={{fontWeight:'bold'}}>素材内容</li>
                        <li style={{fontWeight:'bold'}}>出处</li>
                        <li style={{fontWeight:'bold'}}>图片</li>
                        <li style={{width:'160px',fontWeight:'bold'}}>素材发布时间</li>
                        <li style={{fontWeight:'bold'}}>操作</li>
                    </ul>
                    <div style={{width:'100%',height:'92%',float:'left',overflowY:'auto'}}>
                        {
                            this.state.data.map((item,index)=>(
                                <ul className='works_title' style={{width:'100%',height:'50px'}} key={index}>
                                    <li>{item.groomid}</li>
                                    <li>{item.groomdate}</li>
                                    <li style={{overflow:'hidden'}}>{item.mtitle}</li>
                                    <li style={{overflow:'hidden'}}>{item.mcontent}</li>
                                    <li style={{overflow:'hidden'}}>{item.mlocal}</li>
                                    <li>
                                        {
                                            item.mimage === '' ? 
                                            <img src='./images/logo.png' style={{width:'60px',height:'40px',paddingTop:'5px'}}/> : (
                                                item.mimage.split('.')[1]==='mp4' ? '[Video]' : 
                                            <img src={`http://116.62.14.0:8402/images/${item.mimage}`} style={{width:'50px',height:'30px',paddingTop:'10px'}}/>)
                                        }
                                    </li>
                                    <li style={{width:'160px'}}>{item.mtime}</li>
                                    <li>
                                        <button>详情</button>
                                        <button>删除</button>
                                    </li>
                                </ul>
                            ))
                        }
                    </div>
                </div>
            </div>

        )
    }
}
