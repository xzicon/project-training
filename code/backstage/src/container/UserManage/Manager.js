import React, { Component } from 'react'

export default class Manager extends Component {
    constructor(){
        super();
        this.state={
          users:[]
        }
      }
      componentDidMount(){
        fetch('http://116.62.14.0:8402/loginback')
        .then((res)=>res.json())
        .then((res)=>{
          // console.log(res.data)
          this.setState({
            users:res.data
          })
        })
      }
      render() {
          return (
            <div style={{width:'45%',height:'100%',margin:'2%'}}>
              <div style={{width:'20%',height:'3.5%',fontSize:'15px'}}>
                    <a href='#/home/users' style={{color:'black'}}>
                        <img src='./images/return.png' alt='' style={{float:'left',width:'20px',height:'20px'}}/>
                        返回上一页
                    </a>
                </div>
              <ul className='sys_title' style={{width:'100%',height:'50px'}}>
                <li style={{fontWeight:'bold'}}>用户名</li>
                <li style={{fontWeight:'bold'}}>邮箱</li>
                <li style={{fontWeight:'bold'}}>操作</li>
                {
                  this.state.users.map((item,index)=>(
                    <ul className='sys_title' key={index}>
                      <li>{item.maname}</li>
                      <li>{item.memail}</li>
                      <li><button>编辑</button><button>删除</button></li>
                    </ul>
                  ))
                }
              </ul>
            </div>
          )
      }
}
