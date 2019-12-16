import React, { Component } from 'react'
import {NavBar,List,TextareaItem,Button} from 'antd-mobile';
import {Link} from 'react-router-dom';
var date = new Date();
var Y = date.getFullYear() + '-';
var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
var D = (date.getDate()<10 ? '0'+(date.getDate()) : date.getDate())+' ';
var h = (date.getHours()<10 ? '0'+(date.getHours()) : date.getHours()) + ':';
var m = (date.getMinutes()<10 ? '0'+(date.getMinutes()) : date.getMinutes());
export default class Write extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    handleClick = () => {
        this.inputRef.focus();
    }
    fetchComposition=(e)=>{
        let data = {
            atitle:document.getElementsByClassName('biaoti')[0].value,
            atag:document.getElementsByClassName('biaoqian')[0].value,
            acontent:document.getElementsByClassName('neirong')[0].value,
            uid:this.props.location.state,
            utime:Y+M+D+h+m,
            aimage:this.state.data
        }
        console.log(data.aimage);
        console.log(data);
        fetch('http://116.62.14.0:8402/aud/addarticle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json()).then(data=>{
              console.log(data);
              switch (data.status) {
                case "0":{
                    console.log(data.data);
                    this.props.history.push({pathname:'/home',state:data.data});
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
            this.setState({data:res.data},console.log(res.data))
        )
      };
    render() {
        let arr=this.props.location.pathname.split('/');
        if(arr.length===3){
            var data1='/home';
        }else if(arr.length===4){
            var data1='/home/follow/'+this.props.location.state;
        }else{
            var data1='/home/crnew';
        }
        console.log(data1);
        return (
            <div>
                <NavBar
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    leftContent={<Link to={{pathname:data1,state:this.props.location.state}}>
                        <p style={{color:'#000'}}>取消</p>
                    </Link>}
                    rightContent={
                        <input type='button' onClick={(e)=>{this.fetchComposition(e)}} style={{color:'#000'}} value='发布'/>
                    }
                ></NavBar>
                <div>
                    <List style={{whiteSpace:"pre-wrap",top:'40px',position:'absolute',zIndex:'99',margin:'2% 2% auto',backgroundColor:'#fff',height:'300px',width:'96%'}}>
                        <textarea
                            title="标题"
                            placeholder="在此输入作文标题"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none',width:'100%'}}
                            className='biaoti'
                            type='text'
                        />
                        <textarea
                            title="标签"
                            placeholder="在此输入作文标签"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none',width:'100%'}}
                            className='biaoqian'
                            type='text'
                        />
                        <textarea
                            title="内容"
                            placeholder="在此输入作文内容"
                            data-seed="logId"
                            autoHeight
                            ref={el => this.customFocusInst = el}
                            style={{backgroundColor:'none',width:'100%'}}
                            className='neirong'
                            type='text'
                        />
                    </List>
                    <div className='upload-container' style={{marginTop:'400px'}}>
                    <input type="file" name="image" className='upload-input' onChange={(e)=>this.onChange(e)} />
                    {/* <Button type="primary" className='upload-button'>上传图片</Button> */}
                </div>
                {this.state.data.length!==0?<img src={`http://116.62.14.0:8402/images/`+this.state.data}/>:<div></div>}
                </div>
            </div>
        )
    }
}
