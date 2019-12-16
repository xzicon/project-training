import React, { Component } from 'react'

export default class Forgetpwd extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    getCode = ()=>{
        let maname = document.getElementById('maname').value;
        console.log(maname);
        let obj = {maname};
        fetch('http://116.62.14.0:8402/loginback/forget',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })
    }
    reSetPwd = ()=>{
        let maname = document.getElementById('maname').value;
        let mcode = document.getElementById('mcode').value;
        let mapassword = document.getElementById('pwd').value;
        let obj2={maname,mcode};
        let obj3={maname:maname,mapassword:mapassword};
        console.log(obj3);
        fetch('http://116.62.14.0:8402/loginback/forgetcode',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj2)
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            if(data.status == 0){
                alert('验证成功！');
            }else{
                alert('验证失败！');
            }
        })
        fetch('http://116.62.14.0:8402/loginback/updatepassword',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj3)
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            if(data.status == 0){
                alert('密码修改成功！')
            }
        })
    }
    render() {
        return (
            <div className='reset_pwd'>
                <p>如果您不慎忘记密码，可在此通过邮箱验证重置密码。</p>
                <form style={{padding:'50px 0'}}>
                    <p>请输入用户名:</p>
                    <span>
                        <input type='text' name='maname' id='maname' placeholder=''/>
                        <button type='button' style={{marginLeft:'15px'}} onClick={this.getCode}>获取验证码</button>
                    </span>
                    <p>请输入验证码:</p>
                    <input type='text' name='code' id='mcode' placeholder=''/>
                    <p>请输入新密码:</p>
                    <input type='text' name='pwd' id='pwd' placeholder=''/>
                    <div style={{margin:'30px 100px'}}>
                        <button type='button' onClick={this.reSetPwd} style={{width:'150px',height:'35px',backgroundColor:'red',color:'#fff',border:'1px solid red',fontSize:'16px'}}>
                            保存
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
