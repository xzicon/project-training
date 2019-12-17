import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Search from '../../components/Search';

export default class MaterialManage extends Component {
    render() {
        return (
            <div style={{width:'1080px',height:'300px',float:'left'}}>
                <Search/>
                <div style={{width:'750px',height:'160px',marginLeft:'150px',fontSize:'16px',marginTop:'100px'}}>
                    <Link to='/home/material/sucai'><div className='items'>作文素材</div></Link>
                    <Link to='/home/material/fanwen'><div className='items'>写作范文</div></Link>
                    <Link to='/home/material/jifa'><div className='items'>写作技法</div></Link>
                </div>
            </div>
        )
    }
}
