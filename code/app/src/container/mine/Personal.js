import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Personal extends Component {
    componentDidMount(){
        let uid=this.props.location.state;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/me/'+uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            document.getElementsByClassName('nicheng')[0].value=res.data.uname;
            document.getElementsByClassName('jianjie')[0].value=res.data.udescribe;
            console.log(res.data);
        })
    }
    fetchFeedback = (e)=>{
        let data = {
            uid:this.props.location.state,
            uname:document.getElementsByClassName('nicheng')[0].value,
            udescribe:document.getElementsByClassName('jianjie')[0].value
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/login/update', {
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
                    this.props.history.push({pathname:'/mine',state:this.props.location.state})
                    break;
                }
                default:{
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    render() {
        return (
            <div>
                <input type='text' className='id' value={this.props.location.state} />
                <input type='text' className='nicheng' placeholder='请输入昵称' />
                <input type='text' className='jianjie' placeholder='请输入简介' />
                <input type='button' className='baocun' value='保存' onClick={(e)=>{this.fetchFeedback(e)}} />
                <Link to={{pathname:'/mine',state:this.props.location.state}}><input type='button' className='quxiao' value='取消' /></Link>
            </div>
        )
    }
}
