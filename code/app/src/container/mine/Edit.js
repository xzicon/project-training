import React, { Component } from 'react'
import {NavBar,List,TextareaItem, Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';
var date = new Date();
var Y = date.getFullYear() + '-';
var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
var D = (date.getDate()<10 ? '0'+(date.getDate()) : date.getDate())+' ';
var h = (date.getHours()<10 ? '0'+(date.getHours()) : date.getHours()) + ':';
var m = (date.getMinutes()<10 ? '0'+(date.getMinutes()) : date.getMinutes());
export default class Edit extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            data3:''
        }
    }
    handleClick = () => {
        this.inputRef.focus();
    }
    componentDidMount(){
        let arr=this.props.location.pathname.split('/');
        let page = this.props.location.state3;
        console.log(page);
        fetch('http://116.62.14.0:8402/article/xiangqing/'+arr[4])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                data:res.data[0],
                data3:res.data[0].aimage
            });
            document.getElementsByClassName('biaoti')[0].value=res.data[0].atitle;
            document.getElementsByClassName('neirong')[0].value=res.data[0].acontent;
            document.getElementsByClassName('biaoqian')[0].value=res.data[0].atag;
            // this.state.data3=res.data[0].aimage;
            // res.data[0].aimage===''?this.state.data3=res.data[0].aimage:
            // document.getElementById('s').src='http://116.62.14.0:8402/images/'+this.state.data3
            // document.getElementById('s').src='http://116.62.14.0:8402/images/'+this.state.data3;
            // console.log(res.data);
            // console.log(this.state.data3)
            // console.log(res.data[0].aimage);
        })
    }
    fetchEdit = (e)=>{
        let arr=this.props.location.pathname.split('/');
        let data = {
            aid:arr[4],
            atitle:document.getElementsByClassName('biaoti')[0].value,
            acontent:document.getElementsByClassName('neirong')[0].value,
            atag:document.getElementsByClassName('biaoqian')[0].value,
            aimage:this.state.data3,
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
                    Toast.success('修改文章成功',1);
                    this.props.history.push({pathname:'/'+arr[1]+'/mine/marticle/'+arr[4],state:this.props.location.state,state3:this.props.location.state3})
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
        let arr=this.props.location.pathname.split('/');
        console.log(this.state.data.aimage);
        console.log(this.state.data3);
        return (
            <div>
                <NavBar
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    leftContent={<Link to={{pathname:'/'+arr[1]+'/mine/marticle/'+arr[4],state:this.props.location.state,state3:this.props.location.state3}}>
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
                            style={{backgroundColor:'none',width:'98%'}}
                            className='biaoti'
                            type='text'
                        />
                        <textarea
                            title="标签"
                            placeholder="在此输入作文标签"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            style={{backgroundColor:'none',width:'98%',}}
                            className='biaoqian'
                            type='text'
                        />
                        <textarea
                            title="内容"
                            placeholder="在此输入作文内容"
                            data-seed="logId"
                            autoHeight
                            ref={el => this.customFocusInst = el}
                            style={{backgroundColor:'none',width:'98%',}}
                            className='neirong'
                            type='text'
                            rows={15}
                        />
                        <div style={{width:'100%',float:'right',position:'relative',height:'30px'}}>
                                <input type="file" name="image" className='upload-input' onChange={(e)=>this.onChange(e)} style={{width:'70px',float:'right',marginRight:'3%',opacity:'0'}} /><img src='/images/home/pic.png' style={{width:'8%',height:'100%',position:'absolute',right:'8%'}} /></div>
                        {this.state.data3===''?
                            (<div></div>):
                        (<div className='upload-container' style={{float:'left',width:'100%',marginTop:'3%'}}>
                            <div style={{width:'100%',float:'left'}}>
                                <img src={'http://116.62.14.0:8402/images/'+this.state.data3} id='s' style={{height:'200px',width:'fixwidth'}}/>
                            </div>
                        </div>)}
                    </List>
                </div>
            </div>
        )
    }
}
