import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Detail extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        let url = this.props.match.url.split('/')[3];
        let search = this.props.location.search;
        console.log(search)
        let msid = search.split('=')[1];
        fetch(`http://116.62.14.0:8402/material/fenlei/zuixin/?mtab=${url}&msid=${msid}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.data)
            this.setState({
                data:res.data
            })
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.location.search !== this.props.location.search){
            let newsearch = this.props.location.search;
            let url = this.props.match.url.split('/')[3];
            let msid = newsearch.split('=')[1];
            fetch(`http://116.62.14.0:8402/material/fenlei/zuixin/?mtab=${url}&msid=${msid}`)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    data:res.data
                })
            })
        }
    }
    deleteItem =(e)=>{
        let newsearch = this.props.location.search;
        let url = this.props.match.url.split('/')[3];
        let msid = newsearch.split('=')[1];
        let item = e.target.parentNode.parentNode;
        // console.log(item);
        let mid = item.children[0].innerHTML;
        // console.log(mid);
        let obj={mid};
        fetch('http://116.62.14.0:8402/aud/delmaterial',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        }).then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
            switch(data.status){
                case '0':
                    fetch(`http://116.62.14.0:8402/material/fenlei/zuixin/?mtab=${url}&msid=${msid}`)
                    .then((res)=>res.json())
                    .then((res)=>{
                        this.setState({
                            data:res.data
                        })
                    })
                    alert('删除成功！');
                    break;
                case '-1':
                    alert('删除失败！');
                    break;
                default:break;
            }
        })
    }
    editChecked = (index) => {
        // console.log(index);
        this.state.data[index].checked = !this.state.data[index].checked
        // console.log(this.state.data[index].checked);
    } 
    addRec = () => {
        var tmpItems = this.state.data;
        // console.log(tmpItems);
        for(let i=0;i<tmpItems.length;i++){
            // console.log(tmpItems[i].checked)
            if(tmpItems[i].checked==true){
                var obj = {mid:tmpItems[i].mid};
                console.log(this.state.data[i].checked);
                delete tmpItems[i].checked;
                // tmpItems[i].checked = false;
                console.log(tmpItems[i].checked);
                console.log(obj);
                fetch('http://116.62.14.0:8402/groom/add',{
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(obj)
                })
                .then((res)=>res.json())
                .then((data)=>{
                    switch(data.status){
                        case '0':
                            alert('添加成功');
                            let url = this.props.match.url.split('/')[3];
                            let search = this.props.location.search;
                            let msid = search.split('=')[1];
                            fetch(`http://116.62.14.0:8402/material/fenlei/zuixin/?mtab=${url}&msid=${msid}`)
                            .then((res)=>res.json())
                            .then((res)=>{
                                this.setState({
                                    data:res.data
                                })
                            })
                            break;
                        case '-2':
                            alert('这个素材今天已经添加过了');
                            break;
                        case '-4':
                            alert('今日添加十个了不能再添加了');
                            break;
                        default:
                            alert('error');
                            break;
                    }
                })
            }
            else{ return; }
        }
    }
    render() {
        let search = this.props.location.search;
        return (
            <div style={{width:'100%',height:'400px'}}>
                <ul className='works_title' style={{width:'85%',height:'50px',paddingLeft:'12px'}}>
                    <li style={{fontWeight:'bold'}}>素材id</li>
                    <li style={{fontWeight:'bold'}}>素材标题</li>
                    <li style={{fontWeight:'bold'}}>素材内容</li>
                    <li style={{fontWeight:'bold'}}>出处</li>
                    <li style={{fontWeight:'bold'}}>图片</li>
                    <li style={{width:'160px',fontWeight:'bold'}}>发布时间</li>
                    <li style={{fontWeight:'bold'}}>操作</li>
                </ul>
                <div style={{width:'85%',height:this.props.match.url.split('/')[3]== 'sucai' ?'300px' : '110%',overflowY:'auto'}}>
                    {
                        this.state.data.map((item,index)=>(
                            <div key={index}>                          
                                <input type='checkbox' onChange={this.editChecked.bind(this,index)} style={{width:'12px',marginTop:'18px',float:'left'}}/>
                                <ul className='works_title' style={{width:'100%',height:'50px'}}>
                                    <li>{item.mid}</li>
                                    <li style={{overflow:'hidden'}}>{item.mtitle}</li>
                                    <li style={{overflow:'hidden'}}>{item.mcontent}</li>
                                    <li style={{overflow:'hidden'}}>{item.mlocal}</li>
                                    <li style={{lineHeight:'50px'}}>
                                        {
                                            item.mimage === '' ? 
                                            <img src='./images/logo.png' style={{width:'60px',height:'40px',paddingTop:'5px'}}/> : (
                                                item.mimage.split('.')[1]==='mp4' ? '[Video]' : 
                                            <img src={`http://116.62.14.0:8402/images/${item.mimage}`} style={{width:'50px',height:'30px',paddingTop:'10px'}}/>)
                                        }
                                    </li>
                                    <li style={{width:'160px'}}>{item.mtime}</li>
                                    <li>
                                        <Link to={`/home/material/updatematerial${search}&mid=${item.mid}`}>
                                            <button style={{width:'50px',height:'25px'}}>编辑</button>
                                        </Link>
                                        <button onClick={(e)=>{this.deleteItem(e)}}>删除</button>
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                </div>
                <button onClick={()=>this.addRec()} style={{width:'100px',height:'30px',marginTop:'15px',backgroundColor:'red',color:'#fff',borderStyle:'none'}}>
                    添加推荐
                </button>
            </div>
        )
    }
}