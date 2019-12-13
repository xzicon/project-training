import React, { Component } from 'react'

export default class Search extends Component {
    fetchSousuo = (e)=>{
        let data = {
            search:'1'
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/search/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }
    render() {
        return (
            <div>
                <input className='sousuo' type='text' placeholder="输入关键字搜索"/>
                <input onClick={(e)=>{this.fetchSousuo(e)}} type='button' value='搜索'/>
            </div>
        )
    }
}
