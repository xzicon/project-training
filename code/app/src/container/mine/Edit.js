import React, { Component } from 'react'
import {NavBar,List,TextareaItem} from 'antd-mobile';
import {Link} from 'react-router-dom';
var date = new Date();
var Y = date.getFullYear() + '-';
var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
var D = date.getDate()+' ';
var h = date.getHours() + ':';
var m = date.getMinutes();
export default class Edit extends Component {
    handleClick = () => {
        this.inputRef.focus();
    }
    componentDidMount(){
        let page = this.props.location.state3;
        console.log(page);
        fetch('http://116.62.14.0:8402/article/xiangqing/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                data:res.data,
            });
            document.getElementsByClassName('biaoti')[0].value=res.data[0].atitle;
            document.getElementsByClassName('neirong')[0].value=res.data[0].acontent;
            document.getElementsByClassName('biaoqian')[0].value=res.data[0].atag;
            console.log(res.data);
        })
    }
    fetchEdit = (e)=>{
        let data = {
            aid:this.props.location.state3,
            atitle:document.getElementsByClassName('biaoti')[0].value,
            acontent:document.getElementsByClassName('neirong')[0].value,
            atag:document.getElementsByClassName('biaoqian')[0].value,
            utime:Y+M+D+h+m
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/aud/updatearticle', {
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
                    this.props.history.push({pathname:'/mine/marticle',state:this.props.location.state,state3:this.props.location.state3})
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
                <NavBar
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    leftContent={<Link to={{pathname:'/mine/marticle',state:this.props.location.state,state3:this.props.location.state3}}>
                        <p style={{color:'#000'}}>取消</p>
                    </Link>}
                    rightContent={
                        <input type='button' onClick={(e)=>{this.fetchEdit(e)}} style={{width:'60px',height:'30px',color:'#000',border:'none',backgroundColor:'#fff',border:'1px solid red',borderRadius:'15%'}} value='修改'/>
                    }
                ></NavBar>
                <div>
                    <List style={{whiteSpace:"pre-wrap",top:'45px',position:'absolute',zIndex:'99',margin:'2% 2% auto',backgroundColor:'#fff',width:'96%',paddingBottom:'2%'}}>
                        <textarea
                            title="标题"
                            placeholder="在此输入作文标题"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none',width:'96%',marginTop:'2%',marginLeft:'1.5%'}}
                            className='biaoti'
                            type='text'
                        />
                        <textarea
                            title="标签"
                            placeholder="在此输入作文标签"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none',width:'96%',marginLeft:'1.5%'}}
                            className='biaoqian'
                            type='text'
                        />
                        <textarea
                            title="内容"
                            placeholder="在此输入作文内容"
                            data-seed="logId"
                            autoHeight
                            ref={el => this.customFocusInst = el}
                            style={{backgroundColor:'none',width:'96%',marginLeft:'1.5%'}}
                            className='neirong'
                            type='text'
                            rows={15}
                        />
                    </List>
                </div>
            </div>
        )
    }
}
