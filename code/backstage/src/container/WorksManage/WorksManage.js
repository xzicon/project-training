import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class WorksManage extends Component {
    render() {
        return (
            <div>
                <div style={{width:'200px',height:'400px',margin:'auto',marginTop:'50px',fontSize:'16px'}}>
                    <Link to='/home/zuowen'><div className='items'>作文</div></Link>
                    <Link to='/home/lianbi'><div className='items'>练笔</div></Link>
                </div>
            </div>
        )
    }
}
