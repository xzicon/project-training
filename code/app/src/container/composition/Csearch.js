import React, { Component } from 'react'

export default class Csearch extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    }
    fetchSousuo = (e)=>{
        let data = {
            search:document.getElementsByClassName('sousuo')[0].value
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/search/material', {
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
                    console.log(data.data[0]);
                    this.setState({
                        data:data.data[0]
                    })
                    break;
                }
                default:{
                    //错误，服务器
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    render() {
        return (
            <div>
                <input className='sousuo' type='text' placeholder="输入关键字搜索"/>
                <input onClick={(e)=>{this.fetchSousuo(e)}} type='button' value='搜索'/>
                {this.state.data.mtitle}
            </div>
        )
    }
}
