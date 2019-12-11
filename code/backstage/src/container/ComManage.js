import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ComManage extends Component {
    constructor(){
        super();
        this.state={
            comments:[]
        }
    }
    render() {
        return (
            <div>
                <div style={{width:'200px',height:'400px',margin:'auto',marginTop:'50px',fontSize:'16px'}}>
                    <Link to='/home/sucaicomment'><div className='items'>素材评论</div></Link>
                    <Link to='/home/zuowencomment'><div className='items'>作文评论</div></Link>
                </div>
            </div>
        )
    }
}
