import React, { Component } from 'react'  

export default class StudentManage extends Component {
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
        // console.log(res.data)
        this.setState({
          users:res.data
        })
      })
    }
    handleClick = (e)=>{
      let item = e.target.parentNode.parentNode;
      let obj = {uid:item.children[0].innerHTML};
      // console.log(obj)
      fetch('http://116.62.14.0:8402/login/del',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      })
      .then(res=>res.json())
      .then((data)=>{
        // console.log(data)
        switch(data.status){
          case '0':
              alert('删除成功！');
              break;
          default:
              alert('删除失败！');
              break;
      }
      })
    }
    render() {
        return (
          <div style={{width:'90%',height:'100%',margin:'2%'}}>
            <div style={{width:'20%',height:'3.5%',fontSize:'15px'}}>
              <a href='#/home/users' style={{color:'black'}}>
                <img src='./images/return.png' alt='' style={{float:'left',width:'20px',height:'20px'}}/>
                返回上一页
              </a>
            </div>
            <ul className='user_title' style={{width:'100%',height:'50px',float:'left',fontWeight:'bold'}}>
              <li>用户ID</li>
              <li style={{width:'140px'}}>用户名</li>
              <li style={{fontWeight:'bold'}}>头像</li>
              <li style={{width:'160px'}}>简介</li>
              <li>粉丝数</li>
              <li style={{width:'160px'}}>邮箱</li>
              <li style={{width:'120px'}}>操作</li>
            </ul>
            <div style={{width:'92%',height:'500px',float:'left',overflowY:'auto'}}>
            {
              this.state.users.map((item,index)=>(
                <ul className='user_title' key={index}>
                  <li>{item.uid}</li>
                  <li style={{width:'140px',overflow:'hidden'}}>{item.uname}</li>
                  <li>
                    <img src={`http://116.62.14.0:8402/images/${item.uimage}`} style={{width:'40px',height:'40px',marginTop:'5px'}}/>
                  </li>
                  <li style={{width:'160px',overflow:'hidden'}}>{item.udescribe}</li>
                  <li>{item.ufans}</li>
                  <li style={{width:'160px'}}>{item.uemail}</li>
                  <li style={{width:'120px'}}><button onClick={(e)=>{this.handleClick(e)}}>删除</button></li>
                </ul>
              ))
            }
            </div>
          </div>
        )
    }
}
