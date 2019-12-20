import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Search extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    render() {
        return (
            <div style={{width:'1080px',height:'70px',borderBottom:'1px solid #000'}}>
                <div style={{width:'250px',height:'30px',float:'left',margin:'20px 50px'}}>
                    <Link to='/home/search'>
                    <input type='search' id='search' placeholder='点击输入素材搜索'
                    style={{width:'250px',height:'30px',borderRadius:'12px',border:'1px solid #000',
                    paddingLeft:'28px',backgroundColor:'#fff'}}
                    />
                    </Link>
                    <img src='./images/search.png' style={{position:'absolute',width:'22px',height:'22px',top:'89px',left:'357px'}}/>
                    <img src='./images/msg.png' style={{position:'absolute',width:'25px',height:'25px',right:'30px'}}/>
                </div>
            </div>
        )
    }
}
