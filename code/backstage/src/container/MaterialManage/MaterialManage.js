import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MaterialManage extends Component {
    render() {
        return (
            <div>
                <div style={{width:'200px',height:'400px',margin:'auto',marginTop:'50px',fontSize:'16px'}}>
                    <Link to='/home/sucai'><div className='items'>作文素材</div></Link>
                    <Link to='/home/fanwen'><div className='items'>写作范文</div></Link>
                    <Link to='/home/jifa'><div className='items'>写作技法</div></Link>
                </div>
            </div>
        )
    }
}
