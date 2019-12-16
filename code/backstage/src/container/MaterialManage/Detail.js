import React, { Component } from 'react';
import {Link} from 'react-router-dom'

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
        //console.log(search)//?msid=2
        let msid = search.split('=')[1];
        fetch(`http://116.62.14.0:8402/material/fenlei/zuixin/?mtab=${url}&msid=${msid}`)
        .then((res)=>res.json())
        .then((res)=>{
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
            // console.log(res.data)
                this.setState({
                    data:res.data
                })
            })
        }
    }
    deleteItem =(e)=>{
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
                    alert('删除成功！');
                    break;
                case '-1':
                    alert('删除失败！');
                    break;
                default:break;
            }
        })
    }
    render() {
        let search = this.props.location.search;
        return (
            <div>
                <ul className='works_title' style={{width:'1000px',height:'200px'}}>
                    <li style={{fontWeight:'bold'}}>素材id</li>
                    <li style={{fontWeight:'bold'}}>素材标题</li>
                    <li style={{fontWeight:'bold'}}>素材解析</li>
                    <li style={{fontWeight:'bold'}}>素材内容</li>
                    <li style={{fontWeight:'bold'}}>出处</li>
                    <li style={{width:'140px',fontWeight:'bold'}}>发布时间</li>
                    <li style={{fontWeight:'bold'}}>操作</li>
                {
                    this.state.data.map((item,index)=>(
                        <ul className='works_title' key={index}>
                            <li>{item.mid}</li>
                            <li style={{overflow:'hidden'}}>{item.mtitle}</li>
                            <li style={{overflow:'hidden'}}>{item.manalyse}</li>
                            <li style={{overflow:'hidden'}}>{item.mcontent}</li>
                            <li style={{overflow:'hidden'}}>{item.mlocal}</li>
                            <li style={{width:'140px',fontSize:'13.1px'}}>{item.mtime}</li>
                            <li>
                                <Link to={`/home/material/updatematerial${search}&mid=${item.mid}`}>
                                    <button style={{width:'50px',height:'25px'}}>编辑</button>
                                </Link>
                                <button onClick={(e)=>{this.deleteItem(e)}}>删除</button>
                            </li>
                        </ul>
                    ))
                }
                </ul>
            </div>
        )
    }
}
