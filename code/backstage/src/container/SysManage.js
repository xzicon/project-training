import React, { Component } from 'react'

export default class SysManage extends Component {
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
            <div>
              <ul className='sys_title' style={{width:'800px',height:'200px',margin:'30px 0 0 30px'}}>
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
