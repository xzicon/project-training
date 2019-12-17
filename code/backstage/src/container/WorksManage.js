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
                <div style={{width:'1020px',height:'600px',margin:'30px 0 0 30px'}}>
                    <ul className='user_title' style={{width:'1020px',height:'50px',float:'left'}}>
                        <li style={{fontWeight:'bold'}}>作文id</li>
                        <li style={{width:'150px',fontWeight:'bold'}}>作文标题</li>
                        <li style={{fontWeight:'bold'}}>图片内容</li>
                        <li style={{width:'150px',fontWeight:'bold'}}>所属素材</li>
                        <li style={{width:'160px',fontWeight:'bold'}}>用户名</li>
                        <li style={{width:'150px',fontWeight:'bold'}}>发布时间</li>
                        <li style={{fontWeight:'bold'}}>操作</li>
                    </ul>
                    <div style={{width:'1020px',height:'500px',float:'left',overflowY:'auto'}}>
                    {
                        this.state.data.map((item,index)=>(
                            <ul className='user_title' key={index}>
                                <li>{item.aid}</li>
                                <li style={{width:'150px',overflow:'hidden'}}>{item.atitle}</li>
                                <li style={{overflow:'hidden'}}>
                                    {
                                        item.aimage==='' ? 
                                        <img src='/images/logo.png' style={{with:'60px',height:'40px',marginTop:'5px'}}/> :
                                        <img src={`http://116.62.14.0:8402/images/${item.aimage}`} style={{with:'60px',height:'40px',marginTop:'5px'}}/>
                                    }
                                </li>
                                <li style={{width:'150px',overflow:'hidden'}}>{item.mtitle}</li>
                                <li style={{width:'160px',overflow:'hidden'}}>{item.uname}</li>
                                <li style={{width:'150px'}}>{item.utime}</li>
                                <li>
                                    <button>详情</button>
                                    <button onClick={(e)=>{this.deleteItem(e)}}>删除</button>
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
