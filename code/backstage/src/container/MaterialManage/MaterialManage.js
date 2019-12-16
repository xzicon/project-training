import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MaterialManage extends Component {
    render() {
        return (
            <div>
                <div style={{width:'750px',height:'160px',marginLeft:'200px',fontSize:'16px',paddingTop:'100px'}}>
                    <Link to='/home/material/sucai'><div className='items'>作文素材</div></Link>
                    <Link to='/home/material/fanwen'><div className='items'>写作范文</div></Link>
                    <Link to='/home/material/jifa'><div className='items'>写作技法</div></Link>
                </div>
            </div>
        )
    }
}
