import React, { Component } from 'react'

export default class WorksDetail extends Component {
    componentDidMount(){
        let aid = this.props.location.search.split('=')[1];
        fetch(`http://116.62.14.0:8402/article/xiangqing/${aid}`)
        .then((res)=>res.json())
        .then((res)=>{
            document.getElementById('title').value = res.data[0].atitle;
            document.getElementById('local').value = res.data[0].mtitle;
            document.getElementById('content').value = res.data[0].acontent;
        })
    }
    render() {
        return (
            <div>
                <div style={{width:'150px',height:'28px',fontSize:'15px',margin:'15px 0 0 20px',lineHeight:'20px'}}>
                <a href='#/home/works' style={{color:'black'}}>
                    <img src='images/return.png' alt='' style={{float:'left',width:'20px',height:'20px'}}/>
                    返回上一页
                </a>
                </div>
                <div className='add_material' style={{margin:'10px 50px'}}>
                <p>作文标题:</p>
                <textarea id='title' type='text' placeholder='作文标题' style={{width:'490px',height:'20px',paddingLeft:'10px'}}></textarea> 
                <p>所属素材:</p>
                <input id='local' type='text' placeholder='所属素材'/>
                <p>作文内容:</p>
                <textarea id='content' type='text' placeholder='作文内容' ></textarea>
            </div>
            </div>
        )
    }
}
