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
            <div style={{width:'100%',height:'80px',borderBottom:'1px solid #000'}}>
                <div style={{width:'25%',height:'30px',float:'left',margin:'25px 50px'}}>
                    <Link to='/home/search'>
                    <input type='search' id='search' placeholder='点击输入素材搜索'
                        style={{width:'250px',height:'30px',borderRadius:'12px',border:'1px solid #000',
                        paddingLeft:'10px',backgroundColor:'#fff'}}
                    />
                    </Link>
                    <img src='./images/search.png' style={{position:'absolute',width:'22px',height:'22px',top:'95px',left:'357px'}}/>
                </div>
            </div>
        )
    }
}
