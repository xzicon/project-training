import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {NavBar, Icon,Toast} from 'antd-mobile';
export default class Personal extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            data3:''
        }
    }
    componentDidMount(){
        let arr=this.props.location.pathname.split('/');
        // let uid=this.props.location.state;
        // console.log(uid);
        fetch('http://116.62.14.0:8402/login/me/'+arr[1]+'/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            document.getElementsByClassName('nicheng')[0].value=res.data.uname;
            document.getElementsByClassName('jianjie')[0].value=res.data.udescribe;
            this.state.data3=res.data.uimage;
            document.getElementById('s').src='http://116.62.14.0:8402/images/'+this.state.data3;
            console.log(res.data);
            console.log(res.data.uimage);
            console.log(this.state.data3);
        })
    }
    fetchFeedback = (e)=>{
        let arr=this.props.location.pathname.split('/');
        let data = {
            uid:arr[1],
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
                    Toast.success('修改资料成功',1);
                    this.props.history.push({pathname:'/'+arr[1]+'/mine',state:this.props.location.state})
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
            this.setState({
                data3:res.data
            },console.log(res.data))
        )
      };
    render() {
        let arr=this.props.location.pathname.split('/');
        return (
            <div style={{overflow:'hidden'}}>
            <div>
            <NavBar
                icon={<Link to={{pathname:'/'+arr[1]+'/mine',state:this.props.location.state}}><Icon  type="left" /></Link>}
                style={{backgroundColor:'#fff',color:'black'}}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={
                    <input type='button' className='baocun' value='保存' onClick={(e)=>{this.fetchFeedback(e)}} style={{backgroundColor:'#fff',fontSize:'90',color:'#da4036',border:'1px solid #da4036',width:'70px',height:'30px',borderRadius:'15%'}} />
                }
            >
                个人信息
            </NavBar>
            </div>

            
            


            <div style={{backgroundColor:'#fff',float:'left',marginTop:'2%',width:'100%',position:'relative'}}>
                <div  style={{width:'100%',height:'50px',fontSize:'115%',borderBottom:'1px solid #f5f5f9',padding:'0 0 0 5%',lineHeight:'50px'}}>
                    <img src='/images/write/right.png' style={{width:'6%',margin:'2% 3% 0 0',top:'2%',right:'0',position:'absolute'}}/>
                    <div style={{float:'right',width:'80px',color:'gray',border:'none',textAlign:'right',backgroundColor:'#fff'}}><input type="file" name="image" className='upload-input' onChange={(e)=>this.onChange(e)} style={{opacity:'0'}}/></div>
                    头像：<img src={'http://116.62.14.0:8402/images/'+this.state.data3} id='s' style={{width:'40px',height:'40px',float:'right',marginTop:'1%',borderRadius:'50%'}}/>
                    
                </div>
                <div  style={{width:'100%',height:'50px',fontSize:'115%',borderBottom:'1px solid gray',padding:'0 0 0 5%',lineHeight:'50px'}}>
                    <img src='/images/write/right.png' style={{width:'6%',float:'right',margin:'3% 7% 0 0',}}/>
                    昵称：<input type='text' className='nicheng'  placeholder='请输入昵称' style={{float:'right',marginRight:'2%',color:'gray',border:'none',lineHeight:'40px',marginTop:'1%',textAlign:'right'}} />
                </div>
                <div  style={{width:'100%',height:'50px',fontSize:'115%',borderBottom:'1px solid gray',padding:'0 0 0 5%',lineHeight:'50px'}}>
                    <img src='/images/write/right.png' style={{width:'6%',float:'right',margin:'3% 7% 0 0',}}/>
                    邮箱:<a style={{float:'right',marginRight:'3%',color:'gray'}}>{this.state.data.uemail}</a>
                </div>
                <div  style={{width:'100%',height:'50px',fontSize:'115%',borderBottom:'1px solid gray',padding:'0 0 0 5%',lineHeight:'50px'}}>
                    <img src='/images/write/right.png' style={{width:'6%',float:'right',margin:'3% 7% 0 0',}}/>
                    个性签名:<input type='text' className='jianjie' placeholder='介绍一下自己吧' style={{float:'right',marginRight:'2%',color:'gray',border:'none',lineHeight:'40px',marginTop:'1%',textAlign:'right'}} />
                </div>
                {/* <input type='button' className='baocun' value='保存' onClick={(e)=>{this.fetchFeedback(e)}} /> */}
            </div>

            
        </div>
        )
    }
}
