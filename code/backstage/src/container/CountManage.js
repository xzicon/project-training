import React, { Component } from 'react'

export default class CountManage extends Component {
  constructor(){
    super();
    this.state={
        data:[
            {
                mid:'',
                aid:'',
                uid:''
            }
        ]
    }
  }
  componentDidMount(){
    fetch('http://116.62.14.0:8402/loginback/count')
    .then((res)=>res.json())
    .then((res)=>{
        this.setState({
            data:res.data
        })
    })
  }
  render() {
    return (
        <div style={{paddingTop:'60px'}}>
            <div className='count' style={{marginLeft:'200px'}}>
                <p>累计用户数量</p>
                <p className='number'>{this.state.data[0].uid}</p>
            </div>
            <div className='count'>
                <p>目前素材总量</p>
                <p className='number'>{this.state.data[0].mid}</p>
            </div>
            <div className='count'>
                <p>用户创作总量</p>
                <p className='number'>{this.state.data[0].aid}</p>
            </div>
        </div>
    )
  }    
}