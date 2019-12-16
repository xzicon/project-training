import React, { Component } from 'react'  

export default class UserManage extends Component {
    constructor(){
      super();
      this.state={
        users:[]
      }
    }
    componentDidMount(){
      fetch('http://116.62.14.0:8402/login')
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res.data)
        this.setState({
          users:res.data
        })
      })
    }
    handleClick = (e)=>{
      let item = e.target.parentNode.parentNode;
      let obj = {uid:item.children[0].innerHTML};
      console.log(obj)
      fetch('http://116.62.14.0:8402/login/del',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      })
      .then(res=>res.json())
      .then((data)=>{
        console.log(data)
      })
    }
    render() {
        return (
            <div>
              <ul className='user_title' style={{width:'1000px',height:'200px',margin:'50px 0 0 50px'}}>
                <li style={{fontWeight:'bold'}}>用户ID</li>
                <li style={{fontWeight:'bold'}}>用户名</li>
                <li style={{fontWeight:'bold'}}>头像</li>
                <li style={{width:'130px',fontWeight:'bold'}}>简介</li>
                <li style={{fontWeight:'bold'}}>粉丝数</li>
                <li style={{width:'160px',fontWeight:'bold'}}>邮箱</li>
                <li style={{fontWeight:'bold'}}>操作</li>
                {
                  this.state.users.map((item,index)=>(
                    <ul className='user_title' key={index}>
                      <li>{item.uid}</li>
                      <li>{item.uname}</li>
                      <li>
                        <img src={`http://116.62.14.0:8402/images/${item.uimage}`} style={{with:'60px',height:'40px',marginTop:'5px'}}/>
                      </li>
                      <li style={{width:'130px'}}>{item.udescribe}</li>
                      <li>{item.ufans}</li>
                      <li style={{width:'160px'}}>{item.uemail}</li>
                      <li><button onClick={(e)=>{this.handleClick(e)}}>删除</button></li>
                    </ul>
                  ))
                }
              </ul>
            </div>
        )
    }
}
