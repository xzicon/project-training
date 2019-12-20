import React, { Component } from 'react';

export default class AddMaterial extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            location:''
        }
    }
    handleClick = (msid)=>{
        let title = document.getElementById('title').value;
        let local = document.getElementById('local').value;
        let image = this.state.location==='' ? '': this.state.location;
        let analyse = document.getElementById('analyse').value;
        let content = document.getElementById('content').value;
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate()+' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        let obj = {
            mtitle:title,
            mlocal:local,
            manalyse:analyse,
            mcontent:content,
            msid:msid,
            mimage:image,
            mtime:Y+M+D+h+m+s
        }
        // console.log(obj);
        fetch('http://116.62.14.0:8402/aud/addmaterial',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        }).then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
            switch(data.status){
                case '0':
                    if(msid==6 || msid==7){
                        this.props.history.push(`/home/material/jifa/detail?msid=${msid}`);
                    }else if(35<=msid<=39 || msid==5 ||msid==4){
                        this.props.history.push(`/home/material/sucai/detail?msid=${msid}`);
                    }else{
                    this.props.history.push(`/home/material/jifa/detail?msid=${msid}`);
                    }
                    alert('添加成功！');
                    break;
                case '-1':
                    alert('添加失败！');
                    break;
                default:break;
            }
        })
    }
    handleOver = ()=>{
        let msid = this.props.location.search.split('=')[1];
        if(msid==6 || msid==7){
            this.props.history.push(`/home/material/jifa/detail?msid=${msid}`);
        }else if(35<=msid<=39 || msid==5 ||msid==4){
            this.props.history.push(`/home/material/sucai/detail?msid=${msid}`);
        }else{
            this.props.history.push(`/home/material/jifa/detail?msid=${msid}`);
        }
    }
    onChange = (e) => {
        // e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        // 这里的 image 是字段，根据具体需求更改
        formData.append('image', file);
        // 这里的 fetch 引用了 isomorphic-fetch 包
        fetch('http://116.62.14.0:8402/upload', {
        method: 'POST',
          body: formData,
        }).then(res=>res.json())
        .then(res=>{
            console.log(res.data)
            this.setState({
                location:res.data
            })
        })
    }
    handleDelete = ()=>{
        this.setState({
            location:''
        })
    }
    render() {
        let msid = this.props.location.search.split('=')[1];
        let type = this.state.location.split('.')[1];
        return (
            <div className='add_material'>
                <textarea id='title' type='text' placeholder='素材标题' style={{width:'490px',height:'22px',paddingLeft:'10px'}}></textarea> 
                <input id='local' type='text' placeholder='素材出处'/>
                <textarea id='analyse' type='text' placeholder='素材分析'></textarea>    
                <textarea id='content' type='text' placeholder='素材内容' ></textarea>   
                <div className='upload-container'>
                    <input type="file" name="image" className='upload-input' onChange={(e)=>this.onChange(e)} />
                    <button type="primary" className='upload-button'>上传图片</button>
                    <button className='delete-button' onClick={this.handleDelete} style={{marginLeft:'20px'}}>删除图片</button>
                    <div style={{width:'214px',height:'142px',border:'1px solid gray'}}>
                    {
                        this.state.location==='' ? <p></p> : ( type === 'mp4' ? 
                            <video src={`http://116.62.14.0:8402/images/`+this.state.location} id="myPlayer" poster='' controls playsInline webkit-playsinline style={{width:'100%'}}>
                            </video> : 
                            <img src={`http://116.62.14.0:8402/images/`+this.state.location} alt='主题图片' style={{width:'212.6px',height:'115px'}}/>
                        )
                    }
                    </div>
                </div>
                <div style={{width:'200px',height:'120px',float:'left',padding:'100px 0 0 40px'}}>
                    <button style={{width:'65px',height:'35px'}} onClick={()=>this.handleClick(msid)}>提交</button>
                    <button style={{width:'65px',height:'35px',marginLeft:'50px'}} onClick={()=>this.handleOver(msid)}>取消</button>
                </div> 
            </div>
        )
    }
}
