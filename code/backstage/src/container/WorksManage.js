import React, { Component } from 'react';

export default class WorksManage extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/article')
        .then((res)=>res.json())
        .then((res)=>{
            // console.log(res.data)
            this.setState({
                data:res.data
            })
        })
    }
    deleteItem = (e)=>{
        let item = e.target.parentNode.parentNode;
        // console.log(item.children[0].innerHTML);
        let obj = {aid:item.children[0].innerHTML};
        // console.log(obj);
        fetch('http://116.62.14.0:8402/aud/delarticle',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        }).then((res)=>res.json())
        .then(
            (data)=>{
                // console.log(data);
                switch(data.status){
                    case '0':
                        alert('删除成功！');
                        break;
                    case '-1':
                        alert('删除失败！');
                        break;
                    default:
                        break;
                }
            }
        )
    }
    render() {
        return (
            <div>
                <ul className='works_title' style={{width:'1000px',height:'200px',margin:'50px 0 0 50px'}}>
                    <li style={{fontWeight:'bold'}}>作文id</li>
                    <li style={{fontWeight:'bold'}}>作文标题</li>
                    <li style={{fontWeight:'bold'}}>作文内容</li>
                    <li style={{fontWeight:'bold'}}>所属素材</li>
                    <li style={{fontWeight:'bold'}}>用户</li>
                    <li style={{width:'160px',fontWeight:'bold'}}>发布时间</li>
                    <li style={{fontWeight:'bold'}}>操作</li>
                {
                    this.state.data.map((item,index)=>(
                        <ul className='works_title' key={index}>
                            <li>{item.aid}</li>
                            <li>{item.atitle}</li>
                            <li style={{overflow:'hidden'}}>{item.acontent}</li>
                            <li style={{overflow:'hidden'}}>{item.mtitle}</li>
                            <li>{item.uname}</li>
                            <li style={{width:'160px'}}>{item.utime}</li>
                            <li><button onClick={(e)=>{this.deleteItem(e)}}>删除</button></li>
                        </ul>
                    ))
                }
                </ul>
            </div>
        )
    }
}
