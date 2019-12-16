import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Button} from 'antd-mobile';
export default class Personal extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            data3:''
        }
    }
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
            console.log(res.data.uimage);
        })
    }
    fetchFeedback = (e)=>{
        let data = {
            uid:this.props.location.state,
            uname:document.getElementsByClassName('nicheng')[0].value,
            udescribe:document.getElementsByClassName('jianjie')[0].value,
            uimage:this.state.data3
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
            this.setState({data3:data.data})
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
    onChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        fetch('http://116.62.14.0:8402/upload', {
        method: 'POST',
          body: formData,
        }).then(res=>res.json()).then(res=>
            this.setState({data3:res.data},console.log(res.data))
        )
      };
    render() {
        return (
            <div>
                <input type="file" name="image" className='upload-input' onChange={(e)=>this.onChange(e)}/>
                {/* <Button type="primary" className='upload-button'>上传图片</Button> */}
                {/* <img src={`http://116.62.14.0:8402/images/`+this.state.data3}/> */}
                <input type='text' className='nicheng' placeholder='请输入昵称' />
                <input type='text' className='jianjie' placeholder='请输入简介' />
                <input type='button' className='baocun' value='保存' onClick={(e)=>{this.fetchFeedback(e)}} />
                <Link to={{pathname:'/mine',state:this.props.location.state}}><input type='button' className='quxiao' value='取消' /></Link>
            </div>
        )
    }
}
