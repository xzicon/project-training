import React, { Component } from 'react'

export default class Sucaicomment extends Component {
    constructor(){
        super();
        this.state={
            comments:[]
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/comment/material')
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.data)
            // this.setState({
            //     comments:res.data
            // })
        })
    }
    render() {
        return (
            <div>
                {/* <ul className='works_title' style={{width:'1000px',height:'200px',margin:'50px 0 0 100px'}}>
                    <li style={{fontWeight:'bold'}}>作文id</li>
                    <li style={{fontWeight:'bold'}}>作文标题</li>
                    <li style={{fontWeight:'bold'}}>作文内容</li>
                    <li style={{fontWeight:'bold'}}>所属素材</li>
                    <li style={{fontWeight:'bold'}}>用户</li>
                    <li style={{fontWeight:'bold'}}>发布时间</li>
                    <li style={{fontWeight:'bold'}}>操作</li>
                {
                    this.state.data.map((item,index)=>(
                        <ul className='works_title' key={index}>
                            <li>{item.aid}</li>
                            <li>{item.atitle}</li>
                            <li style={{overflow:'hidden'}}>{item.acontent}</li>
                            <li>{item.mtitle}</li>
                            <li>{item.uname}</li>
                            <li style={{fontSize:'14px'}}>{item.utime}</li>
                            <li><button onClick={(e)=>{this.deleteItem(e)}}>删除</button></li>
                        </ul>
                    ))
                }
                </ul> */}
            </div>
        )
    }
}
