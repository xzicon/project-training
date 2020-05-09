import React, { Component } from 'react'

export default class FeedBack extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/feedback')
        .then((res)=>res.json())
        .then((res)=>{
            // console.log(res.data)
            this.setState({
                data:res.data
            })
        })
    }
    render() {
        return (
            <div>
              <ul className='user_title' style={{width:'1000px',height:'200px',margin:'30px 0 0 30px'}}>
                <li style={{fontWeight:'bold'}}>反馈ID</li>
                <li style={{width:'160px',fontWeight:'bold'}}>反馈内容</li>
                <li style={{fontWeight:'bold'}}>用户ID</li>
                <li style={{fontWeight:'bold'}}>用户名</li>
                <li style={{width:'160px',fontWeight:'bold'}}>用户邮箱</li>
                <li style={{width:'150px',fontWeight:'bold'}}>反馈时间</li>
                <li style={{fontWeight:'bold'}}>操作</li>
                <div style={{width:'1000px',height:'500px',float:'left',overflowY:'auto'}}>
                  {
                    this.state.data.map((item,index)=>(
                      <ul className='user_title' key={index}>
                        <li>{item.fid}</li>
                        <li style={{width:'160px',overflow:'hidden'}}>{item.fcontent}</li>
                        <li>{item.uid}</li>
                        <li>{item.uname}</li>
                        <li style={{width:'160px'}}>{item.uemail}</li>
                        <li style={{width:'150px'}}>{item.ftime}</li>
                        <li><button>删除</button></li>
                      </ul>
                    ))
                  }
                </div>
              </ul>
            </div>
        )
    }
}
