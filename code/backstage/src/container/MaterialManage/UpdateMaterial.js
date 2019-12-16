import React, { Component } from 'react'

export default class UpdateMaterial extends Component {
    constructor(){
        super();
        this.state={
            location:[]
        }
    }
    componentDidMount(){
        let mid = this.props.location.search.split('=')[2];
        // console.log(mid);
        fetch(`http://116.62.14.0:8402/material/xiangqing/${mid}`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                location:res.data[0].mimage
            })
            document.getElementById('title').value=res.data[0].mtitle;
            document.getElementById('local').value=res.data[0].mlocal;
            document.getElementById('analyse').value=res.data[0].manalyse;
            document.getElementById('content').value=res.data[0].mcontent;
        })
    }
    handleClick = ()=>{
        let mid = this.props.location.search.split('=')[2];
        let msid0 = this.props.location.search.split('=')[1];
        let msid1 = msid0.split('&')[0];
        let title = document.getElementById('title').value;
        let local = document.getElementById('local').value;
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
            mid:mid,
            mtitle:title,
            mlocal:local,
            manalyse:analyse,
            mcontent:content,
            msid:msid1,
            // mimage:,
            mtime:Y+M+D+h+m+s
        }
        fetch('http://116.62.14.0:8402/aud/updatematerial',{
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
                    alert('成功保存修改！');
                    break;
                case '-1':
                    alert('修改失败！');
                    break;
                default:break;
            }
        })
        if(msid1==6 || msid1==7){
            this.props.history.push(`/home/material/jifa/detail?msid=${msid1}`);
        }else if(35<=msid1<=39 || msid1==5 ||msid1==4){
            this.props.history.push(`/home/material/sucai/detail?msid=${msid1}`);
        }else{
            this.props.history.push(`/home/material/jifa/detail?msid=${msid1}`);
        }
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
    render() {
        console.log(this.state.location)
        return (
            <div className='add_material'>
                <textarea id='title' type='text' placeholder='素材标题' style={{width:'490px',height:'22px',paddingLeft:'10px'}}></textarea> 
                <input id='local' type='text' placeholder='素材出处'/>
                <textarea id='analyse' type='text' placeholder='素材分析'></textarea>    
                <textarea id='content' type='text' placeholder='素材内容' ></textarea>  
                <div className='upload-container'>
                    <input type="file" name="image" className='upload-input' onChange={(e)=>this.onChange(e)} />
                    <button type="primary" className='upload-button'>上传图片</button>
                    <div style={{width:'200px',height:'125px',border:'1px solid gray'}}>
                        {
                        this.state.location.length===0 ? <p>请添加图片</p> :
                        <img src={`http://116.62.14.0:8402/images/`+this.state.location} alt='主题图片' style={{width:'200px',height:'100px'}}/>
                        }
                    </div>
                </div>
                <div style={{width:'200px',height:'120px',float:'left',padding:'120px 0 0 0'}}>
                    <button style={{width:'65px',height:'35px'}} onClick={()=>this.handleClick()}>保存</button>
                    <button style={{width:'65px',height:'35px',marginLeft:'50px'}} onClick={()=>this.handleOver()}>取消</button>
                </div>  
            </div>
        )
    }
}
