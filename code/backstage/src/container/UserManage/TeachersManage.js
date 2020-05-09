import React, { Component } from 'react'

export default class TeachersManage extends Component {
    constructor(){
        super();
        this.state = {
            teachers:[]
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/teacher/list')
        .then(res=>res.json())
        .then((res)=>{
            console.log(res.data)
            this.setState({
              teachers:res.data
            })
          })
    }
    pass = (e)=>{
        let node = e.target.parentNode.parentNode;
        let sign0 = node.children[4].innerHTML;
        let sign1 = node.children[5].innerHTML;
        let sign2 = node.children[6].innerHTML;
        let ispass;
        if(sign0 != '' && sign1 !='' && sign2 !=''){
            ispass = 1
        };
        let obj = {ispass:ispass,tid:node.children[0].innerHTML};
        fetch('http://116.62.14.0:8402/teacher/tshow/ispass',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(data=>{
            switch(data.status){
                case '0':
                    alert('教师身份认证完成');
                    break;
                case '-2':
                    alert('用户不存在');
                    break;
                default: 
                    alert('教师身份认证失败');
                    break;
            }
        })
    }
    notpass = (e)=>{
        let node = e.target.parentNode.parentNode;
        let obj = {ispass:2,tid:node.children[0].innerHTML};
        fetch('http://116.62.14.0:8402/teacher/tshow/ispass',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(data=>{
            switch(data.status){
                case '0':
                    alert('教师身份认证完成');
                    break;
                case '-2':
                    alert('用户不存在');
                    break;
                default: 
                    alert('教师身份认证失败');
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
                <ul className='teachers_title' style={{width:'100%',height:'50px',float:'left',fontWeight:'bold'}}>
                    <li>教师id</li>
                    <li>教师姓名</li>
                    <li>头像</li>
                    {/* <li style={{width:'150px'}}>邮箱地址</li> */}
                    <li>定价</li>
                    <li>师资认证</li>
                    <li>身份证正面</li>
                    <li>身份证反面</li>
                    <li>认证状态</li>
                    <li>认证操作</li>
                </ul>
                <div style={{width:'100%',height:'500px',float:'left',overflowY:'auto'}}>
                    {
                        this.state.teachers.map((item,index)=>(
                            <ul className='teachers_title' key={index}>
                                <li>{item.tid}</li>
                                <li style={{overflow:'hidden'}}>{item.tname}</li>
                                <li>
                                    {
                                        item.timage==='' ? 
                                        <img src='images/logo.png' style={{with:'60px',height:'40px',marginTop:'5px'}}/> :
                                        <img src={`http://116.62.14.0:8402/images/${item.timage}`} style={{with:'40px',height:'40px',marginTop:'5px'}}/>
                                    }
                                </li>
                                {/* <li style={{width:'150px'}}>{item.temail}</li> */}
                                <li>{item.tmoney}</li>
                                <li>{item.tshow}</li>
                                <li>{item.tidentityfront}</li>
                                <li>{item.tidentityback}</li>
                                <li>
                                    {
                                        item.ispass ==0 ? '未认证' : (item.ispass ==1 ? '认证通过' : '认证未通过')                                        
                                    }
                                </li>
                                <li>
                                    <button onClick={(e)=>{this.pass(e)}}>通过</button>                                
                                    <button onClick={(e)=>{this.notpass(e)}}>不通过</button>                                    
                                </li>
                            </ul>
                        ))
                    }
                </div>
            </div>
        )
    }
}
