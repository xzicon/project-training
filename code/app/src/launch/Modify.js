import React, { Component } from 'react'

export default class Modify extends Component {
    fetchForm3 = (e)=>{
        let data = {
            uemail:document.getElementsByClassName('user1')[0].value,
            upassword:document.getElementsByClassName('pwd1')[0].value
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/register/updatepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            switch (data.status) {
                case "0":{
                    console.log(data.data);
                    //成功
                    this.props.history.push('/login');
                    break;
                }
                default:{
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    // constructor(){
    //     super();
    //     this.state={
    //         uemail:[]
    //     }
    // }
    // componentWillMount(){
    //     if(this.props.location.state){
    //         this.setState({
    //             uemail:this.props.location.state.uemail
    //           })
    //     }
    // }
    render() {
        return (
            <div className='reset_pwd'>
                <div className='form_resetpwd'>
                    <form>
                        <div className='wraper_resetpwd'>
                            <img src='/images/login/youxiang.png'/>
                            <input type='text' name='email' value={this.props.location.state} required class='user1'/>
                        </div>
                        <div className='wraper_resetpwd'>
                            <img src='/images/login/mima.png' alt='password'/>
                            <input type='password' name='password' placeholder='请输入新的密码' required class='pwd1'/>
                        </div>
                        <div className='sub_btn'>
                            <input type='button' style={{color:'black'}} onClick={(e)=>{this.fetchForm3(e)}} value='确认修改'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
