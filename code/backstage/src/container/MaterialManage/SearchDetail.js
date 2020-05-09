import React, { Component } from 'react'
import Search from '../../components/Search'

export default class SearchDetail extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    handleSearch = (e)=>{
        let detail = document.getElementById('search').value;
        let obj = {search:detail};
        if(e.keyCode == '13'){
            this.props.history.push('/home/search');
            fetch('http://116.62.14.0:8402/search/material',{
                method:'post',
                headers:{
                'Content-Type':'application/json'
                },
            body:JSON.stringify(obj)
            }).then((res)=>res.json())
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    data:res.data
                })
            })
        }
    }
    render() {
        return (
            <div>
                <Search/>
                <div style={{width:'1000px',height:'600px',margin:'20px 30px'}}>
                    <ul className='works_title' style={{width:'1000px',height:'50px'}}>
                        <li style={{fontWeight:'bold'}}>素材id</li>
                        <li style={{fontWeight:'bold'}}>标签</li>
                        <li style={{fontWeight:'bold'}}>素材标题</li>
                        <li style={{fontWeight:'bold'}}>素材解析</li>
                        <li style={{fontWeight:'bold'}}>素材内容</li>
                        <li style={{fontWeight:'bold'}}>出处</li>
                        <li style={{fontWeight:'bold'}}>发布时间</li>
                    </ul>
                    {
                        this.state.data.map((item,index)=>(
                            <ul className='works_title' key={index} style={{width:'1000px',height:'50px'}}>
                                <li>{item.mid}</li>
                                <li style={{overflow:'hidden'}}>{item.msname}</li>
                                <li style={{overflow:'hidden'}}>{item.mtitle}</li>
                                <li style={{overflow:'hidden'}}>{item.manalyse}</li>
                                <li style={{overflow:'hidden'}}>{item.mcontent}</li>
                                <li style={{overflow:'hidden'}}>{item.mlocal}</li>
                                <li style={{overflow:'hidden'}}>{item.mtime}</li>
                            </ul>
                        ))
                    }
                </div>
            </div>
        )
    }
}
