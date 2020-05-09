import React, { Component } from 'react';
import omit from "omit.js";
import {Link} from 'react-router-dom';

export default class WorksManage extends Component {
    constructor(){
        super();
        this.state={
            works:[]
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/article')
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.data)
            this.setState({
                works:res.data
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
                        fetch('http://116.62.14.0:8402/article')
                        .then((res)=>res.json())
                        .then((res)=>{
                            // console.log(res.data)
                            this.setState({
                                works:res.data
                            })
                        })
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
    selectItem(index){
        let tmpItems = this.state.works;
        tmpItems[index].checked=!tmpItems[index].checked;
        // console.log(tmpItems[1].acontent.length);
    }
    deleteItems = ()=>{
        let tmpItems = this.state.works;
        for(let i=0;i<tmpItems.length;i++){
            if(tmpItems[i].checked){
                let obj = {aid:tmpItems[i].aid};
                fetch('http://116.62.14.0:8402/aud/delarticle',{
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(obj)
                }).then((res)=>res.json())
                .then((data)=>{
                    // console.log(data);
                    switch(data.status){
                        case '0':
                            // tmpItems[i].checked = false;
                            fetch('http://116.62.14.0:8402/article')
                            .then((res)=>res.json())
                            .then((res)=>{
                                // console.log(res.data)
                                this.setState({
                                    works:res.data
                                })
                            })
                            break;
                        case '-1':
                            alert('删除失败！');
                            break;
                        default:
                            break;
                    }
                })
            }
        }
    }
    // handleChangeStateByOmit=()=>{
    //     const newState = {
    //         works:omit(this.state.works,["checked"])
    //     }
    //     this.setState(newState, () => {
    //         console.log(this.state)
    //     })
    // }

    //通过审核
    pass = (e)=>{
        let tmpItems = this.state.works;
        for(let i=0;i<tmpItems.length;i++){
            if(tmpItems[i].checked){
                let obj = {aaudit:1,aid:tmpItems[i].aid};
                fetch('http://116.62.14.0:8402/audit/audit',{
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(obj)
                }).then(res=>res.json())
                .then((data)=>{
                    switch(data.status){
                        case '0':
                            // tmpItems[i].checked = false;
                            // tmpItems[i].checked="undefined";
                            delete tmpItems[i].checked;
                            fetch('http://116.62.14.0:8402/article')
                            .then((res)=>res.json())
                            .then((res)=>{
                                // console.log(res.data)
                                // omit(tmpItems[i],['checked'])
                                this.setState({
                                    works:res.data
                                })
                            })
                            console.log(tmpItems[i]);
                            // console.log(tmpItems[i].checked);
                            break;
                        case '-1':
                            alert('审核失败！');
                            break;
                        default: break;
                    }
                })
            }
        }
    }
    //不通过审核
    notpass = (e)=>{
        let tmpItems = this.state.works;
        for(let i=0;i<tmpItems.length;i++){
            if(tmpItems[i].checked){
                let obj = {aaudit:2,aid:tmpItems[i].aid};
                fetch('http://116.62.14.0:8402/audit/audit',{
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(obj)
                }).then(res=>res.json())
                .then((data)=>{
                    switch(data.status){
                        case '0':
                            fetch('http://116.62.14.0:8402/article')
                            .then((res)=>res.json())
                            .then((res)=>{
                                this.setState({
                                    works:res.data
                                })
                            })
                            break;
                        case '-1':
                            alert('审核失败！');
                            break;
                        default: break;
                    }
                })
            }
        }             
    }
    render() {
        return (
            <div>
                <div style={{width:'1035px',height:'600px',margin:'30px 0 0 30px'}}>
                    <ul className='works_title' style={{marginLeft:'12px'}}>
                        <li style={{fontWeight:'bold'}}>作文id</li>
                        <li style={{width:'100px',fontWeight:'bold'}}>作文标题</li>
                        <li style={{fontWeight:'bold'}}>图片内容</li>
                        <li style={{width:'100px',fontWeight:'bold'}}>所属素材</li>
                        <li style={{width:'100px',fontWeight:'bold'}}>用户名</li>
                        <li style={{width:'140px',fontWeight:'bold'}}>发布时间</li>
                        <li style={{width:'140px',fontWeight:'bold'}}>操作</li>
                        <li style={{fontWeight:'bold'}}>审核状态</li>
                    </ul>
                    <div style={{width:'1035px',height:'492px',float:'left',overflowY:'auto'}}>
                    {
                        this.state.works.map((item,index)=>(
                            <div style={{width:'1035px',height:'50px'}} key={index}>
                                <div style={{width:'12px',lineHeight:'50px',float:'left'}}>
                                    <input type='checkbox' onChange={this.selectItem.bind(this,index)}/>
                                </div>
                                <ul className='works_title' style={{width:'1020px',float:'left'}}>
                                    <li>{item.aid}</li>
                                    <li style={{width:'100px',overflow:'hidden'}}>{item.atitle}</li>
                                    <li style={{overflow:'hidden'}}>
                                    {
                                        item.aimage==='' ? 
                                        <img src='images/logo.png' style={{with:'60px',height:'40px',marginTop:'5px'}}/> :
                                        <img src={`http://116.62.14.0:8402/images/${item.aimage}`} style={{with:'60px',height:'40px',marginTop:'5px'}}/>
                                    }
                                    </li>
                                    <li style={{width:'100px',overflow:'hidden'}}>
                                    {
                                        item.mid===null ? '[自由创作]' : item.mtitle
                                    }
                                    </li>
                                    <li style={{width:'100px',overflow:'hidden'}}>{item.uname}</li>
                                    <li style={{width:'140px'}}>{item.utime}</li>
                                    <li style={{width:'140px'}}>
                                        <Link to={{pathname:`/home/worksdetail`,search:`?aid=${item.aid}`}}><button style={{width:'50px',height:'25px'}}>详情</button></Link>
                                        <button onClick={(e)=>{this.deleteItem(e)}}>删除</button>
                                    </li>
                                    <li>
                                        {
                                            item.aaudit==0 ? <span style={{color:'blue'}}>未审核</span> : 
                                            (item.aaudit == 1 ? <span>已通过</span> : <span style={{color:'red'}}>未通过</span>)
                                        }
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                    </div>
                    <button className='btns' onClick={(e)=>{this.notpass(e)}}>不通过</button>
                    <button className='btns' onClick={(e)=>{this.pass(e)}}>通过审核</button>
                    <button className='btns' onClick={(e)=>{this.deleteItems(e)}}>批量删除</button>
                </div>
            </div>
        )
    }
}
