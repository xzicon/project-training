import React, { Component } from 'react'

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
                // console.log(res.data)
                this.setState({
                    data:res.data
                })
            })
        }
    }
    render() {
        return (
            <div>
                <div  style={{width:'1080px',height:'70px',borderBottom:'1px solid black'}}>
                <div style={{width:'250px',height:'30px',float:'left',margin:'20px 50px'}}>
                    <input type='search' onKeyDown={(e)=>this.handleSearch(e)} id='search'
                    style={{width:'250px',height:'30px',borderRadius:'12px',border:'1px solid black',
                    paddingLeft:'28px',backgroundColor:'#fff'}}
                    />
                    <img src='./images/search.png' style={{position:'absolute',width:'22px',height:'22px',top:'89px',left:'357px'}}/>
                    <img src='./images/msg.png' style={{position:'absolute',width:'25px',height:'25px',right:'30px'}}/>
                </div>
            </div>
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
                            <li style={{overflow:'hidden'}}>{item.msid}</li>
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
